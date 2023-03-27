<template>
  <div class="about">
    <h2>About Page</h2>
    <img src="~@/assets/img/bg3.webp" alt="">
    <div class="font">
      <i class="iconfont icon-jisutuikuan"></i>
    </div>
  </div>
</template>

<script setup>
import { sum, mul } from '@/utils/math'

console.log(sum(20, 30))
</script>

<style lang="less" scoped>
.about {
  color: blue;

  .font {
    color: cornflowerblue;
    i {
      font-size: 36px;
    }
  }
}
</style>