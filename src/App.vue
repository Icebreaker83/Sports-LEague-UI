<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { useAppStore } from '@/stores/app';

const { fetchAppVersion } = useAppStore();
fetchAppVersion();
</script>
<template>
  <div class="app-container">
    <TheHeader />
    <main class="router-container">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<style>
@import './index.css';
</style>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.router-container {
  flex-grow: 1;
}
</style>
