<template>
  <div class="nav-page">
    <div class="nav-page-title">
      <div class="icon">🏭</div>
      产业导航
    </div>
    <div class="categories-container">
      <div 
        v-for="(category, categoryIndex) in INDUSTRY_DATA" 
        :key="categoryIndex"
        class="category-section"
      >
        <div class="category-title">{{ category.cat }}</div>
        <div class="cards-grid">
          <router-link
            v-for="chain in category.chains"
            :key="chain.name"
            :to="`/chain/${encodeURIComponent(chain.name)}/产业链`"
            class="industry-card"
          >
            <div class="card-icon">{{ chain.icon }}</div>
            <div class="card-info">
              <div class="card-name">{{ chain.name }}</div>
              <div class="card-count">
                企业 <span>{{ chain.count.toLocaleString() }}</span> 家
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { INDUSTRY_DATA } from '../../data/industryData'
import type { IndustryData } from '../../types'
</script>

<style scoped>
.nav-page {
  width: 100%;
  padding-top: 20px;
}

.nav-page-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-page-title .icon {
  width: 28px;
  height: 28px;
  background: #0F3298;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.category-section {
  margin-bottom: 32px;
}

.category-title {
  font-size: 14px;
  font-weight: 600;
  color: #242B3A;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.industry-card {
  background: #FFFFFF;
  border: 1px solid #E4E6EB;
  border-radius: 6px;
  padding: 20px;
  cursor: pointer;
  transition: all 200ms;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 14px;
}

.industry-card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
  transform: translateY(-2px);
  border-color: #BAC8FF;
  text-decoration: none;
}

.industry-card .card-icon {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: linear-gradient(135deg, #EEF2FF, #DBE4FF);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.industry-card .card-info {
  flex: 1;
  min-width: 0;
}

.industry-card .card-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.industry-card .card-count {
  font-size: 12px;
  color: #808898;
  margin-top: 4px;
}

.industry-card .card-count span {
  font-family: "DIN Alternate", "DIN", "Roboto", sans-serif;
  color: #1A46C8;
  font-weight: 600;
}
</style>