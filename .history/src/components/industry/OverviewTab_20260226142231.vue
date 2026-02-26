<template>
  <div class="tab-body">
    <div class="module-section">
      <div class="region-selector">
        <label>区域选择：</label>
        <select class="region-select" v-model="selectedProvince" @change="onRegionChange">
          <option value="">全国</option>
          <option value="安徽省">安徽省</option>
          <option value="广东省">广东省</option>
          <option value="江苏省">江苏省</option>
          <option value="浙江省">浙江省</option>
          <option value="上海市">上海市</option>
        </select>
        <select class="region-select" v-model="selectedCity" :disabled="!selectedProvince">
          <option value="">全部城市</option>
        </select>
        <select class="region-select" v-model="selectedDistrict" :disabled="!selectedCity">
          <option value="">全部区县</option>
        </select>
        <div class="region-current">
          当前：<strong>{{ currentRegion }}</strong>
        </div>
      </div>
    </div>

    <div class="module-section">
      <div class="module-title">地区分布情况</div>
      <div class="map-table-row">
        <div class="map-placeholder">
          <svg class="map-china" viewBox="0 0 500 400">
            <path
              d="M250,20 Q400,50 450,150 Q480,250 420,320 Q350,380 250,370 Q150,380 80,320 Q20,250 50,150 Q100,50 250,20Z"
              fill="#BAC8FF"
              opacity="0.3"
              stroke="#8DA6F5"
              stroke-width="1"
            />
            <circle cx="380" cy="200" r="15" fill="#0F3298" opacity="0.7" />
            <text x="380" y="204" text-anchor="middle" fill="#fff" font-size="8">粤</text>
            <circle cx="340" cy="170" r="12" fill="#1A46C8" opacity="0.7" />
            <text x="340" y="174" text-anchor="middle" fill="#fff" font-size="8">浙</text>
            <circle cx="310" cy="150" r="13" fill="#1A46C8" opacity="0.7" />
            <text x="310" y="154" text-anchor="middle" fill="#fff" font-size="8">苏</text>
            <circle cx="290" cy="180" r="14" fill="#0F3298" opacity="0.7" />
            <text x="290" y="184" text-anchor="middle" fill="#fff" font-size="8">皖</text>
            <circle cx="200" cy="140" r="10" fill="#3562E3" opacity="0.7" />
            <text x="200" y="144" text-anchor="middle" fill="#fff" font-size="7">豫</text>
            <circle cx="160" cy="180" r="11" fill="#3562E3" opacity="0.7" />
            <text x="160" y="184" text-anchor="middle" fill="#fff" font-size="7">川</text>
            <circle cx="250" cy="100" r="10" fill="#3562E3" opacity="0.7" />
            <text x="250" y="104" text-anchor="middle" fill="#fff" font-size="7">鲁</text>
            <circle cx="180" cy="90" r="8" fill="#8DA6F5" opacity="0.7" />
            <text x="180" y="94" text-anchor="middle" fill="#fff" font-size="7">陕</text>
          </svg>
          <div class="map-label">💡 实际开发中接入ECharts地图组件</div>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>排名</th>
                <th>地区</th>
                <th>产业链</th>
                <th>重点企业</th>
                <th>科创企业</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(region, index) in REGION_DATA" :key="index">
                <td>
                  <span class="rank" :class="{ [`rank-${region.rank}`]: region.rank <= 3 }">{{
                    region.rank
                  }}</span>
                </td>
                <td>{{ region.name }}</td>
                <td class="num">{{ region.chain.toLocaleString() }}</td>
                <td class="num">{{ region.key.toLocaleString() }}</td>
                <td class="num">{{ region.sci.toLocaleString() }}</td>
              </tr>
              <tr class="total-row">
                <td><span class="rank">合计</span></td>
                <td>全国</td>
                <td class="num">{{ totalChain.toLocaleString() }}</td>
                <td class="num">{{ totalKey.toLocaleString() }}</td>
                <td class="num">{{ totalSci.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="module-section">
      <div class="module-title">科创企业分布</div>
      <div class="scitech-grid">
        <div v-for="(tag, index) in SCITECH_TAGS" :key="index" class="scitech-tag">
          {{ tag.name }}
        </div>
      </div>
    </div>

    <div class="module-section">
      <div class="module-title">产业节点分布</div>
      <div class="chain-path-container">
        <div v-for="(item, index) in CHAIN_PATH" :key="index" class="chain-path-item">
          <div class="chain-path-industry">{{ item.industry }}</div>
          <div class="chain-path-subs">
            <span v-for="(sub, subIndex) in item.subs" :key="subIndex" class="chain-path-sub">
              {{ sub }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="module-section">
      <div class="module-title">地区交叉分析</div>
      <div class="cross-table-container">
        <table class="cross-table">
          <thead>
            <tr>
              <th>地区</th>
              <th v-for="col in CROSS_DATA.cols" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in CROSS_DATA.rows" :key="index">
              <td>{{ row.name }}</td>
              <td v-for="(val, valIndex) in row.vals" :key="valIndex" class="num">
                {{ val.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { REGION_DATA, SCITECH_TAGS, CHAIN_PATH, CROSS_DATA } from '../../data/industryData'
import type { RegionData, ScitechTag, ChainPathItem } from '../../types'

const selectedProvince = ref('')
const selectedCity = ref('')
const selectedDistrict = ref('')

const currentRegion = computed(() => {
  if (selectedProvince.value) {
    return selectedProvince.value
  }
  return '全国'
})

const totalChain = computed(() => {
  return REGION_DATA.reduce((sum, region) => sum + region.chain, 0)
})

const totalKey = computed(() => {
  return REGION_DATA.reduce((sum, region) => sum + region.key, 0)
})

const totalSci = computed(() => {
  return REGION_DATA.reduce((sum, region) => sum + region.sci, 0)
})

const onRegionChange = () => {
  selectedCity.value = ''
  selectedDistrict.value = ''

  // TODO: 实现城市和区县数据加载逻辑
  console.log('Region changed:', selectedProvince.value)
}
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

.region-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.region-select {
  padding: 6px 12px;
  border: 1px solid #e4e6eb;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  background: #ffffff;
}

.region-select:focus {
  border-color: #3562e3;
}

.region-current {
  font-size: 13px;
  color: #606878;
}

.region-current strong {
  color: #242b3a;
  font-weight: 600;
}

.map-table-row {
  display: flex;
  gap: 24px;
}

.map-placeholder {
  flex: 1;
  background: #f8f9fc;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.map-china {
  width: 100%;
  max-width: 400px;
  height: 300px;
}

.map-label {
  font-size: 12px;
  color: #808898;
}

.data-table-container {
  flex: 1;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.data-table th {
  background: #f8f9fc;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #242b3a;
  text-align: left;
  border-bottom: 1px solid #e4e6eb;
}

.data-table td {
  padding: 12px 16px;
  font-size: 13px;
  color: #606878;
  border-bottom: 1px solid #f0f1f5;
}

.data-table .num {
  font-family: 'DIN Alternate', 'DIN', 'Roboto', sans-serif;
  font-weight: 600;
  color: #1a46c8;
}

.rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background: #e4e6eb;
  color: #808898;
}

.rank-1 {
  background: #f5b622;
  color: #ffffff;
}

.rank-2 {
  background: #f5b622;
  color: #ffffff;
}

.rank-3 {
  background: #f5b622;
  color: #ffffff;
}

.total-row {
  background: #f8f9fc;
  font-weight: 600;
}

.total-row td {
  color: #242b3a;
  border-bottom: 1px solid #e4e6eb;
}

.scitech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.scitech-tag {
  background: #eef2ff;
  color: #1a46c8;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms;
}

.scitech-tag:hover {
  background: #dbe4ff;
  color: #0f3298;
}

.hbar-chart-container {
  width: 100%;
}

.hbar-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hbar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hbar-label {
  width: 120px;
  font-size: 13px;
  color: #242b3a;
  font-weight: 500;
}

.hbar-bar {
  flex: 1;
  height: 20px;
  background: #f0f1f5;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.hbar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3562e3, #8da6f5);
  border-radius: 10px;
  transition: width 300ms ease;
}

.hbar-value {
  width: 80px;
  font-size: 13px;
  font-family: 'DIN Alternate', 'DIN', 'Roboto', sans-serif;
  font-weight: 600;
  color: #1a46c8;
}

.cross-table-container {
  width: 100%;
}

.cross-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.cross-table th {
  background: #f8f9fc;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #242b3a;
  text-align: left;
  border-bottom: 1px solid #e4e6eb;
}

.cross-table td {
  padding: 12px 16px;
  font-size: 13px;
  color: #606878;
  border-bottom: 1px solid #f0f1f5;
}

.cross-table .num {
  font-family: 'DIN Alternate', 'DIN', 'Roboto', sans-serif;
  font-weight: 600;
  color: #1a46c8;
}
</style>
