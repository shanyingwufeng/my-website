<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutContainer from './components/layout/LayoutContainer.vue'
</script>

<template>
  <LayoutContainer>
    <RouterView />
  </LayoutContainer>
</template>

<style>
/* 全局样式 */
html,
body {
  margin: 0;
  padding: 0;
  font-family: var(--font-family-base);
}

#app {
  min-height: 100vh;
}

/* 消除默认滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-neutral-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-400);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-500);
}
</style>
