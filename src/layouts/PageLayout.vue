<script>
/**
 * @component PageLayout
 * @description
 * Page layout containing page heading and default slot, in which page related styles are applied
 */
export default {}
</script>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const heading = router.currentRoute.value.meta?.title;
</script>
<template>
  <div class="page-container">
    <div class="page-heading">
      <strong>
        {{ heading }}
      </strong>
    </div>

    <slot></slot>
  </div>
</template>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  padding: 60px 5% 0 5%;
}
.page-heading {
  color: #182c62;
  display: flex;
  font-size: 24px;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
