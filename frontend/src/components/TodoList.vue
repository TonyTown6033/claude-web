<template>
  <div class="space-y-3">
    <div
      v-if="!todos.length"
      class="bg-white rounded-lg shadow p-6 text-center text-gray-500"
    >
      <p class="text-lg">{{ emptyMessage }}</p>
    </div>

    <TransitionGroup
      v-else
      name="list"
      tag="div"
      class="space-y-3"
    >
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle', $event)"
        @delete="$emit('delete', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: '暂无待办事项，快来添加一个吧！',
  },
})

defineEmits(['toggle', 'delete'])
</script>

<style scoped>
/* 列表过渡动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
