const mysql = require('mysql2/promise');
require('dotenv').config();

// 初始化数据库和表结构
async function initDatabase() {
  let connection;
  
  try {
    // 首先连接到 MySQL（不指定数据库）
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('📦 开始初始化数据库...');

    // 创建数据库
    const dbName = process.env.DB_NAME || 'blog_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ 数据库 ${dbName} 已创建或已存在`);

    // 使用数据库
    await connection.query(`USE ${dbName}`);

    // 创建用户表
    const createUserTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await connection.query(createUserTableSQL);
    console.log('✅ 用户表已创建');

    // 创建博客表（添加 user_id 字段）
    const createBlogTableSQL = `
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        content LONGTEXT NOT NULL,
        tags JSON,
        author VARCHAR(100) DEFAULT '平头哥',
        read_time INT DEFAULT 0,
        user_id INT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_date (date),
        INDEX idx_author (author),
        INDEX idx_user_id (user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await connection.query(createBlogTableSQL);
    console.log('✅ 博客表已创建');

    // 插入初始数据
    const mockData = [
      {
        id: '1',
        title: 'React 18 新特性详解：并发渲染与自动批处理',
        category: '前端开发',
        date: '2024-11-05',
        description: '深入探讨 React 18 带来的革命性更新，包括并发渲染、自动批处理、Suspense 改进等核心特性。',
        content: `
          <h2>React 18 的核心更新</h2>
          <p>React 18 是 React 团队发布的一个重要版本，引入了并发渲染的概念，这是 React 架构上的重大革新。</p>
          
          <h3>1. 并发渲染（Concurrent Rendering）</h3>
          <p>并发渲染允许 React 同时准备多个版本的 UI。这意味着 React 可以在后台准备新的屏幕，而不会阻塞主线程。</p>
          <pre><code>// 使用 startTransition 标记非紧急更新
import { startTransition } from 'react';

startTransition(() => {
  setSearchQuery(input);
});</code></pre>

          <h3>2. 自动批处理（Automatic Batching）</h3>
          <p>React 18 会自动批处理所有状态更新，包括 Promise、setTimeout 和原生事件处理器中的更新。</p>
          <pre><code>// React 18 会自动批处理这些更新
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会重新渲染一次
}, 1000);</code></pre>

          <h3>3. Suspense 改进</h3>
          <p>Suspense 现在支持服务端渲染，可以在数据加载时显示 fallback UI。</p>

          <h3>总结</h3>
          <p>React 18 的这些新特性为构建更流畅、响应更快的用户界面提供了强大的工具。开发者应该逐步采用这些新特性来提升应用性能。</p>
        `,
        tags: JSON.stringify(['React', 'JavaScript', '前端框架']),
        author: '平头哥',
        read_time: 8
      },
      {
        id: '2',
        title: 'TypeScript 高级类型系统实战指南',
        category: '编程语言',
        date: '2024-11-03',
        description: '从泛型到条件类型，从映射类型到类型体操，全面掌握 TypeScript 的类型系统精髓。',
        content: `
          <h2>TypeScript 高级类型</h2>
          <p>TypeScript 的类型系统非常强大，掌握高级类型可以让我们写出更安全、更优雅的代码。</p>

          <h3>1. 泛型（Generics）</h3>
          <p>泛型是 TypeScript 中最强大的特性之一，它允许我们在定义函数、接口或类时不预先指定具体类型。</p>
          <pre><code>function identity<T>(arg: T): T {
  return arg;
}

// 使用
const result = identity<string>("Hello");</code></pre>

          <h3>2. 条件类型（Conditional Types）</h3>
          <pre><code>type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false</code></pre>

          <h3>3. 映射类型（Mapped Types）</h3>
          <p>映射类型允许我们基于旧类型创建新类型。</p>
          <pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};</code></pre>

          <h3>4. 工具类型（Utility Types）</h3>
          <p>TypeScript 提供了许多内置的工具类型，如 Partial、Required、Pick、Omit 等。</p>

          <h3>总结</h3>
          <p>掌握 TypeScript 的高级类型系统需要时间和实践，但它会让你的代码更加健壮和可维护。</p>
        `,
        tags: JSON.stringify(['TypeScript', '类型系统', '编程']),
        author: '平头哥',
        read_time: 12
      },
      {
        id: '3',
        title: 'Next.js 14 App Router 完全指南',
        category: '前端开发',
        date: '2024-11-01',
        description: '深入理解 Next.js 14 的 App Router，掌握服务端组件、流式渲染和数据获取的最佳实践。',
        content: `
          <h2>Next.js 14 App Router</h2>
          <p>Next.js 14 引入的 App Router 是一个基于 React Server Components 的新路由系统。</p>

          <h3>1. 文件系统路由</h3>
          <p>App Router 使用文件系统进行路由，每个文件夹代表一个路由段。</p>
          <pre><code>app/
  ├── page.tsx          # 首页 /
  ├── blog/
  │   ├── page.tsx      # /blog
  │   └── [id]/
  │       └── page.tsx  # /blog/:id</code></pre>

          <h3>2. 服务端组件（Server Components）</h3>
          <p>默认情况下，所有组件都是服务端组件，这意味着它们在服务器上渲染。</p>
          <pre><code>// app/page.tsx - 服务端组件
