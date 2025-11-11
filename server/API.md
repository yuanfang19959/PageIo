# Blog API 接口文档

## 基础信息

- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`

## 接口列表

### 1. 获取博客列表

**接口地址**: `GET /blogs`

**请求参数**:

| 参数 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| page | number | 否 | 页码 | 1 |
| pageSize | number | 否 | 每页数量 | 10 |

**请求示例**:
```bash
curl http://localhost:3001/api/blogs?page=1&pageSize=10
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "1",
        "title": "React 18 新特性详解",
        "category": "前端开发",
        "date": "2024-11-05",
        "description": "深入探讨 React 18...",
        "tags": ["React", "JavaScript"],
        "author": "平头哥",
        "read_time": 8,
        "created_at": "2024-11-11T00:00:00.000Z"
      }
    ],
    "total": 6,
    "page": 1,
    "pageSize": 10
  }
}
```

---

### 2. 获取博客详情

**接口地址**: `GET /blogs/:id`

**路径参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 博客ID |

**请求示例**:
```bash
curl http://localhost:3001/api/blogs/1
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "1",
    "title": "React 18 新特性详解",
    "category": "前端开发",
    "date": "2024-11-05",
    "description": "深入探讨 React 18...",
    "content": "<h2>React 18 的核心更新</h2>...",
    "tags": ["React", "JavaScript", "前端框架"],
    "author": "平头哥",
    "read_time": 8,
    "created_at": "2024-11-11T00:00:00.000Z",
    "updated_at": "2024-11-11T00:00:00.000Z"
  }
}
```

**错误响应**:
```json
{
  "code": 404,
  "message": "博客不存在"
}
```

---

### 3. 创建博客

**接口地址**: `POST /blogs`

**请求体**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 博客ID（唯一） |
| title | string | 是 | 标题 |
| category | string | 是 | 分类 |
| content | string | 是 | 内容（HTML格式） |
| date | string | 否 | 发布日期 (YYYY-MM-DD) |
| description | string | 否 | 描述 |
| tags | array | 否 | 标签数组 |
| author | string | 否 | 作者名 |
| readTime | number | 否 | 阅读时长（分钟） |

**请求示例**:
```bash
curl -X POST http://localhost:3001/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "title": "新博客标题",
    "category": "前端开发",
    "date": "2024-11-11",
    "description": "这是一篇新博客",
    "content": "<h2>标题</h2><p>内容...</p>",
    "tags": ["JavaScript", "Web"],
    "author": "平头哥",
    "readTime": 5
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": "7"
  }
}
```

---

### 4. 更新博客

**接口地址**: `PUT /blogs/:id`

**路径参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 博客ID |

**请求体**: 同创建博客（不需要 id 字段）

**请求示例**:
```bash
curl -X PUT http://localhost:3001/api/blogs/7 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新后的标题",
    "category": "编程语言",
    "date": "2024-11-11",
    "description": "更新后的描述",
    "content": "<h2>更新的内容</h2>",
    "tags": ["JavaScript"],
    "author": "平头哥",
    "readTime": 6
  }'
```

**响应示例**:
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": "7"
  }
}
```

---

### 5. 删除博客

**接口地址**: `DELETE /blogs/:id`

**路径参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 博客ID |

**请求示例**:
```bash
curl -X DELETE http://localhost:3001/api/blogs/7
```

**响应示例**:
```json
{
  "code": 200,
  "message": "删除成功"
}
```

---

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

## 错误响应格式

```json
{
  "code": 500,
  "message": "错误信息",
  "error": "详细错误（仅开发环境）"
}
```

## 使用 Postman 测试

1. 导入接口到 Postman
2. 设置 Base URL: `http://localhost:3001/api`
3. 测试各个接口

## 前端集成示例

```javascript
// 获取博客列表
async function getBlogList(page = 1, pageSize = 10) {
  const response = await fetch(
    `http://localhost:3001/api/blogs?page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  return data.data;
}

// 获取博客详情
async function getBlogById(id) {
  const response = await fetch(`http://localhost:3001/api/blogs/${id}`);
  const data = await response.json();
  return data.data;
}

// 创建博客
async function createBlog(blogData) {
  const response = await fetch('http://localhost:3001/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  return data;
}
```
