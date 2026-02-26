import type { 
  IndustryData, 
  RegionData, 
  ScitechTag, 
  ChainPathItem, 
  CrossData,
  Enterprise,
  KeyEnterprise 
} from '../types'

/**
 * 格式化数字为千分位分隔符
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('zh-CN')
}

/**
 * 过滤产业链数据
 */
export const filterIndustryData = (
  data: IndustryData[], 
  searchQuery: string
): IndustryData[] => {
  if (!searchQuery.trim()) return data
  
  const query = searchQuery.toLowerCase().trim()
  return data.map(category => ({
    ...category,
    chains: category.chains.filter(chain =>
      chain.name.toLowerCase().includes(query) ||
      category.cat.toLowerCase().includes(query)
    )
  })).filter(category => category.chains.length > 0)
}

/**
 * 获取指定产业链的相关路径信息
 */
export const getChainPaths = (chainName: string): ChainPathItem[] => {
  // 这里可以根据具体的产业链名称返回对应的路径信息
  const pathMap: Record<string, ChainPathItem[]> = {
    '新能源汽车': [
      { chain: '新能源汽车', industry: '储能材料', subs: ['正极材料', '负极材料', '电解液', '隔膜'] },
      { chain: '新能源汽车', industry: '核心零部件', subs: ['电池配件产品', '电机电控', '电子元器件'] },
      { chain: '新能源汽车', industry: '整车制造', subs: ['纯电动汽车', '混动汽车', '氢燃料汽车'] },
      { chain: '新能源汽车', industry: '服务及应用', subs: ['充换电服务', '汽车后市场', '出行服务'] },
    ],
    '锂电池': [
      { chain: '锂电池', industry: '正极材料', subs: ['磷酸铁锂', '三元材料', '钴酸锂'] },
      { chain: '锂电池', industry: '负极材料', subs: ['石墨负极', '硅碳负极', '钛酸锂'] },
      { chain: '锂电池', industry: '电解液', subs: ['六氟磷酸锂', '新型电解液'] },
      { chain: '锂电池', industry: '隔膜', subs: ['隔膜材料', '涂覆隔膜'] },
    ]
  }
  
  return pathMap[chainName] || []
}

/**
 * 搜索企业
 */
export const searchEnterprises = (
  enterprises: Enterprise[], 
  query: string
): Enterprise[] => {
  if (!query.trim()) return enterprises
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.trim())
  
  return enterprises.filter(enterprise => {
    const searchableText = [
      enterprise.name,
      enterprise.alias,
      enterprise.legal,
      enterprise.city,
      enterprise.industry
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  })
}

/**
 * 搜索重点企业
 */
export const searchKeyEnterprises = (
  enterprises: KeyEnterprise[], 
  query: string
): KeyEnterprise[] => {
  if (!query.trim()) return enterprises
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.trim())
  
  return enterprises.filter(enterprise => {
    const searchableText = [
      enterprise.name,
      enterprise.alias,
      enterprise.legal,
      enterprise.city,
      enterprise.industry,
      ...enterprise.tags
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  })
}

/**
 * 获取地区统计数据
 */
export const getRegionStats = (data: RegionData[]) => {
  const totalChains = data.reduce((sum, region) => sum + region.chain, 0)
  const totalKeys = data.reduce((sum, region) => sum + region.key, 0)
  const totalSci = data.reduce((sum, region) => sum + region.sci, 0)
  
  return {
    totalChains,
    totalKeys,
    totalSci,
    averageChain: Math.round(totalChains / data.length),
    averageKey: Math.round(totalKeys / data.length),
    averageSci: Math.round(totalSci / data.length)
  }
}

/**
 * 获取标签颜色
 */
export const getTagColor = (tagName: string): string => {
  const colorMap: Record<string, string> = {
    '上交所主板': '#3B82F6',
    '创业板': '#10B981',
    '港交所': '#F59E0B',
    '高新技术': '#8B5CF6',
    '专精特新': '#EF4444',
    '外资企业': '#6B7280'
  }
  
  return colorMap[tagName] || '#808898'
}

/**
 * 获取产业链描述
 */
