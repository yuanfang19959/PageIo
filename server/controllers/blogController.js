const { pool } = require('../config/database');

// 获取博客列表（支持分页）
async function getBlogList(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // 获取总数
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM blogs');
    const total = countResult[0].total;

    // 获取数据
    const [blogs] = await pool.query(
      `SELECT id, title, category, date, description, tags, author, read_time, created_at
       FROM blogs
       ORDER BY date DESC
       LIMIT ? OFFSET ?`,
      [pageSize, offset]
    );

    // 解析 JSON 字段
    const formattedBlogs = blogs.map(blog => {
      let tags = [];
      if (blog.tags) {
        if (typeof blog.tags === 'string') {
          try {
            tags = JSON.parse(blog.tags);
          } catch (e) {
            // 如果是逗号分隔的字符串
            tags = blog.tags.split(',').map(t => t.trim());
          }
        } else if (Array.isArray(blog.tags)) {
          tags = blog.tags;
        }
      }
      return {
        ...blog,
        tags
      };
    });

    res.json({
      code: 200,
      message: 'success',
      data: {
        list: formattedBlogs,
        total,
        page,
        pageSize
      }
    });
  } catch (error) {
    console.error('获取博客列表失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
}

// 根据 ID 获取博客详情
async function getBlogById(req, res) {
  try {
    const { id } = req.params;

    const [blogs] = await pool.query(
      'SELECT * FROM blogs WHERE id = ?',
      [id]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '博客不存在'
      });
    }

    let tags = [];
    if (blogs[0].tags) {
      if (typeof blogs[0].tags === 'string') {
        try {
          tags = JSON.parse(blogs[0].tags);
        } catch (e) {
          // 如果是逗号分隔的字符串
          tags = blogs[0].tags.split(',').map(t => t.trim());
        }
      } else if (Array.isArray(blogs[0].tags)) {
        tags = blogs[0].tags;
      }
    }
    
    const blog = {
      ...blogs[0],
      tags
    };

    res.json({
      code: 200,
      message: 'success',
      data: blog
    });
  } catch (error) {
    console.error('获取博客详情失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
}

// 创建博客
async function createBlog(req, res) {
  try {
    const { id, title, category, date, description, content, tags, author, readTime } = req.body;

    // 验证必填字段
    if (!id || !title || !category || !content) {
      return res.status(400).json({
        code: 400,
        message: '缺少必填字段'
      });
    }

    const sql = `
      INSERT INTO blogs (id, title, category, date, description, content, tags, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      id,
      title,
      category,
      date || new Date().toISOString().split('T')[0],
      description || '',
      content,
      tags ? JSON.stringify(tags) : null,
      author || '平头哥',
      readTime || 0
    ]);

    res.json({
      code: 200,
      message: '创建成功',
      data: { id }
    });
  } catch (error) {
    console.error('创建博客失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
}

// 更新博客
async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, category, date, description, content, tags, author, readTime } = req.body;

    // 检查博客是否存在
    const [existing] = await pool.query('SELECT id FROM blogs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '博客不存在'
      });
    }

    const sql = `
      UPDATE blogs
      SET title = ?, category = ?, date = ?, description = ?, content = ?, tags = ?, author = ?, read_time = ?
      WHERE id = ?
    `;

    await pool.query(sql, [
      title,
      category,
      date,
      description,
      content,
      tags ? JSON.stringify(tags) : null,
      author,
      readTime,
      id
    ]);

    res.json({
      code: 200,
      message: '更新成功',
      data: { id }
    });
  } catch (error) {
    console.error('更新博客失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
}

// 删除博客
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: '博客不存在'
      });
    }

    res.json({
      code: 200,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除博客失败:', error);
    res.status(500).json({
      code: 500,
      message: '服务器错误',
      error: error.message
    });
  }
}

module.exports = {
  getBlogList,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
