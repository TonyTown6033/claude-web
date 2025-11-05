<template>
  <Transition name="fade">
    <div
      v-if="total > 0"
      class="mt-6 bg-white rounded-lg shadow p-4"
    >
      <div class="flex items-center justify-around">
        <div class="text-center">
          <p class="text-sm text-gray-500">总任务</p>
          <p class="text-2xl font-bold text-indigo-600">{{ total }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">已完成</p>
          <p class="text-2xl font-bold text-green-600">{{ completed }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">进行中</p>
          <p class="text-2xl font-bold text-orange-600">{{ pending }}</p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">完成率</p>
          <p class="text-2xl font-bold text-purple-600">{{ completionRate }}%</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Number,
    default: 0,
  },
  pending: {
    type: Number,
    default: 0,
  },
})

const completionRate = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.completed / props.total) * 100)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
