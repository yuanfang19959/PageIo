const pool = require('../config/database').pool;

/**
 * 创建博客（需要认证）
 */
async function createBlog(req, res) {
  try {
    const { title, category, description, content, tags } = req.body;
    const author = req.user.username; // 从认证中间件获取用户信息

    // 验证必填字段
    if (!title || !category || !content) {
      return res.json({
        success: false,
        message: '标题、类别和内容不能为空'
      });
    }

    // 生成唯一 ID
    const id = Date.now().toString();
    // 使用完整的 ISO 时间戳，而不是只保存日期
    const date = new Date().toISOString();

    // 处理标签
    let tagsArray = [];
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // 计算阅读时间（粗略估算：每分钟200字）
    const readTime = Math.max(1, Math.ceil(content.length / 200));

    const sql = `
      INSERT INTO blogs (id, title, category, date, description, content, tags, author, read_time, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      id,
      title,
      category,
      date,
      description || title,
      content,
      JSON.stringify(tagsArray),
      author,
      readTime,
      req.user.id
    ]);

    res.json({
      success: true,
      message: '发布成功',
      data: { id }
    });
  } catch (error) {
    console.error('创建博客失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

/**
 * 更新博客（需要认证且为作者本人）
 */
async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, category, description, content, tags } = req.body;

    // 检查博客是否存在且属于当前用户
    const [existing] = await pool.query(
      'SELECT user_id FROM blogs WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.json({
        success: false,
        message: '博客不存在'
      });
    }

    if (existing[0].user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: '无权限修改此博客'
      });
    }

    // 处理标签
    let tagsArray = [];
    if (tags) {
      if (typeof tags === 'string') {
        tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    const readTime = Math.max(1, Math.ceil((content || '').length / 200));

    const sql = `
      UPDATE blogs
      SET title = ?, category = ?, description = ?, content = ?, tags = ?, read_time = ?
      WHERE id = ?
    `;

    await pool.query(sql, [
      title,
      category,
      description,
      content,
      JSON.stringify(tagsArray),
      readTime,
      id
    ]);

    res.json({
      success: true,
      message: '更新成功',
      data: { id }
    });
  } catch (error) {
    console.error('更新博客失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

/**
 * 删除博客（需要认证且为作者本人）
 */
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    // 检查博客是否存在且属于当前用户
    const [existing] = await pool.query(
      'SELECT user_id FROM blogs WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.json({
        success: false,
        message: '博客不存在'
      });
    }

    if (existing[0].user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: '无权限删除此博客'
      });
    }

    await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除博客失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

/**
 * 获取用户的博客列表
 */
async function getUserBlogs(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM blogs WHERE user_id = ?',
      [req.user.id]
    );
    const total = countResult[0].total;

    const [blogs] = await pool.query(
      `SELECT id, title, category, date, description, tags, author, read_time, created_at
       FROM blogs 
       WHERE user_id = ?
       ORDER BY date DESC 
       LIMIT ? OFFSET ?`,
      [req.user.id, pageSize, offset]
    );

    const formattedBlogs = blogs.map(blog => {
      let tags = [];
      if (blog.tags) {
        if (typeof blog.tags === 'string') {
          try {
            tags = JSON.parse(blog.tags);
          } catch (e) {
            tags = blog.tags.split(',').map(t => t.trim());
          }
        } else if (Array.isArray(blog.tags)) {
          tags = blog.tags;
        }
      }
      return { ...blog, tags };
    });

    res.json({
      success: true,
      message: 'success',
      data: {
        list: formattedBlogs,
        total,
        page,
        pageSize
      }
    });
  } catch (error) {
    console.error('获取用户博客列表失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs
};
