# Blog API Server

基于 Express + MySQL 的博客 API 服务器

## 功能特性

- ✅ RESTful API 设计
- ✅ MySQL 数据库存储
- ✅ CORS 跨域支持
- ✅ 环境变量配置
- ✅ 完整的 CRUD 操作
- ✅ 分页查询支持

## 快速开始

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并修改配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_db

PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 3. 初始化数据库

```bash
npm run init-db
```

这会自动创建数据库、表结构并插入初始数据。

### 4. 启动服务器

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3001` 启动

## API 接口

### 获取博客列表

```
GET /api/blogs?page=1&pageSize=10
```

**参数：**
- `page`: 页码（默认 1）
- `pageSize`: 每页数量（默认 10）

**响应：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [...],
    "total": 6,
    "page": 1,
    "pageSize": 10
  }
}
```

### 获取博客详情

```
GET /api/blogs/:id
```

**响应：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "1",
    "title": "...",
    "content": "...",
    ...
  }
}
```

### 创建博客

```
POST /api/blogs
```

**请求体：**
```json
{
  "id": "7",
  "title": "新博客标题",
  "category": "前端开发",
  "date": "2024-11-11",
  "description": "博客描述",
  "content": "<h2>内容</h2>",
  "tags": ["tag1", "tag2"],
  "author": "平头哥",
  "readTime": 5
}
```

### 更新博客

```
PUT /api/blogs/:id
```

**请求体：**同创建博客

### 删除博客

```
DELETE /api/blogs/:id
```

## 数据库结构

### blogs 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(50) | 主键 |
| title | VARCHAR(255) | 标题 |
| category | VARCHAR(100) | 分类 |
| date | DATE | 发布日期 |
| description | TEXT | 描述 |
| content | LONGTEXT | 内容 |
| tags | JSON | 标签数组 |
| author | VARCHAR(100) | 作者 |
| read_time | INT | 阅读时长（分钟） |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 项目结构

```
server/
├── app.js                  # 主应用文件
├── package.json            # 依赖配置
├── .env                    # 环境变量（需自行创建）
├── .env.example            # 环境变量示例
├── config/
│   └── database.js         # 数据库配置
├── controllers/
│   └── blogController.js   # 博客控制器
├── routes/
│   └── index.js            # 路由配置
└── scripts/
    └── initDatabase.js     # 数据库初始化脚本
```

## 开发建议

1. **开发环境**：使用 `npm run dev` 启动，nodemon 会自动监听文件变化
2. **数据库备份**：定期备份 MySQL 数据库
3. **日志记录**：建议集成日志系统（如 winston）
4. **API 文档**：可集成 Swagger 生成 API 文档
5. **错误处理**：已包含基础错误处理，可根据需求扩展

## 常见问题

### 1. 数据库连接失败

- 检查 MySQL 服务是否启动
- 检查 `.env` 配置是否正确
- 确认数据库用户权限

### 2. 端口被占用

修改 `.env` 中的 `PORT` 配置

### 3. CORS 错误

检查 `CORS_ORIGIN` 配置是否与前端地址一致

## License

ISC
