<template>
  <!-- 💡 帮助提示组件 - 可以在任何地方使用 -->
  <div class="relative inline-block ml-2">
    <!-- 问号图标按钮 -->
    <button
      @click="showTooltip = !showTooltip"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-help"
      aria-label="帮助提示"
    >
      ?
    </button>

    <!-- 提示内容（悬浮框） -->
    <Transition name="fade">
      <div
        v-if="showTooltip"
        class="absolute z-10 w-64 p-3 mt-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg left-1/2 transform -translate-x-1/2"
      >
        <!-- 小三角形 -->
        <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>

        <!-- 提示文字 -->
        <slot>这是默认的帮助提示</slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
/**
 * 💡 HelpTooltip - 帮助提示组件
 *
 * 使用方法：
 * <HelpTooltip>这里写帮助文字</HelpTooltip>
 */
import { ref } from 'vue'

// 控制提示是否显示
const showTooltip = ref(false)
</script>

<style scoped>
/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
