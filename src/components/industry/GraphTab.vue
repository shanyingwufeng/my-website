<template>
  <div class="tab-body">
    <div class="module-section">
      <div class="module-title">产业图谱</div>
      <div class="graph-container">
        <div class="graph-placeholder">
          <div class="graph-icon">📊</div>
          <h3>产业图谱</h3>
          <p>此处将展示新能源汽车产业链图谱</p>
          <p class="hint">💡 实际开发中可接入D3.js、ECharts或其他图表库实现交互式图谱</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 图谱组件，可以接入D3.js、ECharts等图表库
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

.graph-container {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graph-placeholder {
  text-align: center;
  color: #808898;
}

.graph-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.graph-placeholder h3 {
  font-size: 18px;
  font-weight: 600;
  color: #242B3A;
  margin-bottom: 8px;
}

.graph-placeholder p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 4px;
}

.hint {
  font-style: italic;
  color: #606878;
}
</style>