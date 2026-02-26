<template>
  <div class="tab-body">
    <div class="module-section">
      <div class="module-title">链上企业</div>
      <div class="enterprise-table-container">
        <div class="table-header">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜索企业名称..."
              class="search-input"
            />
            <div class="search-icon">🔍</div>
          </div>
        </div>

        <table class="enterprise-table">
          <thead>
            <tr>
              <th>企业名称</th>
              <th>简称</th>
              <th>法定代表人</th>
              <th>所在地区</th>
              <th>注册资本</th>
              <th>所属行业</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="enterprise in filteredEnterprises"
              :key="enterprise.name"
              class="enterprise-row"
            >
              <td class="enterprise-name">{{ enterprise.name }}</td>
              <td>{{ enterprise.alias }}</td>
              <td>{{ enterprise.legal }}</td>
              <td>{{ enterprise.city }}</td>
              <td class="num">{{ enterprise.capital.toLocaleString() }}万元</td>
              <td>{{ enterprise.industry }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredEnterprises.length === 0" class="no-results">
          <div class="no-results-icon">📭</div>
          <p>未找到匹配的企业</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Enterprise } from '../../types'
import { ENTERPRISES } from '../../data/industryData'

const searchQuery = ref('')

const filteredEnterprises = computed(() => {
  if (!searchQuery.value.trim()) {
    return ENTERPRISES
  }

  const query = searchQuery.value.toLowerCase().trim()
  return ENTERPRISES.filter(
    (enterprise: Enterprise) =>
      enterprise.name.toLowerCase().includes(query) ||
      enterprise.alias.toLowerCase().includes(query) ||
      enterprise.legal.toLowerCase().includes(query) ||
      enterprise.city.toLowerCase().includes(query) ||
      enterprise.industry.toLowerCase().includes(query),
  )
})
</script>

<style scoped>
.module-section {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #f0f1f5;
}

.module-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.module-title {
  font-size: 15px;
  font-weight: 600;
  color: #242b3a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.enterprise-table-container {
  background: #ffffff;
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.table-header {
  padding: 16px;
  border-bottom: 1px solid #f0f1f5;
}

.search-box {
  position: relative;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 8px 36px 8px 12px;
  border: 1px solid #e3e8ee;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: #5488e9;
  box-shadow: 0 0 0 3px rgba(84, 136, 233, 0.1);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #606878;
  font-size: 14px;
}

.enterprise-table {
  width: 100%;
  border-collapse: collapse;
}

.enterprise-table th {
  background: #fafbfc;
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #242b3a;
  border-bottom: 1px solid #f0f1f5;
}

.enterprise-table td {
  padding: 12px 16px;
  font-size: 14px;
  color: #606878;
  border-bottom: 1px solid #f0f1f5;
}

.enterprise-table tr:last-child td {
  border-bottom: none;
}

.enterprise-row:hover {
  background: #fafbfc;
}

.enterprise-name {
  font-weight: 500;
  color: #242b3a;
}

.num {
  font-weight: 500;
  color: #242b3a;
  text-align: right;
}

.no-results {
  padding: 60px 16px;
  text-align: center;
  color: #808898;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
</style>
