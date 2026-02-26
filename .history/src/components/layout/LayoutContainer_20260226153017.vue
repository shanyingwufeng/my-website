<template>
  <div class="layout">
    <TopNavbar />
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
import TopNavbar from './TopNavbar.vue'
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  margin-left: 220px;
  flex: 1;
  padding: 24px;
  min-height: calc(100vh - 56px);
  width: auto;
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
