<template>
  <div class="home">
    <h2>Home Page</h2>
    <hello-world />
  </div>
</template>

<script setup>
import helloWorld from '@/components/hello-world.vue';
console.log('home page hhh')
</script>

<style lang="less" scoped>
.home {
  color: red;
  height: 500px;
  background-image: url('../assets/img/bg1.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>