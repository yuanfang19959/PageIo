const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const userBlogController = require('../controllers/userBlogController');
const authMiddleware = require('../middleware/auth');

// ========== 认证相关路由 ==========
router.post('/login', authController.login);              // 用户登录
router.post('/register', authController.register);        // 用户注册

// ========== 公开博客路由 ==========
router.get('/blogs', blogController.getBlogList);         // 获取博客列表（公开）
router.get('/blogs/:id', blogController.getBlogById);     // 获取博客详情（公开）

// ========== 需要认证的博客路由 ==========
router.post('/post', authMiddleware, userBlogController.createBlog);           // 发布博客（需要认证）
router.put('/post/:id', authMiddleware, userBlogController.updateBlog);        // 更新博客（需要认证）
router.delete('/post/:id', authMiddleware, userBlogController.deleteBlog);     // 删除博客（需要认证）
router.get('/my-blogs', authMiddleware, userBlogController.getUserBlogs);      // 获取我的博客列表（需要认证）

module.exports = router;
