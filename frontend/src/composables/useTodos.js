import { ref, computed } from 'vue'

const API_URL = 'http://localhost:8000/api'

export function useTodos() {
  const todos = ref([])
  const loading = ref(false)

  // 计算属性
  const completedCount = computed(() =>
    todos.value.filter(todo => todo.completed).length
  )

  const pendingCount = computed(() =>
    todos.value.length - completedCount.value
  )

  // 获取所有待办事项
  async function fetchTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`)
      todos.value = await response.json()
    } catch (error) {
      console.error('获取待办事项失败:', error)
    }
  }

  // 创建待办事项
  async function createTodo(todoData) {
    loading.value = true
    try {
      await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoData),
      })
      // 重新从后端获取最新数据，保持单一数据源
      await fetchTodos()
    } catch (error) {
      console.error('创建待办事项失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // 切换完成状态
  async function toggleTodo(id) {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
      })
      // 重新从后端获取最新数据
      await fetchTodos()
    } catch (error) {
      console.error('更新待办事项失败:', error)
    }
  }

  // 删除待办事项
  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })
      // 重新从后端获取最新数据
      await fetchTodos()
    } catch (error) {
      console.error('删除待办事项失败:', error)
    }
  }

  return {
    // 状态
    todos,
    loading,
    // 计算属性
    completedCount,
    pendingCount,
    // 方法
    fetchTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
  }
}
