/**
 * 📚 useTodos - Todos 业务逻辑组合式函数
 *
 * 这个函数封装了所有与待办事项相关的逻辑
 * 让代码更容易复用和维护
 */

import { ref, computed } from 'vue'

// 后端 API 的基础地址
// 💡 提示：确保后端服务器运行在 http://localhost:8000
const API_URL = 'http://localhost:8000/api'

export function useTodos() {
  // ======== 📦 响应式状态 ========

  // todos: 存储所有待办事项的数组
  // 💡 ref() 让数据变成响应式，数据改变时界面会自动更新
  const todos = ref([])

  // loading: 标记是否正在加载中
  // 💡 用于显示"添加中..."等加载提示
  const loading = ref(false)

  // ======== 🧮 计算属性 ========

  // completedCount: 已完成的任务数量
  // 💡 computed() 会自动计算，当 todos 变化时自动更新
  const completedCount = computed(() =>
    todos.value.filter(todo => todo.completed).length
  )

  // pendingCount: 未完成的任务数量
  // 💡 总数减去已完成数 = 未完成数
  const pendingCount = computed(() =>
    todos.value.length - completedCount.value
  )

  // ======== 🔧 业务方法 ========

  /**
   * 📥 获取所有待办事项
   *
   * 从后端获取所有 todos 并更新到 todos 数组
   * 这是我们的"单一数据源" - 后端是唯一的真实数据
   */
  async function fetchTodos() {
    try {
      // 1. 向后端发送 GET 请求
      const response = await fetch(`${API_URL}/todos`)

      // 2. 将响应的 JSON 数据转换为 JavaScript 数组
      const data = await response.json()

      // 3. 更新 todos，Vue 会自动更新界面
      todos.value = data

      console.log('✅ 成功获取待办事项，共', data.length, '条')
    } catch (error) {
      // 如果出错，在控制台显示错误信息
      console.error('❌ 获取待办事项失败:', error)
      alert('获取待办事项失败，请检查后端服务器是否运行')
    }
  }

  /**
   * ➕ 创建新的待办事项
   *
   * @param {Object} todoData - 包含 title 和 description 的对象
   *
   * 💡 重要：创建后不是手动添加到数组，而是重新获取所有数据
   * 这样能确保显示的是后端的真实数据
   */
  async function createTodo(todoData) {
    // 开始加载，显示"添加中..."
    loading.value = true

    try {
      // 1. 向后端发送 POST 请求创建新 todo
      await fetch(`${API_URL}/todos`, {
        method: 'POST',  // POST 表示创建新数据
        headers: {
          'Content-Type': 'application/json'  // 告诉后端我们发送的是 JSON
        },
        body: JSON.stringify(todoData),  // 将对象转换为 JSON 字符串
      })

      // 2. 重新从后端获取最新数据
      // ⭐ 这是"单一数据源"原则 - 后端是唯一的真实数据
      await fetchTodos()

      console.log('✅ 成功创建待办事项:', todoData.title)
    } catch (error) {
      console.error('❌ 创建待办事项失败:', error)
      alert('创建失败，请重试')
      throw error  // 抛出错误，让调用者知道失败了
    } finally {
      // 无论成功还是失败，都要停止加载状态
      loading.value = false
    }
  }

  /**
   * 🔄 切换待办事项的完成状态
   *
   * @param {string} id - 待办事项的唯一标识符
   *
   * 点击复选框时调用，将"未完成"切换为"已完成"，或反过来
   */
  async function toggleTodo(id) {
    try {
      // 1. 向后端发送 PUT 请求
      // PUT 表示更新现有数据
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
      })

      // 2. 重新获取所有数据
      // 💡 虽然只改了一条，但我们选择重新获取所有数据
      // 这样更简单，也能确保数据的一致性
      await fetchTodos()

      console.log('✅ 成功切换完成状态')
    } catch (error) {
      console.error('❌ 更新待办事项失败:', error)
      alert('更新失败，请重试')
    }
  }

  /**
   * 🗑️ 删除待办事项
   *
   * @param {string} id - 要删除的待办事项的 ID
   *
   * 点击"删除"按钮时调用
   */
  async function deleteTodo(id) {
    try {
      // 1. 向后端发送 DELETE 请求
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      // 2. 重新获取最新数据
      // 被删除的项会自动从列表中消失
      await fetchTodos()

      console.log('✅ 成功删除待办事项')
    } catch (error) {
      console.error('❌ 删除待办事项失败:', error)
      alert('删除失败，请重试')
    }
  }

  // ======== 📤 返回值 ========

  // 将状态和方法返回，供组件使用
  // 💡 组件可以通过解构获取需要的部分
  return {
    // 响应式状态
    todos,           // 待办事项数组
    loading,         // 加载状态

    // 计算属性
    completedCount,  // 已完成数量
    pendingCount,    // 未完成数量

    // 方法
    fetchTodos,      // 获取数据
    createTodo,      // 创建新项
    toggleTodo,      // 切换状态
    deleteTodo,      // 删除项
  }
}

/**
 * 💡 使用示例：
 *
 * import { useTodos } from './composables/useTodos'
 *
 * const { todos, loading, createTodo, deleteTodo } = useTodos()
 *
 * // 现在就可以使用这些状态和方法了！
 */
