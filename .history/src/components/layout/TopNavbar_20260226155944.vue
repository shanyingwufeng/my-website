<template>
  <nav class="navbar">
    <div class="navbar-logo">AHC 科企查</div>
    <div class="navbar-menu">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/advanced-search" class="nav-link">高级搜索</router-link>
      <router-link to="/industry-insight" class="nav-link active">产业洞察</router-link>
      <router-link to="/map-search" class="nav-link">地图搜索</router-link>
      <router-link to="/batch-search" class="nav-link">批量查询</router-link>
      <router-link to="/data-download" class="nav-link">下载数据</router-link>
      <router-link to="/more-features" class="nav-link">更多功能</router-link>
    </div>
    <div class="navbar-right">
      <input 
        type="text" 
        class="navbar-search" 
        placeholder="搜索企业名称/信用代码..."
        v-model="searchQuery"
        @input="handleSearch"
      >
      <div class="navbar-icon" @click="handleNotifications">
        🔔
      </div>
      <div class="navbar-avatar">
        甘
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = (event: Event) => {
  const query = (event.target as HTMLInputElement).value
  // TODO: Implement search functionality
  console.log('Search query:', query)
}

const handleNotifications = () => {
  // TODO: Implement notifications functionality
  console.log('Notifications clicked')
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 56px;
  background: #111827;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
}

.navbar-logo {
  width: 220px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #CBD5E1;
}

.navbar-menu {
  display: flex;
  gap: 32px;
  margin-left: 0;
}

.nav-link {
  color: rgba(255,255,255,0.75);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 2px solid transparent;
  transition: all 150ms;
}

.nav-link:hover {
  color: #fff;
  text-decoration: none;
}

.nav-link.active {
  color: #fff;
  border-bottom-color: #F5B622;
}

.navbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.navbar-search {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 9999px;
  padding: 6px 16px;
  color: #fff;
  font-size: 13px;
  width: 200px;
  outline: none;
}

.navbar-search::placeholder {
  color: rgba(255,255,255,0.4);
}

.navbar-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.75);
  cursor: pointer;
  font-size: 16px;
}

.navbar-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1A46C8;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
</style>