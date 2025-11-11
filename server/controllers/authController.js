const pool = require('../config/database').pool;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

/**
 * 密码加密 - 使用 SHA256
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * 生成 JWT Token
 */
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * 用户登录
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // 验证参数
    if (!username || !password) {
      return res.json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }

    // 查询用户
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.json({
        success: false,
        message: '用户不存在'
      });
    }

    const user = users[0];

    // 验证密码
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.json({
        success: false,
        message: '密码错误'
      });
    }

    // 生成 token
    const token = generateToken(user);

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          created_at: user.created_at
        }
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

/**
 * 用户注册
 */
async function register(req, res) {
  try {
    const { username, password } = req.body;

    // 验证参数
    if (!username || !password) {
      return res.json({
        success: false,
        message: '用户名和密码不能为空'
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: '密码长度至少6位'
      });
    }

    // 检查用户是否已存在
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.json({
        success: false,
        message: '用户名已存在'
      });
    }

    // 加密密码
    const hashedPassword = hashPassword(password);

    // 创建用户
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    // 生成 token
    const token = generateToken({ id: result.insertId, username });

    res.json({
      success: true,
      message: '注册成功',
      data: {
        token,
        user: {
          id: result.insertId,
          username
        }
      }
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误',
      error: error.message
    });
  }
}

/**
 * 验证 Token
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  login,
  register,
  verifyToken,
  hashPassword
};
