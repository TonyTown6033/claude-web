<template>
  <div class="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
    <div class="flex items-start gap-3">
      <input
        :checked="todo.completed"
        type="checkbox"
        class="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        @change="$emit('toggle', todo.id)"
      />
      <div class="flex-1">
        <h3
          :class="[
            'text-lg font-medium transition-all',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          ]"
        >
          {{ todo.title }}
        </h3>
        <p
          v-if="todo.description"
          :class="[
            'text-sm mt-1 transition-all',
            todo.completed ? 'text-gray-300' : 'text-gray-600'
          ]"
        >
          {{ todo.description }}
        </p>
      </div>
      <button
        class="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
        @click="$emit('delete', todo.id)"
      >
        删除
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

defineEmits(['toggle', 'delete'])
</script>
