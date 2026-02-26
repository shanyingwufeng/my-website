import { ref, computed, onMounted } from 'vue'
import type {
  IndustryData,
  RegionData,
  ScitechTag,
  CrossData,
  Enterprise,
  KeyEnterprise,
} from '../types'
import {
  INDUSTRY_DATA,
  REGION_DATA,
  SCITECH_TAGS,
  CROSS_DATA,
  ENTERPRISES,
  KEY_ENTERPRISES,
} from '../data/industryData'
import {
  filterIndustryData,
  getChainPaths,
  searchEnterprises,
  searchKeyEnterprises,
  getRegionStats,
  getTagColor,
  getChainDescription,
  generateBreadcrumb,
  calculatePercentage,
  getRegionList,
  getCityList,
  getDistrictList,
} from '../utils/industryUtils'

// 搜索状态
const searchQuery = ref('')
const selectedRegion = ref('')
const selectedIndustry = ref('')
const selectedChain = ref('')
const levelType = ref('产业链')

// 加载状态
const isLoading = ref(false)

// 初始化数据
export function useIndustryData() {
  const loadData = async () => {
    try {
      isLoading.value = true

      // 目前使用已导入的静态数据
      // 未来可以从API加载
    } catch (error) {
      console.error('Failed to load industry data:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 产业链搜索
  const filteredIndustryData = computed(() => filterIndustryData(INDUSTRY_DATA, searchQuery.value))

  // 面包屑路径
  const breadcrumbPath = computed(() => generateBreadcrumb(selectedChain.value, levelType.value))

  // 产业链描述
  const chainDescription = computed(() => getChainDescription(selectedChain.value))

  // 地区统计数据
  const regionStats = computed(() => getRegionStats(REGION_DATA))

  // 地区列表
  const regionList = computed(() => getRegionList(REGION_DATA))

  // 城市列表
  const cityList = computed(() => getCityList(selectedRegion.value))

  // 区县列表
  const districtList = computed(() => getDistrictList(selectedRegion.value))

  // 搜索企业
  const filteredEnterprises = computed(() => searchEnterprises(ENTERPRISES, searchQuery.value))

  // 搜索重点企业
  const filteredKeyEnterprises = computed(() =>
    searchKeyEnterprises(KEY_ENTERPRISES, searchQuery.value),
  )

  // 标签颜色
  const getTagColorFunc = (tagName: string) => getTagColor(tagName)

  // 计算百分比
  const calculatePercentageFunc = (value: number, total: number) =>
    calculatePercentage(value, total)

  // 获取链路径
  const chainPaths = computed(() => getChainPaths(selectedChain.value))

  // 清空搜索
  const clearSearch = () => {
    searchQuery.value = ''
    selectedRegion.value = ''
    selectedIndustry.value = ''
    selectedChain.value = ''
  }

  // 重置筛选
  const resetFilters = () => {
    selectedRegion.value = ''
    selectedIndustry.value = ''
    searchQuery.value = ''
  }

  // 设置产业链
  const setChain = (chainName: string, level: string = '产业链') => {
    selectedChain.value = chainName
    levelType.value = level
  }

  // 设置地区
  const setRegion = (regionName: string) => {
    selectedRegion.value = regionName
  }

  // 设置产业
  const setIndustry = (industryName: string) => {
    selectedIndustry.value = industryName
  }

  // 获取选中地区的统计数据
  const getSelectedRegionStats = computed(() => {
    if (!selectedRegion.value) return null
    const region = REGION_DATA.find((r) => r.name === selectedRegion.value)
    if (!region) return null

    return {
      name: region.name,
      chain: region.chain,
      key: region.key,
      sci: region.sci,
      total: region.chain + region.key + region.sci,
      percentage: calculatePercentage(
        region.chain + region.key + region.sci,
        REGION_DATA.reduce((sum, r) => sum + r.chain + r.key + r.sci, 0),
      ),
    }
  })

  // 获取选中产业的数据
  const getSelectedIndustryData = computed(() => {
    if (!selectedIndustry.value || !selectedChain.value) return null

    const category = INDUSTRY_DATA.find((cat) =>
      cat.chains.some((chain) => chain.name === selectedChain.value),
    )

    if (!category) return null

    const chain = category.chains.find((c) => c.name === selectedChain.value)
    if (!chain) return null

    // 这里需要根据实际数据结构调整
    return {
      name: selectedIndustry.value,
      description: '暂无产业描述',
      count: 100,
      subs: [],
    }
  })

  // 获取选中细分行业的数据
  const getSelectedSubIndustryData = computed(() => {
    if (!selectedIndustry.value || !selectedChain.value || !levelType.value) return null

    if (levelType.value === '细分行业') {
      const industryData = getSelectedIndustryData.value
      if (!industryData) return null

      // 这里需要根据实际数据结构调整
      return {
        name: selectedIndustry.value,
        description: '暂无细分行业描述',
        count: 50,
      }
    }

    return null
  })

  // 组件挂载时加载数据
  onMounted(() => {
    loadData()
  })

  return {
    // 数据
    industryData: computed(() => INDUSTRY_DATA),
    regionData: computed(() => REGION_DATA),
    scitechTags: computed(() => SCITECH_TAGS),
    crossData: computed(() => CROSS_DATA),
    enterprises: computed(() => ENTERPRISES),
    keyEnterprises: computed(() => KEY_ENTERPRISES),

    // 搜索和筛选
    searchQuery,
    selectedRegion,
    selectedIndustry,
    selectedChain,
    levelType,

    // 计算属性
    filteredIndustryData,
    breadcrumbPath,
    chainDescription,
    regionStats,
    regionList,
    cityList,
    districtList,
    filteredEnterprises,
    filteredKeyEnterprises,
    chainPaths,
    getSelectedRegionStats,
    getSelectedIndustryData,
    getSelectedSubIndustryData,

    // 方法
    getTagColor: getTagColorFunc,
    calculatePercentage: calculatePercentageFunc,

    // 操作方法
    loadData,
    clearSearch,
    resetFilters,
    setChain,
    setRegion,
    setIndustry,
    isLoading,
  }
}
