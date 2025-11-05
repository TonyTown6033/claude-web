<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <div class="flex items-center mb-4">
      <h2 class="text-2xl font-semibold text-gray-800">添加新任务</h2>
      <HelpTooltip>
        <p class="font-bold mb-1">💡 如何添加任务：</p>
        <ol class="list-decimal ml-4 space-y-1">
          <li>在"任务标题"输入框输入标题（必填）</li>
          <li>在"任务描述"输入框输入描述（可选）</li>
          <li>点击"添加任务"按钮提交</li>
        </ol>
        <p class="mt-2 text-xs text-gray-300">提示：标题不能为空哦！</p>
      </HelpTooltip>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <input
          v-model.trim="form.title"
          type="text"
          placeholder="任务标题"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model.trim="form.description"
          placeholder="任务描述（可选）"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        :disabled="loading || !form.title"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {{ loading ? '添加中...' : '添加任务' }}
      </button>
    </form>
  </div>
</template>

<script setup>
/**
 * 📝 TodoForm - 添加任务表单组件
 *
 * 职责：
 * 1. 提供输入框让用户输入标题和描述
 * 2. 验证输入（标题不能为空）
 * 3. 提交数据给父组件
 * 4. 提交后清空表单
 */

import { reactive } from 'vue'
import HelpTooltip from './HelpTooltip.vue'  // 导入帮助提示组件

// ======== 📥 Props - 从父组件接收的数据 ========

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

// ======== 📤 Emits - 向父组件发送的事件 ========

const emit = defineEmits(['submit'])

// ======== 📦 表单数据 ========

/**
 * 使用 reactive 创建表单对象
 * 💡 为什么用 reactive 而不是 ref？
 * 因为这是一个对象，用 reactive 可以直接访问属性，不需要 .value
 */
const form = reactive({
  title: '',       // 任务标题（必填）
  description: '', // 任务描述（可选）
})

// ======== 🎬 事件处理 ========

/**
 * 提交表单
 *
 * 💡 步骤：
 * 1. 检查标题是否为空
 * 2. 触发 submit 事件，把数据发给父组件
 * 3. 清空表单，准备下一次输入
 */
function onSubmit() {
  // 验证：标题不能为空
  if (!form.title.trim()) {
    alert('⚠️ 请输入任务标题！')
    return
  }

  console.log('📤 提交表单数据:', form)

  // 触发 submit 事件，传递表单数据
  // 💡 使用 ...form 创建数据副本，避免引用问题
  emit('submit', { ...form })

  // 重置表单
  form.title = ''
  form.description = ''

  console.log('✅ 表单已清空，可以继续添加下一个任务')
}
</script>
