<template>
  <aside class="sidebar">
    <div class="sidebar-search">
      <input
        type="text"
        placeholder="搜索产业链/产业/细分行业..."
        v-model="searchQuery"
        @input="handleSearch"
      />
    </div>
    <nav class="sidebar-nav">
      <div v-for="(category, index) in filteredCategories" :key="index" class="sidebar-group">
        <div class="sidebar-group-title" @click="toggleGroup(index)">
          <span class="arrow" :class="{ open: openGroups.includes(index) }">▶</span>
          {{ category.cat }}
        </div>
        <div class="sidebar-children" :class="{ open: openGroups.includes(index) }">
          <router-link
            v-for="chain in category.chains"
            :key="chain.name"
            :to="`/chain/${encodeURIComponent(chain.name)}/产业链`"
            class="sidebar-item"
          >
            {{ chain.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { INDUSTRY_DATA } from '../../data/industryData'
import type { IndustryData } from '../../types'

const route = useRoute()
const searchQuery = ref('')
const openGroups = ref<number[]>([0])

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return INDUSTRY_DATA
  }

  const query = searchQuery.value.toLowerCase()
  return INDUSTRY_DATA.map((cat: IndustryData) => ({
    cat: cat.cat,
    chains: cat.chains.filter(
      (chain) => chain.name.toLowerCase().includes(query) || cat.cat.toLowerCase().includes(query),
    ),
  })).filter((cat) => cat.chains.length > 0)
})

const toggleGroup = (index: number) => {
  const idx = openGroups.value.indexOf(index)
  if (idx === -1) {
    openGroups.value.push(index)
  } else {
    openGroups.value.splice(idx, 1)
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    openGroups.value = filteredCategories.value.map((_, idx) => idx)
  }
}

// 计算当前选中的链名称
const currentChainName = computed(() => {
  const params = route.params
  if (params.chainName) {
    return Array.isArray(params.chainName) ? params.chainName[0] : params.chainName
  }
  return null
})
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #ffffff;
  border-right: 1px solid #e4e6eb;
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 200;
  flex-shrink: 0;
}

.sidebar-search {
  padding: 16px;
  border-bottom: 1px solid #f0f1f5;
}

.sidebar-search input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e4e6eb;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  background: #f8f9fc;
}

.sidebar-search input:focus {
  border-color: #3562e3;
}

.sidebar-nav {
  padding: 8px 0;
}

.sidebar-group {
  margin-bottom: 4px;
}

.sidebar-group-title {
  padding: 10px 16px 6px;
  font-size: 13px;
  font-weight: 600;
  color: #242b3a;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
}

.sidebar-group-title:hover {
  color: #0f3298;
}

.sidebar-group-title .arrow {
  font-size: 10px;
  transition: transform 200ms;
  color: #a6abb5;
}

.sidebar-group-title .arrow.open {
  transform: rotate(90deg);
}

.sidebar-item {
  display: block;
  padding: 7px 16px 7px 32px;
  font-size: 12px;
  color: #606878;
  cursor: pointer;
  transition: all 150ms;
  border-left: 3px solid transparent;
  text-decoration: none;
}

.sidebar-item:hover {
  background: #f8f9fc;
  color: #0f3298;
  text-decoration: none;
}

.sidebar-item.active {
  background: #eef2ff;
  color: #0f3298;
  border-left-color: #0f3298;
  font-weight: 500;
}

.sidebar-children {
  display: none;
}

.sidebar-children.open {
  display: block;
}
</style>
