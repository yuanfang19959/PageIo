# 🚀 快速启动指南

## 前置要求

- ✅ Node.js >= 14.0.0
- ✅ MySQL >= 5.7 或 >= 8.0
- ✅ npm 或 yarn

## 步骤 1: 启动 MySQL

确保 MySQL 服务已启动：

```bash
# macOS (使用 Homebrew)
brew services start mysql

# 或直接启动
mysql.server start

# Linux
sudo systemctl start mysql

# Windows
net start MySQL
```

## 步骤 2: 配置数据库

编辑 `.env` 文件，设置数据库连接信息：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的数据库密码
DB_NAME=blog_db
```

**重要**: 如果你的 MySQL root 用户有密码，请务必填写 `DB_PASSWORD`！

## 步骤 3: 初始化数据库

运行初始化脚本，这会自动：
- 创建 `blog_db` 数据库
- 创建 `blogs` 表
- 插入 6 条示例数据

```bash
npm run init-db
```

**预期输出**:
```
📦 开始初始化数据库...
✅ 数据库 blog_db 已创建或已存在
✅ 博客表已创建
✅ 成功插入 6 条博客数据
🎉 数据库初始化完成！
```

如果遇到错误，请检查：
- MySQL 是否正在运行
- 数据库账号密码是否正确
- 用户是否有创建数据库的权限

## 步骤 4: 启动服务器

```bash
# 开发模式（推荐，自动重启）
npm run dev

# 或者生产模式
npm start
```

**预期输出**:
```
✅ 数据库连接成功
=================================
🚀 服务器启动成功！
📍 地址: http://localhost:3001
🌍 环境: development
📚 API 文档: http://localhost:3001/
=================================
```

## 步骤 5: 测试接口

打开浏览器访问: http://localhost:3001

你会看到 API 文档首页。

或使用 curl 测试：

```bash
# 获取博客列表
curl http://localhost:3001/api/blogs

# 获取单个博客
curl http://localhost:3001/api/blogs/1
```

## 🎯 一键启动脚本

如果你想一次性完成所有步骤，可以运行：

```bash
# 1. 安装依赖（如果还没安装）
npm install

# 2. 初始化数据库
npm run init-db

# 3. 启动服务器
npm run dev
```

## ⚠️ 常见问题

### 问题 1: "数据库连接失败"

**解决方案**:
1. 确认 MySQL 服务已启动
2. 检查 `.env` 文件中的数据库配置
3. 尝试用命令行登录 MySQL 验证账号密码

```bash
mysql -u root -p
```

### 问题 2: "端口 3001 已被占用"

**解决方案**:
修改 `.env` 中的 `PORT=3002` 改为其他端口

### 问题 3: "权限不足"

**解决方案**:
给 MySQL 用户授权：

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 问题 4: 重置数据库

如果需要重新初始化数据库：

```bash
# 删除数据库
mysql -u root -p -e "DROP DATABASE blog_db;"

# 重新初始化
npm run init-db
```

## 📦 目录结构

```
server/
├── app.js                  # 主应用
├── package.json            # 依赖配置
├── .env                    # 环境变量配置
├── config/
│   └── database.js         # 数据库连接
├── controllers/
│   └── blogController.js   # 业务逻辑
├── routes/
│   └── index.js            # 路由
└── scripts/
    └── initDatabase.js     # 数据库初始化
```

## 🔗 接下来做什么？

1. ✅ 查看 [API.md](./API.md) 了解所有接口
2. ✅ 查看 [README.md](./README.md) 了解详细功能
3. ✅ 在 Next.js 项目中集成这些 API
4. ✅ 根据需求扩展更多功能

## 💡 开发建议

- 使用 `npm run dev` 开发，代码修改会自动重启
- 建议使用 Postman 或 Thunder Client 测试 API
- 查看终端日志了解每个请求的执行情况

祝你开发愉快！🎉
