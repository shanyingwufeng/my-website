<template>
  <div class="layout">
    <TopNavbar />
    <Sidebar />
    <div class="content-wrapper">
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
  background: #f8f9fc;
}

.content-wrapper {
  margin-left: 220px;
  flex: 1;
  padding: 80px 24px 24px;
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
