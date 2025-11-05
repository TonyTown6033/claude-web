# 代码风格指南

## 函数声明风格

### 我们的选择：使用 `function` 声明

```javascript
// ✅ 推荐：使用传统函数声明
async function toggleTodo(id) {
  // ...
}

export function useTodos() {
  // ...
}
```

而不是：

```javascript
// ❌ 不推荐：箭头函数（在这个项目中）
const toggleTodo = async (id) => {
  // ...
}

export const useTodos = () => {
  // ...
}
```

## 为什么选择 `function` 声明？

### 1. **更直观易读** 📖

```javascript
// 一眼就能看出这是函数
async function fetchTodos() { }

// 需要多看一眼才知道
const fetchTodos = async () => { }
```

### 2. **代码风格一致** ✨

在同一个文件中保持风格统一：

```javascript
// ✅ 风格一致
export function useTodos() {
  async function fetchTodos() { }
  async function createTodo() { }
  async function toggleTodo() { }
}

// ❌ 风格不一致（容易混淆）
export function useTodos() {
  const fetchTodos = async () => { }
  const createTodo = async () => { }
  const toggleTodo = async () => { }
}
```

### 3. **函数提升（Hoisting）** ⬆️

传统函数声明可以在定义之前调用：

```javascript
// ✅ 正常工作
doSomething()
function doSomething() { }

// ❌ 报错：Cannot access before initialization
doSomething()
const doSomething = () => { }
```

### 4. **调试更友好** 🐛

函数声明在调用堆栈中有明确的名称：

```javascript
// 堆栈显示：toggleTodo
async function toggleTodo(id) { }

// 堆栈可能显示：(anonymous)
const toggleTodo = async (id) => { }
```

### 5. **对初学者更友好** 🎓

传统声明是 JavaScript 的基础语法，更容易理解：

```javascript
// 清晰的函数定义
function add(a, b) {
  return a + b
}
```

## 何时使用箭头函数？

虽然我们主要使用 `function` 声明，但在以下情况下**推荐**使用箭头函数：

### 1. **计算属性和简短回调**

```javascript
// ✅ 计算属性：简洁明了
const completedCount = computed(() =>
  todos.value.filter(todo => todo.completed).length
)

// ✅ 数组方法：简短的回调
todos.value.map(todo => todo.id)
todos.value.filter(todo => !todo.completed)
```

### 2. **不需要 `this` 绑定的场景**

```javascript
// ✅ 事件处理器（不依赖 this）
const handleClick = () => {
  console.log('clicked')
}
```

### 3. **立即返回的函数**

```javascript
// ✅ 单行返回
const getId = () => Math.random().toString(36)
const isCompleted = (todo) => todo.completed
```

## 完整对比表

| 特性 | `function` 声明 | 箭头函数 `=>` |
|------|----------------|--------------|
| **可读性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **函数提升** | ✅ 有 | ❌ 无 |
| **this 绑定** | ✅ 有自己的 this | ❌ 继承外层 this |
| **适合场景** | 命名函数、方法 | 回调、简短函数 |
| **调试友好** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **初学者友好** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 项目代码示例

### Composables 中的函数

```javascript
export function useTodos() {
  // ✅ 所有主要函数使用 function 声明
  async function fetchTodos() { }
  async function createTodo(data) { }
  async function toggleTodo(id) { }
  async function deleteTodo(id) { }

  // ✅ 计算属性使用箭头函数
  const completedCount = computed(() =>
    todos.value.filter(todo => todo.completed).length
  )

  return {
    fetchTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    completedCount,
  }
}
```

### 组件中的函数

```javascript
// ✅ 事件处理函数
function onSubmit() {
  emit('submit', { ...form })
  form.title = ''
  form.description = ''
}

// ✅ 计算属性使用箭头函数
const completionRate = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.completed / props.total) * 100)
})
```

## 总结

在这个项目中：

1. **主要函数（功能性函数）** → 使用 `function` 声明
   - Composables 中的方法
   - 组件中的事件处理器
   - 任何有明确名称的函数

2. **辅助函数（简短回调）** → 使用箭头函数
   - `computed()` 的回调
   - 数组方法的回调（`map`, `filter`, `find` 等）
   - 单行返回的工具函数

这样的代码风格：
- ✅ 一致性高
- ✅ 易于阅读
- ✅ 对新手友好
- ✅ 调试方便

---

**记住**：代码是写给人看的，其次才是给机器执行的。选择最易读、最直观的写法！
