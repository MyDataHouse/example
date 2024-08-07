<template>
  <Login v-model="show"></Login>
  <router-view></router-view>
</template>

<script setup lang="ts" name="root">
const show = ref(true)
</script>
<style scoped lang="scss"></style>
