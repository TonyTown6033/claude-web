# 🎯 简化版本参考

这个文件提供了一个**超级简化版**的 Todo 应用代码，适合完全的初学者理解。

## 📦 单文件版本（所有代码在一个文件中）

这个版本没有组件拆分，没有 Composables，所有代码都在 `App.vue` 中。

### 完整代码（约 100 行）

```vue
<template>
  <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
    <h1>📝 待办事项</h1>

    <!-- 添加表单 -->
    <div style="margin-bottom: 20px;">
      <input
        v-model="newTitle"
        placeholder="输入任务..."
        style="padding: 10px; width: 300px;"
      />
      <button @click="addTodo" style="padding: 10px;">
        添加
      </button>
    </div>

    <!-- 任务列表 -->
    <div>
      <div
        v-for="todo in todos"
        :key="todo.id"
        style="padding: 10px; border: 1px solid #ccc; margin-bottom: 10px;"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
          {{ todo.title }}
        </span>
        <button @click="deleteTodo(todo.id)" style="float: right;">
          删除
        </button>
      </div>

      <!-- 空状态 -->
      <div v-if="todos.length === 0" style="text-align: center; color: #999;">
        还没有任务，快来添加一个吧！
      </div>
    </div>

    <!-- 统计 -->
    <div style="margin-top: 20px; text-align: center;">
      总共 {{ todos.length }} 个任务，
      已完成 {{ completedCount }} 个
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// ========== 数据 ==========

// 后端地址
const API_URL = 'http://localhost:8000/api'

// 所有任务
const todos = ref([])

// 新任务的标题
const newTitle = ref('')

// ========== 计算属性 ==========

// 已完成的数量
const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length
})

// ========== 方法 ==========

// 获取所有任务
async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`)
  todos.value = await response.json()
}

// 添加新任务
async function addTodo() {
  // 检查是否为空
  if (!newTitle.value.trim()) {
    alert('请输入任务标题')
    return
  }

  // 发送 POST 请求
  await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle.value })
  })

  // 清空输入框
  newTitle.value = ''

  // 刷新列表
  await fetchTodos()
}

// 切换完成状态
async function toggleTodo(id) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT'
  })

  // 刷新列表
  await fetchTodos()
}

// 删除任务
async function deleteTodo(id) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE'
  })

  // 刷新列表
  await fetchTodos()
}

// ========== 生命周期 ==========

// 页面加载时获取数据
onMounted(() => {
  fetchTodos()
})
</script>
```

---

## 🔍 代码讲解

### 1. Template 部分（界面）

```vue
<template>
  <!-- 最外层容器 -->
  <div>
    <h1>📝 待办事项</h1>

    <!-- 输入框和按钮 -->
    <input v-model="newTitle" />
    <button @click="addTodo">添加</button>

    <!-- 循环显示每个任务 -->
    <div v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </div>
  </div>
</template>
```

**关键点**：
- `v-model` - 双向绑定输入框
- `@click` - 点击事件
- `v-for` - 循环渲染
- `:key` - 帮助 Vue 跟踪每一项

### 2. Script 部分（逻辑）

```vue
<script setup>
import { ref } from 'vue'

// 定义数据
const todos = ref([])
const newTitle = ref('')

