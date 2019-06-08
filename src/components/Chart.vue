<template>
  <div
    ref="chartDom"
    style="height: 200px;"
  />
</template>

<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    option (val) {
      this.myChart.setOption(val)
    }
  },
  created () {
    // debounce用于防抖
    this.resize = debounce(this.resize, 300)
  },
  mounted () {
    this.renderChart()
    // 监听窗口大小变化
    addListener(this.$refs.chartDom, this.resize)
  },
  methods: {
    resize () {
      this.myChart.resize()
    },
    renderChart() {
      this.myChart = echarts.init(this.$refs.chartDom)
      this.myChart.setOption(this.option)
    }
  },
  beforeDestroy () {
    // 页面结束时要销毁监听和chart的内存，以免内存泄漏
    removeListener(this.$refs.chartDom, this.resize)
    this.myChart.dispose()
    this.myChart = null
  }
}
</script>

<style>

</style>
