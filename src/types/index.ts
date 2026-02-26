export interface IndustryData {
  cat: string
  chains: ChainItem[]
}

export interface ChainItem {
  name: string
  count: number
  icon: string
}

export interface RegionData {
  rank: number
  name: string
  chain: number
  key: number
  sci: number
}

export interface ScitechTag {
  name: string
  value: number
}

export interface ChainPathItem {
  chain: string
  industry: string
  subs: string[]
}

export interface CrossData {
  cols: string[]
  rows: {
    name: string
    vals: number[]
  }[]
}

export interface Enterprise {
  name: string
  alias: string
  legal: string
  city: string
  date: string
  capital: number
  industry: string
}

export interface KeyEnterprise extends Enterprise {
  tags: string[]
}

export interface FilterOption {
  label: string
  options: { label: string; value: string }[]
}

export type LevelType = '产业链' | '产业' | '细分行业'
export type TabType = 'overview' | 'graph' | 'enterprises' | 'keyEnts'
