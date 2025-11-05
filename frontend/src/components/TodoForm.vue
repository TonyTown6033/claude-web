<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">添加新任务</h2>
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
import { reactive } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '',
  description: '',
})

function onSubmit() {
  if (!form.title) return

  emit('submit', { ...form })

  // 重置表单
  form.title = ''
  form.description = ''
}
</script>
