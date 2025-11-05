<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-indigo-900 mb-2">
          待办事项应用
        </h1>
        <p class="text-gray-600">使用 Vue 3 Composition API 构建</p>
      </header>

      <!-- 创建表单 -->
      <TodoForm
        :loading="loading"
        @submit="handleCreateTodo"
      />

      <!-- 待办事项列表 -->
      <TodoList
        :todos="todos"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />

      <!-- 统计信息 -->
      <TodoStats
        :total="todos.length"
        :completed="completedCount"
        :pending="pendingCount"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodos } from './composables/useTodos'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import TodoStats from './components/TodoStats.vue'

// 使用组合式函数
const {
  todos,
  loading,
  completedCount,
  pendingCount,
  fetchTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} = useTodos()

// 处理创建待办事项
async function handleCreateTodo(todoData) {
  await createTodo(todoData)
}

// 组件挂载时获取数据
onMounted(fetchTodos)
</script>
