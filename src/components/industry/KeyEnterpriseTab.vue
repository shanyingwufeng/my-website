<template>
  <div class="tab-body">
    <div class="module-section">
      <div class="module-title">重点企业</div>
      <div class="key-enterprise-container">
        <div class="enterprise-grid">
          <div 
            v-for="enterprise in KEY_ENTERPRISES" 
            :key="enterprise.name"
            class="enterprise-card"
          >
            <div class="enterprise-header">
              <div class="enterprise-icon">🏢</div>
              <div class="enterprise-info">
                <h3 class="enterprise-name">{{ enterprise.name }}</h3>
                <p class="enterprise-alias">{{ enterprise.alias }}</p>
              </div>
            </div>
            
            <div class="enterprise-details">
              <div class="detail-row">
                <span class="label">法定代表人:</span>
                <span class="value">{{ enterprise.legal }}</span>
              </div>
              <div class="detail-row">
                <span class="label">所在地:</span>
                <span class="value">{{ enterprise.city }}</span>
              </div>
              <div class="detail-row">
                <span class="label">注册资本:</span>
                <span class="value">{{ enterprise.capital.toLocaleString() }}万元</span>
              </div>
              <div class="detail-row">
                <span class="label">所属行业:</span>
                <span class="value">{{ enterprise.industry }}</span>
              </div>
              <div class="detail-row">
                <span class="label">标签:</span>
                <div class="tags">
                  <span 
                    v-for="(tag, index) in enterprise.tags" 
                    :key="index"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="enterprise-footer">
              <button class="detail-btn">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KeyEnterprise } from '../../types'
import { KEY_ENTERPRISES } from '../../data/industryData'
</script>

<style scoped>
.module-section {
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #F0F1F5;
}

.module-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.module-title {
  font-size: 15px;
  font-weight: 600;
  color: #242B3A;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.key-enterprise-container {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
}

.enterprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 20px;
}

.enterprise-card {
  background: #FAFBFC;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #E3E8EE;
  transition: all 0.2s ease;
}

.enterprise-card:hover {
  border-color: #5488E9;
  box-shadow: 0 4px 12px rgba(84, 136, 233, 0.15);
}

.enterprise-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.enterprise-icon {
  font-size: 24px;
  color: #5488E9;
  flex-shrink: 0;
}

.enterprise-info {
  flex: 1;
}

.enterprise-name {
  font-size: 16px;
  font-weight: 600;
  color: #242B3A;
  margin: 0 0 4px 0;
}

.enterprise-alias {
  font-size: 14px;
  color: #606878;
  margin: 0;
}

.enterprise-details {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 14px;
  color: #606878;
  min-width: 80px;
  margin-right: 8px;
}

.value {
  font-size: 14px;
  color: #242B3A;
  font-weight: 500;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 4px;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  background: #E8F0FE;
  color: #5488E9;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.enterprise-footer {
  display: flex;
  justify-content: flex-end;
}

.detail-btn {
  padding: 6px 16px;
  background: #5488E9;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-btn:hover {
  background: #4171D6;
  transform: translateY(-1px);
}
</style>