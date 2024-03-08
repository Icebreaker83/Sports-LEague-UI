<script>
/**
 * @component TheFooter
 * @description
 * This component renders a footer element displaying the application version.
 */
export default {}
</script>
<script setup>
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';

const { version } = storeToRefs(useAppStore());
</script>
<template>
  <footer class="footer">
    <strong class="footer-app-version">
      {{ $t('footer.version') }}: {{ version }}
    </strong>
  </footer>
</template>
<style scoped>
.footer {
  align-items: center;
  background-color: #f6f7f7;
  color: #4b5c68;
  display: flex;
  font-size: 12px;
  height: 40px;
  margin-top: auto;
  padding: 0 40px 0 40px;

  .footer-app-version {
    margin-left: auto;
  }
}
</style>