// 定义方法
async function addTodo() {
  // 发送请求创建任务
  await fetch('http://localhost:8000/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: newTitle.value })
  })

  // 刷新列表
  await fetchTodos()
}
</script>
```

**关键点**：
- `ref()` - 创建响应式数据
- `async/await` - 异步处理
- `fetch()` - 发送 HTTP 请求

---

## 🆚 简化版 vs 完整版对比

| 特性 | 简化版 | 完整版 |
|------|--------|--------|
| 文件数量 | 1个 | 6个 |
| 代码行数 | ~100行 | ~400行（总计）|
| Composables | ❌ | ✅ |
| 组件拆分 | ❌ | ✅ |
| 样式 | 内联样式 | Tailwind CSS |
| 动画 | ❌ | ✅ |
| 注释 | 简单 | 详细 |
| **适合人群** | **绝对初学者** | **想学最佳实践** |

---

## 📝 学习路径建议

### 第 1 步：理解简化版

1. **阅读代码**（30分钟）
   - 从上到下看一遍
   - 理解每个部分在做什么

2. **运行代码**（10分钟）
   - 复制简化版代码
   - 替换 `frontend/src/App.vue`
   - 看看效果

3. **动手修改**（1小时）
   - 改变标题文字
   - 添加一个按钮
   - 修改样式

### 第 2 步：理解为什么要拆分

**问题**：如果代码都在一个文件，会怎样？

```vue
<!-- 想象如果有 1000 行代码... -->
<template>
  <!-- 500 行 HTML -->
</template>

<script>
  // 500 行 JavaScript
</script>
```

会变得：
- ❌ 难以阅读
- ❌ 难以维护
- ❌ 难以复用
- ❌ 难以测试

**解决方案**：拆分！

```
App.vue (100行)
  ├── TodoForm.vue (50行)
  ├── TodoList.vue (50行)
  └── useTodos.js (100行)
```

每个文件只做一件事，清晰明了！

### 第 3 步：逐步迁移到完整版

**步骤 1**：提取 Composable

```javascript
// 之前：所有逻辑在 App.vue
const todos = ref([])
async function fetchTodos() { ... }

// 之后：提取到 useTodos.js
export function useTodos() {
  const todos = ref([])
  async function fetchTodos() { ... }
  return { todos, fetchTodos }
}
```

**步骤 2**：拆分组件

```vue
<!-- 之前：表单在 App.vue 中 -->
<div>
  <input v-model="newTitle" />
  <button @click="addTodo">添加</button>
</div>

<!-- 之后：独立的 TodoForm.vue -->
<TodoForm @submit="handleSubmit" />
```

**步骤 3**：添加样式和动画

```vue
<!-- 之前：内联样式 -->
<div style="padding: 10px;">

<!-- 之后：Tailwind CSS -->
<div class="p-4 bg-white rounded-lg shadow">
```

---

## 💡 常见问题

### Q1：我应该学简化版还是完整版？

**答案**：都要学！

1. **先学简化版**（1-2天）
   - 理解基本概念
   - 知道如何运行
   - 能做简单修改

2. **再学完整版**（1-2周）
   - 理解为什么要拆分
   - 学习最佳实践
   - 理解真实项目结构

### Q2：简化版能用于实际项目吗？

**答案**：不推荐。

简化版适合：
- ✅ 学习概念
- ✅ 快速原型
- ✅ 演示demo

完整版适合：
- ✅ 实际项目
- ✅ 团队协作
- ✅ 长期维护

### Q3：我需要记住所有代码吗？

**答案**：不需要！

重要的是理解：
- ✅ **为什么**这样写
- ✅ **怎么**使用
- ✅ **在哪**可以找到答案

代码可以查文档，理解才是关键。

---

## 🎯 练习任务

基于简化版，试试完成这些任务：

### 初级
- [ ] 改变标题为"我的任务列表"
- [ ] 给"添加"按钮换个颜色
- [ ] 让已完成的任务显示为绿色

### 中级
- [ ] 添加一个"全部完成"按钮
- [ ] 显示创建时间
- [ ] 添加任务描述字段

### 高级
- [ ] 添加任务过滤（全部/已完成/未完成）
- [ ] 添加任务编辑功能
- [ ] 保存数据到 localStorage

---

## 📚 下一步

完成简化版后，建议：

1. **阅读完整版代码** - 看看专业的代码是怎样的
2. **阅读 [BEGINNER.md](../BEGINNER.md)** - 了解更多细节
3. **动手实践** - 自己从零写一个类似的项目

**记住**：从简单开始，逐步进阶！🚀
