<template>
  <div class="chain-page">
    <div class="breadcrumb">
      <router-link to="/industry-insight">产业洞察</router-link>
      <span class="sep">/</span>
      <span class="current">{{ decodedChainName }}</span>
    </div>

    <div class="chain-header">
      <div class="chain-header-top">
        <div class="chain-title">
          <span>{{ decodedChainName }}</span>
          <span class="level-tag">{{ levelType }}</span>
        </div>
        <span class="chain-back" @click="goBack">↩ 返回上一级</span>
      </div>

      <div v-if="chainPath.length > 0" class="chain-path-header">
        <div class="chain-path-list">
          <span v-for="(item, index) in chainPath" :key="index" class="chain-path-item">
            <router-link
              v-if="index < chainPath.length - 1"
              :to="`/chain/${encodeURIComponent(item.name)}/${item.level}`"
            >
              {{ item.name }}
            </router-link>
            <span v-else class="active">{{ item.name }}</span>
            <span v-if="index < chainPath.length - 1" class="sep">/</span>
          </span>
        </div>
      </div>

      <div class="chain-desc-wrap">
        <div class="chain-desc" :class="{ collapsed: isDescCollapsed }">
          {{ chainDescription }}
        </div>
        <div class="chain-desc-toggle" @click="toggleDesc">
          <span>{{ isDescCollapsed ? '展开查看更多' : '收起' }}</span>
          <span>{{ isDescCollapsed ? '▼' : '▲' }}</span>
        </div>
      </div>
    </div>

    <div class="tab-nav">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="tab-content">
      <component :is="currentTabComponent" :chain-name="decodedChainName" :level-type="levelType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OverviewTab from './OverviewTab.vue'
import GraphTab from './GraphTab.vue'
import EnterpriseTab from './EnterpriseTab.vue'
import KeyEnterpriseTab from './KeyEnterpriseTab.vue'
import type { TabType } from '../../types'

interface Tab {
  key: TabType
  label: string
}

const route = useRoute()
const router = useRouter()

const activeTab = ref<TabType>('overview')
const isDescCollapsed = ref(true)

const decodedChainName = computed(() => {
  const name = route.params.chainName as string
  return decodeURIComponent(name)
})

const levelType = computed(() => {
  const level = route.params.levelType as string
  return level || '产业链'
})

const chainPath = computed(() => {
  const chain = decodedChainName.value
  const level = levelType.value

  if (level === '产业链') {
    return [{ name: chain, level: '产业链' }]
  } else if (level === '产业') {
    return [
      { name: chain, level: '产业链' },
      { name: '产业分类', level: '产业' },
    ]
  } else {
    return [
      { name: chain, level: '产业链' },
      { name: '产业分类', level: '产业' },
      { name: '细分领域', level: '细分行业' },
    ]
  }
})

const chainDescription = computed(() => {
  const descriptions: Record<string, string> = {
    新能源汽车:
      '新能源汽车产业链是指以电动汽车为核心，涵盖动力电池、电机电控、充电设施等关键环节的完整产业体系。上游包括锂矿资源、正负极材料、电解液等原材料供应；中游涉及动力电池制造、电机电控系统研发生产；下游则包含整车制造、充电基础设施建设和运营服务。该产业链具有技术密集、资金密集、政策驱动性强等特点，是全球能源转型和产业升级的重要方向。安徽省在新能源汽车领域拥有蔚来、大众安徽、比亚迪合肥等整车企业，以及国轩高科等动力电池龙头，形成了较为完整的产业集群。',
    锂电池:
      '锂电池产业链是指从锂矿开采到电池回收的完整产业链条。上游包括锂矿资源开采、锂盐生产（碳酸锂、氢氧化锂等）；中游包括正极材料、负极材料、电解液、隔膜等四大关键材料，以及电芯制造和电池组装；下游包括新能源汽车、储能系统、消费电子等应用领域。该产业链技术含量高、投资规模大、环保要求严格，是新能源产业的核心组成部分。',
  }
  return descriptions[decodedChainName.value] || '暂无描述信息'
})

const tabs: Tab[] = [
  { key: 'overview', label: '产业概览' },
  { key: 'graph', label: '产业图谱' },
  { key: 'enterprises', label: '链上企业' },
  { key: 'keyEnts', label: '重点企业' },
]

const currentTabComponent = computed(() => {
  const components: Record<TabType, any> = {
    overview: OverviewTab,
    graph: GraphTab,
    enterprises: EnterpriseTab,
    keyEnts: KeyEnterpriseTab,
  }
  return components[activeTab.value]
})

const toggleDesc = () => {
  isDescCollapsed.value = !isDescCollapsed.value
}

const goBack = () => {
  router.push('/industry-insight')
}

watch(
  () => route.params.name,
  () => {
    activeTab.value = 'overview'
  },
)
</script>

<style scoped>
.chain-page {
  width: 100%;
}

.breadcrumb {
  font-size: 12px;
  color: #808898;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.breadcrumb a {
  color: #808898;
}

.breadcrumb a:hover {
  color: #3562e3;
}

.breadcrumb .sep {
  color: #c9cdd4;
}

.breadcrumb .current {
  color: #111827;
}

.chain-header {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.chain-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.chain-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chain-title .level-tag {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 9999px;
  background: #eef2ff;
  color: #1a46c8;
  font-weight: 500;
}

.chain-back {
  float: right;
  font-size: 13px;
  color: #3562e3;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.chain-back:hover {
  color: #0f3298;
}

.chain-path-header {
  margin-top: 12px;
}

.chain-path-list {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #606878;
}

.chain-path-item a {
  color: #606878;
  text-decoration: none;
}

.chain-path-item a:hover {
  color: #3562e3;
}

.chain-path-item .active {
  color: #111827;
  font-weight: 500;
}

.chain-path-item .sep {
  color: #c9cdd4;
  margin-left: 4px;
}

.chain-desc-wrap {
  margin-top: 10px;
  position: relative;
}

.chain-desc {
  font-size: 13px;
  color: #606878;
  line-height: 1.8;
  overflow: hidden;
  transition: max-height 300ms;
}

.chain-desc.collapsed {
  max-height: 26px;
}

.chain-desc-toggle {
  font-size: 12px;
  color: #3562e3;
  cursor: pointer;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chain-desc-toggle:hover {
  color: #0f3298;
}

.tab-nav {
  display: flex;
  gap: 0;
  background: #ffffff;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #e4e6eb;
  padding: 0 24px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.tab-item {
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #606878;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 150ms;
  white-space: nowrap;
}

.tab-item:hover {
  color: #0f3298;
}

.tab-item.active {
  color: #0f3298;
  border-bottom-color: #0f3298;
  font-weight: 600;
}

.tab-content {
  background: #ffffff;
  border-radius: 0 0 8px 8px;
  padding: 24px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
}
</style>
