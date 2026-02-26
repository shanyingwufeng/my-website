<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>产业洞察平台</h1>
      <p>探索产业链条，洞察产业趋势，赋能企业发展</p>
    </div>
    
    <div class="quick-actions">
      <div class="action-card">
        <div class="card-icon">📊</div>
        <h3>产业概览</h3>
        <p>查看各产业链的详细数据和统计信息</p>
        <router-link to="/industry" class="action-btn">开始探索</router-link>
      </div>
      
      <div class="action-card">
        <div class="card-icon">🔗</div>
        <h3>产业链分析</h3>
        <p>深入了解产业链的各个环节和节点分布</p>
        <router-link to="/industry" class="action-btn">查看产业链</router-link>
      </div>
      
      <div class="action-card">
        <div class="card-icon">🏢</div>
        <h3>企业信息</h3>
        <p>查找重点企业和链上企业信息</p>
        <router-link to="/industry" class="action-btn">查找企业</router-link>
      </div>
    </div>
    
    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-number">{{ totalChains }}</div>
        <div class="stat-label">产业链条</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalEnterprises }}</div>
        <div class="stat-label">企业总数</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ totalRegions }}</div>
        <div class="stat-label">覆盖地区</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { INDUSTRY_DATA } from '../data/industryData'

const totalChains = computed(() => {
  return INDUSTRY_DATA.reduce((total, category) => total + category.chains.length, 0)
})

const totalEnterprises = computed(() => {
  return 89560 // 调用企业数量
})

const totalRegions = computed(() => {
  return 10 // 覆盖地区数量
})
</script>

<style scoped>
.home-container {
  width: 100%;
  padding-top: 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 36px;
  font-weight: 700;
  color: #242B3A;
  margin-bottom: 16px;
}

.hero-section p {
  font-size: 18px;
  color: #606878;
  line-height: 1.6;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 60px;
}

.action-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  text-align: center;
  transition: all 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.action-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #242B3A;
  margin-bottom: 12px;
}

.action-card p {
  font-size: 14px;
  color: #606878;
  line-height: 1.6;
  margin-bottom: 20px;
}

.action-btn {
  display: inline-block;
  padding: 10px 24px;
  background: #5488E9;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #4171D6;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #F0F1F5;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #5488E9;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: #606878;
  font-weight: 500;
}
</style>