export const getChainDescription = (chainName: string): string => {
  const descriptions: Record<string, string> = {
    '新能源汽车':
      '新能源汽车产业链是指以电动汽车为核心，涵盖动力电池、电机电控、充电设施等关键环节的完整产业体系。上游包括锂矿资源、正负极材料、电解液等原材料供应；中游涉及动力电池制造、电机电控系统研发生产；下游则包含整车制造、充电基础设施建设和运营服务。该产业链具有技术密集、资金密集、政策驱动性强等特点，是全球能源转型和产业升级的重要方向。安徽省在新能源汽车领域拥有蔚来、大众安徽、比亚迪合肥等整车企业，以及国轩高科等动力电池龙头，形成了较为完整的产业集群。',
    '锂电池':
      '锂电池产业链涵盖上游原材料、中游电芯制造和下游应用三个主要环节。上游包括锂矿开采、正负极材料、电解液、隔膜等关键材料生产；中游涉及电芯制造、电池包组装等核心制造环节；下游广泛应用于新能源汽车、储能系统、消费电子等领域。随着新能源产业的快速发展，锂电池产业已成为全球新能源转型的核心支撑，中国在全球锂电池产业链中占据重要地位。',
    '新型显示':
      '新型显示产业链包括上游材料供应、中游面板制造和下游应用三个环节。上游包括玻璃基板、液晶材料、OLED材料、驱动IC等；中游涉及面板制造、模组组装等核心制造环节；下游广泛应用于智能手机、电视、显示器、穿戴设备、车载显示等领域。新型显示技术正朝着柔性化、高清化、低功耗方向发展，是信息技术产业的重要组成部分。',
    '集成电路':
      '集成电路产业链涵盖上游设计、中游制造和下游封装测试三个主要环节。上游包括EDA工具、IP核、芯片设计等；中游涉及晶圆制造、光刻、刻蚀等核心制造工艺；下游包括封装测试、应用等环节。集成电路是信息产业的核心和基础，广泛应用于通信、计算机、消费电子、汽车电子等领域，是国家战略性新兴产业的重要组成部分。'
  }
  
  return descriptions[chainName] || '暂无产业链描述信息'
}

/**
 * 生成面包屑路径
 */
export const generateBreadcrumb = (
  chainName: string, 
  levelType: string = '产业链'
): Array<{ name: string; level: string }> => {
  const breadcrumb = [{ name: chainName, level: '产业链' }]
  
  if (levelType === '产业') {
    breadcrumb.unshift({ name: '产业分类', level: '产业' })
  } else if (levelType === '细分行业') {
    breadcrumb.unshift({ name: '细分领域', level: '细分行业' })
    breadcrumb.unshift({ name: '产业分类', level: '产业' })
  }
  
  return breadcrumb
}

/**
 * 计算百分比
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

/**
 * 获取地区列表
 */
export const getRegionList = (data: RegionData[]): string[] => {
  return data.map(region => region.name)
}

/**
 * 获取城市列表
 */
export const getCityList = (province: string): string[] => {
  const cityMap: Record<string, string[]> = {
    '广东省': ['深圳市', '广州市', '东莞市', '佛山市', '惠州市', '珠海市'],
    '江苏省': ['南京市', '苏州市', '无锡市', '常州市', '徐州市', '南通市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '绍兴市', '金华市'],
    '安徽省': ['合肥市', '芜湖市', '蚌埠市', '阜阳市', '滁州市', '六安市'],
    '山东省': ['济南市', '青岛市', '烟台市', '潍坊市', '淄博市', '临沂市'],
    '上海市': ['上海市'],
    '湖北省': ['武汉市', '宜昌市', '襄阳市', '黄石市', '荆州市', '孝感市'],
    '四川省': ['成都市', '绵阳市', '德阳市', '南充市', '宜宾市', '乐山市'],
    '北京市': ['北京市'],
    '福建省': ['福州市', '厦门市', '泉州市', '漳州市', '龙岩市', '宁德市']
  }
  
  return cityMap[province] || []
}

/**
 * 获取区县列表
 */
export const getDistrictList = (city: string): string[] => {
  const districtMap: Record<string, string[]> = {
    '合肥市': ['蜀山区', '包河区', '瑶海区', '庐阳区', '经开区', '高新区'],
    '深圳市': ['南山区', '福田区', '罗湖区', '宝安区', '龙岗区', '龙华区', '光明区', '坪山区'],
    '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '浦口区', '栖霞区', '雨花台区', '江宁区']
  }
  
  return districtMap[city] || []
}