<script lang="tsx" setup>
import { ref } from "vue";
import "./styles/index.scss";
import * as Echarts from "echarts";
import "echarts-gl";

defineProps<{
  options?: Echarts.EChartsCoreOption;
}>();
const rootRef = ref<any>();

function getEchartsClass(): typeof Echarts {
  return rootRef.value?.getEchartsClass();
}
function getEchartsInstance(): Echarts.ECharts | null {
  return rootRef.value?.getEchartsInstance();
}
function getEchartsOptions(): Echarts.EChartsCoreOption {
  return rootRef.value?.getEchartsOptions();
}
function setOptions(
  options: Echarts.EChartsCoreOption,
  notMerge?: boolean,
  lazyUpdate?: boolean
) {
  rootRef.value?.setOptions(options, notMerge, lazyUpdate);
}

defineExpose({
  getEchartsClass,
  getEchartsInstance,
  getEchartsOptions,
  setOptions,
});
</script>

<template>
  <DynVueEcharts :options="options"></DynVueEcharts>
</template>

<style lang="scss" scoped></style>
