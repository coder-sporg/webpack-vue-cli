<template>
  <div class="app">
    <router-link to="/home">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view/>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
