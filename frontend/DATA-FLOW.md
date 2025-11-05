# 数据流设计：单一数据源原则

## 🎯 设计理念

**核心原则：后端是唯一的真实数据源（Single Source of Truth）**

前端不维护独立的数据副本，所有数据操作后都从后端重新获取。

## 📊 架构对比

### ❌ 之前：双向同步（容易出错）

```javascript
async function createTodo(todoData) {
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  })
  const newTodo = await response.json()

  // ❌ 手动维护前端数据
  todos.value.push(newTodo)
}

async function toggleTodo(id) {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
  })
  const updatedTodo = await response.json()

  // ❌ 手动查找并更新
  todos.value = todos.value.map(todo =>
    todo.id === id ? updatedTodo : todo
  )
}
```

**问题**：
- 🔴 维护两份数据（前端 + 后端）
- 🔴 容易出现数据不一致
- 🔴 需要手动同步状态
- 🔴 网络错误时数据可能错乱

### ✅ 现在：单一数据源

```javascript
async function createTodo(todoData) {
  await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(todoData),
  })

  // ✅ 从后端重新获取所有数据
  await fetchTodos()
}

async function toggleTodo(id) {
  await fetch(`/api/todos/${id}`, {
    method: 'PUT',
  })

  // ✅ 从后端重新获取所有数据
  await fetchTodos()
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })

  // ✅ 从后端重新获取所有数据
  await fetchTodos()
}
```

**优势**：
- ✅ 后端是唯一真实数据源
- ✅ 前端永远显示最新数据
- ✅ 不会出现数据不一致
- ✅ 代码更简单、更易维护
- ✅ 错误处理更简单

## 🔄 数据流图

### 创建 Todo

```
用户操作 → 前端发送 POST → 后端创建 → 前端重新 GET → 更新 UI
   ↓                                              ↓
 输入表单                                      最新数据列表
```

### 切换完成状态

```
用户点击 → 前端发送 PUT → 后端更新 → 前端重新 GET → 更新 UI
   ↓                                             ↓
 复选框                                      最新状态
```

### 删除 Todo

```
用户点击 → 前端发送 DELETE → 后端删除 → 前端重新 GET → 更新 UI
   ↓                                               ↓
 删除按钮                                      移除该项
```

## 💡 实现细节

### 1. 统一的数据获取

```javascript
async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}/todos`)
    todos.value = await response.json()
  } catch (error) {
    console.error('获取待办事项失败:', error)
  }
}
```

### 2. 操作后刷新

所有修改操作都遵循相同模式：

```javascript
async function [操作名称](...params) {
  try {
    // 1. 发送请求到后端
    await fetch(...)

    // 2. 重新获取最新数据
    await fetchTodos()
  } catch (error) {
    console.error('操作失败:', error)
  }
}
```

## 📈 性能考虑

### 当前数据量下的性能

对于 Todo 应用这种小规模数据：
- ✅ 每次操作重新获取全部数据**完全可接受**
- ✅ 网络请求通常 < 100ms
- ✅ 数据量小（通常 < 100 条）
- ✅ 用户体验流畅

### 大数据量时的优化方案

如果数据量增长（如 1000+ 条），可以考虑：

#### 方案 1：乐观更新（Optimistic Update）

```javascript
async function toggleTodo(id) {
  // 1. 立即更新 UI（乐观）
  const previousTodos = [...todos.value]
  todos.value = todos.value.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )

  try {
    // 2. 发送请求
    await fetch(`/api/todos/${id}`, { method: 'PUT' })
  } catch (error) {
    // 3. 失败时回滚
    todos.value = previousTodos
    console.error('操作失败:', error)
  }
}
```

优点：
- ✅ 即时反馈
- ✅ 减少网络请求

缺点：
- ❌ 需要处理回滚
- ❌ 可能显示错误状态

#### 方案 2：仅获取变化的数据

```javascript
async function toggleTodo(id) {
  const response = await fetch(`/api/todos/${id}`, { method: 'PUT' })
  const updatedTodo = await response.json()

  // 仅更新这一条
  todos.value = todos.value.map(todo =>
    todo.id === id ? updatedTodo : todo
  )
}
```

优点：
- ✅ 减少数据传输
- ✅ 响应更快

缺点：
- ❌ 需要手动同步
- ❌ 可能出现不一致

#### 方案 3：分页 + 缓存

```javascript
// 只获取当前页的数据
async function fetchTodos(page = 1, pageSize = 20) {
  const response = await fetch(`/api/todos?page=${page}&size=${pageSize}`)
  const data = await response.json()
  todos.value = data.items
}
```

## 🎯 当前选择的理由

我们选择**每次操作后重新获取全部数据**，因为：

### 1. **简单性优先**
```javascript
// ✅ 简单明了
await fetch(...)
await fetchTodos()

// ❌ 复杂的状态同步
const previousState = [...todos.value]
try {
  todos.value = optimisticUpdate(...)
  await fetch(...)
} catch {
  todos.value = previousState
}
```

### 2. **数据一致性保证**
- 后端可能有其他来源的修改
- 后端可能有额外的业务逻辑
- 始终显示最准确的数据

### 3. **错误处理简单**
```javascript
// ✅ 失败了？没关系，数据不会乱
try {
  await fetch(...)
  await fetchTodos()  // 获取真实数据
} catch (error) {
  // 数据仍然是之前的正确状态
}
```

### 4. **开发效率高**
- 不需要编写复杂的状态同步逻辑
- 不需要处理各种边界情况
- 代码易于理解和维护

## 📝 最佳实践

### 当前项目规模（小型应用）

```javascript
✅ 推荐：每次操作后重新获取
- 代码简单
- 数据准确
- 性能足够

❌ 不推荐：乐观更新
- 增加复杂度
- 收益不明显
```

### 中大型应用

```javascript
✅ 推荐：乐观更新 + 错误回滚
- 用户体验更好
- 需要仔细处理错误

✅ 推荐：分页 + 虚拟滚动
- 处理大量数据
- 减少网络传输
```

## 🔍 代码示例对比

### 完整的操作流程

```javascript
// ========== 创建 Todo ==========
async function createTodo(todoData) {
  loading.value = true
  try {
    // 步骤 1: 发送创建请求
    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData),
    })

    // 步骤 2: 获取最新数据（包括刚创建的）
    await fetchTodos()

    // 结果: todos.value 现在包含最新的完整列表
  } catch (error) {
    console.error('创建待办事项失败:', error)
    throw error
  } finally {
    loading.value = false
  }
}
```

## 🎓 学习要点

1. **单一数据源原则**
   - 后端是真理
   - 前端只是视图

2. **简单 > 复杂**
   - 优先选择简单方案
   - 性能够用就好

3. **数据一致性 > 即时反馈**
   - 宁可慢一点
   - 不能显示错误数据

4. **过早优化是万恶之源**
   - 先写简单代码
   - 确认有性能问题再优化

## 📚 相关资源

- [Single Source of Truth - Wiki](https://en.wikipedia.org/wiki/Single_source_of_truth)
- [Optimistic UI Updates](https://www.apollographql.com/docs/react/performance/optimistic-ui/)
- [Vue 3 最佳实践](https://cn.vuejs.org/guide/best-practices/)

---

**总结**：对于 Todo 应用这样的小型项目，"操作后重新获取"是最佳选择。代码简单、数据准确、易于维护。
