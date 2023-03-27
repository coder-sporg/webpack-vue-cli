<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    default: '你好 世界！'
  }
})
</script>

<style scoped>
.hello {
  color: darkturquoise;
  font-size: 16px;
}
</style>
