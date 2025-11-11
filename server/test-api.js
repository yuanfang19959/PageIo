/**
 * API 测试脚本
 * 用于测试所有博客 API 接口
 */

const API_BASE_URL = 'http://localhost:3001/api';

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

// 测试工具函数
async function testAPI(name, method, url, body = null) {
  log(colors.blue, `\n🧪 测试: ${name}`);
  log(colors.yellow, `   ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      log(colors.green, `   ✅ 成功: ${response.status}`);
      console.log('   响应:', JSON.stringify(data, null, 2).split('\n').join('\n   '));
      return data;
    } else {
      log(colors.red, `   ❌ 失败: ${response.status}`);
      console.log('   错误:', JSON.stringify(data, null, 2).split('\n').join('\n   '));
      return null;
    }
  } catch (error) {
    log(colors.red, `   ❌ 请求失败: ${error.message}`);
    return null;
  }
}

// 运行所有测试
async function runTests() {
  log(colors.blue, '\n' + '='.repeat(50));
  log(colors.blue, '📋 Blog API 接口测试');
  log(colors.blue, '='.repeat(50));

  // 1. 测试获取博客列表
  await testAPI(
    '获取博客列表（第1页）',
    'GET',
    `${API_BASE_URL}/blogs?page=1&pageSize=3`
  );

  // 2. 测试获取单个博客
  await testAPI(
    '获取博客详情（ID=1）',
    'GET',
    `${API_BASE_URL}/blogs/1`
  );

  // 3. 测试创建博客
  const newBlog = {
    id: 'test-' + Date.now(),
    title: '测试博客 - ' + new Date().toLocaleString(),
    category: '测试分类',
    date: new Date().toISOString().split('T')[0],
    description: '这是一个测试博客的描述',
    content: '<h2>测试标题</h2><p>这是测试内容</p>',
    tags: ['测试', 'API'],
    author: '测试作者',
    readTime: 5
  };

  const createResult = await testAPI(
    '创建新博客',
    'POST',
    `${API_BASE_URL}/blogs`,
    newBlog
  );

  if (createResult && createResult.data) {
    const createdId = createResult.data.id;

    // 4. 测试更新博客
    await testAPI(
      '更新博客',
      'PUT',
      `${API_BASE_URL}/blogs/${createdId}`,
      {
        ...newBlog,
        title: '更新后的标题 - ' + new Date().toLocaleString(),
        description: '更新后的描述'
      }
    );

    // 5. 测试获取更新后的博客
    await testAPI(
      '获取更新后的博客',
      'GET',
      `${API_BASE_URL}/blogs/${createdId}`
    );

    // 6. 测试删除博客
    await testAPI(
      '删除博客',
      'DELETE',
      `${API_BASE_URL}/blogs/${createdId}`
    );

    // 7. 测试获取已删除的博客（应该返回404）
    await testAPI(
      '获取已删除的博客（应返回404）',
      'GET',
      `${API_BASE_URL}/blogs/${createdId}`
    );
  }

  // 8. 测试不存在的博客
  await testAPI(
    '获取不存在的博客（应返回404）',
    'GET',
    `${API_BASE_URL}/blogs/non-existent-id`
  );

  log(colors.blue, '\n' + '='.repeat(50));
  log(colors.green, '✅ 测试完成！');
  log(colors.blue, '='.repeat(50) + '\n');
}

// 检查服务器是否运行
async function checkServer() {
  try {
    const response = await fetch(API_BASE_URL.replace('/api', ''));
    if (response.ok) {
      log(colors.green, '✅ 服务器运行正常');
      return true;
    }
  } catch (error) {
    log(colors.red, '❌ 无法连接到服务器');
    log(colors.yellow, '💡 请确保服务器已启动: npm run dev');
    return false;
  }
}

// 主函数
async function main() {
  console.clear();
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }

  await runTests();
}

// 运行测试
main().catch(console.error);
