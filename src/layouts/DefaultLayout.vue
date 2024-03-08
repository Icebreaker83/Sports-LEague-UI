<script>
/**
 * @component DefaultLayout
 * @description
 * Default layout for routes
 */
export default {}
</script>
<script setup>
import PageLayout from './PageLayout.vue';
</script>
<template>
  <page-layout>
    <router-view />
  </page-layout>
</template>
