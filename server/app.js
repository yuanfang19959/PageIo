const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { testConnection } = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use('/api', routes);

// 根路径
app.get('/', (req, res) => {
  res.json({
    message: '博客 API 服务器运行中',
    version: '1.0.0',
    endpoints: {
      blogs: {
        list: 'GET /api/blogs?page=1&pageSize=10',
        detail: 'GET /api/blogs/:id',
        create: 'POST /api/blogs',
        update: 'PUT /api/blogs/:id',
        delete: 'DELETE /api/blogs/:id'
      }
    }
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
async function startServer() {
  try {
    // 测试数据库连接
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('⚠️  数据库连接失败，请检查配置');
      console.log('💡 提示：');
      console.log('   1. 复制 .env.example 为 .env 并配置数据库信息');
      console.log('   2. 运行 npm run init-db 初始化数据库');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('=================================');
      console.log(`🚀 服务器启动成功！`);
      console.log(`📍 地址: http://localhost:${PORT}`);
      console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📚 API 文档: http://localhost:${PORT}/`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  }
}

startServer();
