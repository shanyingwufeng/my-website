<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.layout {
  display: flex;
  padding-top: 56px;
  min-height: 100vh;
}

.main-content {
  margin-left: 220px;
  flex: 1;
  padding: 24px;
  min-height: calc(100vh - 56px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>