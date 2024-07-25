<script setup lang="ts">
import DynComponent from "./src";

const options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    top: "5%",
    // left: "center",
    show: false,
  },
  series: [
    {
      name: "终端类型",
      type: "pie",
      radius: ["30%", "50%"],
      center: ["50%", "45%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 2,
        // borderColor: "#fff",
        // borderWidth: 1,
      },
      label: {
        show: true,
        // position: "center",
        // color: "#fff",
        formatter: "{b}({c})\n{d}%",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: "电脑" },
        { value: 735, name: "手机" },
        { value: 580, name: "平板" },
        { value: 484, name: "其他" },
      ],
    },
  ],
};
</script>

<template>
  <main class="dyn-container">
    <DynComponent class="dyn-component" :options="options" />
  </main>
  
</template>

<style lang="scss" scoped>
.dyn-container {
  width: 100%;
  height: 500px;
}
</style>
