<script>
/**
 * @component PrivateLayout
 * @description
 * Private layout that serves as a wrapper/guard in which access_token logic is invoked
 */
export default {}
</script>
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthorization } from '@/composables/authorization';

const isAuthorized = ref(false);
const { fetchAccessToken, getAccessToken } = useAuthorization();

onMounted(async () => {
  await fetchAccessToken();
  const accessToken = getAccessToken();
  isAuthorized.value = !!accessToken;
});
</script>

<template>
  <router-view v-if="isAuthorized" />
</template>
