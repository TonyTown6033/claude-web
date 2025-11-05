<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
    <div class="max-w-3xl mx-auto">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-indigo-900 mb-2">
          📝 待办事项应用
        </h1>
        <p class="text-gray-600">使用 Vue 3 Composition API 构建</p>

        <!-- 💡 初学者提示 -->
        <div class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <p>
            💡 <strong>新手提示：</strong>
            打开浏览器的<strong>开发者工具</strong>（按 F12），查看控制台可以看到详细的操作日志
          </p>
        </div>
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
/**
 * 📱 App.vue - 应用的主组件
 *
 * 这是整个应用的入口组件，负责：
 * 1. 组合各个子组件（表单、列表、统计）
 * 2. 管理数据和业务逻辑（通过 useTodos）
 * 3. 协调组件之间的通信
 */

// ======== 📦 导入依赖 ========

import { onMounted } from 'vue'  // Vue 的生命周期钩子

// 导入我们的业务逻辑
import { useTodos } from './composables/useTodos'

// 导入子组件
import TodoForm from './components/TodoForm.vue'   // 表单组件
import TodoList from './components/TodoList.vue'   // 列表组件
import TodoStats from './components/TodoStats.vue' // 统计组件

// ======== 🎯 使用 Composable ========

/**
 * 从 useTodos 中解构出我们需要的所有功能
 *
 * 💡 这就像从工具箱中拿出需要的工具
 * - todos: 待办事项数据
 * - loading: 加载状态
 * - completedCount: 已完成数量
 * - pendingCount: 未完成数量
 * - fetchTodos: 获取数据的方法
 * - createTodo: 创建新项的方法
 * - toggleTodo: 切换状态的方法
 * - deleteTodo: 删除项的方法
 */
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

// ======== 🎬 事件处理 ========

/**
 * 处理创建待办事项
 *
 * @param {Object} todoData - 从表单组件传来的数据 { title, description }
 *
 * 💡 这个函数是 TodoForm 和 useTodos 之间的桥梁
 * TodoForm 触发 submit 事件 → handleCreateTodo 接收 → createTodo 处理
 */
async function handleCreateTodo(todoData) {
  try {
    await createTodo(todoData)
    // 成功后 useTodos 会自动刷新列表
  } catch (error) {
    // 错误已在 useTodos 中处理，这里不需要额外处理
  }
}

// ======== 🚀 生命周期 ========

/**
 * 组件挂载时获取数据
 *
 * 💡 onMounted 会在组件加载到页面后立即执行
 * 类似于"页面打开时自动加载数据"
 */
onMounted(() => {
  console.log('🚀 应用已启动，正在加载数据...')
  fetchTodos()
})
</script>