async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}</code></pre>

          <h3>3. 数据获取</h3>
          <p>在服务端组件中，可以直接使用 async/await 获取数据。</p>
          <pre><code>async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}</code></pre>

          <h3>4. 流式渲染（Streaming）</h3>
          <p>使用 Suspense 可以实现流式渲染，提升用户体验。</p>

          <h3>总结</h3>
          <p>App Router 是 Next.js 的未来，它提供了更好的性能和开发体验。</p>
        `,
        tags: JSON.stringify(['Next.js', 'React', 'SSR']),
        author: '平头哥',
        read_time: 10
      },
      {
        id: '4',
        title: 'CSS 现代布局技术：Grid 与 Flexbox 深度对比',
        category: '前端开发',
        date: '2024-10-28',
        description: '全面对比 CSS Grid 和 Flexbox，帮助你在实际项目中选择最合适的布局方案。',
        content: `
          <h2>现代 CSS 布局</h2>
          <p>CSS Grid 和 Flexbox 是现代 Web 开发中最重要的布局工具。</p>

          <h3>1. Flexbox - 一维布局</h3>
          <p>Flexbox 适合处理一维布局，即一行或一列的布局。</p>
          <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>

          <h3>2. Grid - 二维布局</h3>
          <p>Grid 适合处理二维布局，可以同时控制行和列。</p>
          <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>

          <h3>3. 何时使用 Flexbox</h3>
          <ul>
            <li>导航栏</li>
            <li>卡片内部的元素对齐</li>
            <li>简单的一行或一列布局</li>
          </ul>

          <h3>4. 何时使用 Grid</h3>
          <ul>
            <li>整体页面布局</li>
            <li>复杂的网格系统</li>
            <li>需要精确控制行和列的场景</li>
          </ul>

          <h3>总结</h3>
          <p>Flexbox 和 Grid 不是竞争关系，而是互补的。在实际项目中，往往会结合使用两者。</p>
        `,
        tags: JSON.stringify(['CSS', '布局', 'Grid', 'Flexbox']),
        author: '平头哥',
        read_time: 7
      },
      {
        id: '5',
        title: 'Web 性能优化实战：从 60 到 100 分的优化之路',
        category: '性能优化',
        date: '2024-10-25',
        description: '系统讲解 Web 性能优化的方方面面，包括资源优化、渲染优化、网络优化等实用技巧。',
        content: `
          <h2>Web 性能优化</h2>
          <p>性能优化是前端开发中永恒的话题，一个快速响应的网站能带来更好的用户体验。</p>

          <h3>1. 资源优化</h3>
          <h4>图片优化</h4>
          <ul>
            <li>使用 WebP 格式</li>
            <li>懒加载（Lazy Loading）</li>
            <li>响应式图片</li>
            <li>图片压缩</li>
          </ul>

          <h4>代码分割</h4>
          <pre><code>// 动态导入
const MyComponent = lazy(() => import('./MyComponent'));</code></pre>

          <h3>2. 渲染优化</h3>
          <ul>
            <li>减少重排和重绘</li>
            <li>使用 CSS 动画代替 JavaScript 动画</li>
            <li>虚拟滚动</li>
            <li>防抖和节流</li>
          </ul>

          <h3>3. 网络优化</h3>
          <ul>
            <li>HTTP/2</li>
            <li>CDN 加速</li>
            <li>资源预加载（Preload）</li>
            <li>缓存策略</li>
          </ul>

          <h3>4. 监控和测量</h3>
          <p>使用 Lighthouse、WebPageTest 等工具定期检测性能指标。</p>

          <h3>总结</h3>
          <p>性能优化是一个持续的过程，需要根据实际情况选择合适的优化策略。</p>
        `,
        tags: JSON.stringify(['性能优化', 'Web开发', '最佳实践']),
        author: '平头哥',
        read_time: 15
      },
      {
        id: '6',
        title: 'Vue 3 Composition API 设计模式与最佳实践',
        category: '前端开发',
        date: '2024-10-22',
        description: '探索 Vue 3 Composition API 的设计理念，学习如何编写可复用、可维护的 Vue 组件。',
        content: `
          <h2>Vue 3 Composition API</h2>
          <p>Composition API 是 Vue 3 中最重要的新特性，它提供了一种更灵活的方式来组织组件逻辑。</p>

          <h3>1. 为什么需要 Composition API</h3>
          <p>Options API 在处理大型组件时存在一些问题：</p>
          <ul>
            <li>相关逻辑分散在不同选项中</li>
            <li>难以复用逻辑</li>
            <li>TypeScript 支持不够好</li>
          </ul>

          <h3>2. 基本用法</h3>
          <pre><code>import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const double = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    return { count, double, increment };
  }
};</code></pre>

          <h3>3. 组合式函数（Composables）</h3>
          <p>使用组合式函数可以提取和复用逻辑。</p>
          <pre><code>function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
}</code></pre>

          <h3>4. 最佳实践</h3>
          <ul>
            <li>按功能组织代码</li>
            <li>提取可复用逻辑</li>
            <li>合理使用 ref 和 reactive</li>
            <li>避免过度使用 watchEffect</li>
          </ul>

          <h3>总结</h3>
          <p>Composition API 让 Vue 3 更加强大和灵活，是现代 Vue 开发的核心。</p>
        `,
        tags: JSON.stringify(['Vue', 'JavaScript', 'Composition API']),
        author: '平头哥',
        read_time: 11
      }
    ];

    const insertSQL = `
      INSERT INTO blogs (id, title, category, date, description, content, tags, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        category = VALUES(category),
        date = VALUES(date),
        description = VALUES(description),
        content = VALUES(content),
        tags = VALUES(tags),
        author = VALUES(author),
        read_time = VALUES(read_time)
    `;

    for (const blog of mockData) {
      await connection.query(insertSQL, [
        blog.id,
        blog.title,
        blog.category,
        blog.date,
        blog.description,
        blog.content,
        blog.tags,
        blog.author,
        blog.read_time
      ]);
    }

    console.log(`✅ 成功插入 ${mockData.length} 条博客数据`);
    console.log('🎉 数据库初始化完成！');

  } catch (error) {
    console.error('❌ 初始化失败:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 执行初始化
initDatabase().catch(console.error);
