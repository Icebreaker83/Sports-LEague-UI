<script>
/**
 * @component ScheduleView
 * @description Displays a table of matches. Utilizes ATable component and fetches data from the league service.
 */
export default {}
</script>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useLeagueStore } from '@/stores/league';
import ATable from '@/components/table/ATable.vue';
import columns from './columns';

const loading = ref(false);
const options = reactive({
  columns,
  data: [],
});
const { league } = useLeagueStore();

onBeforeMount(async () => {
  loading.value = true;
  await league.fetchData();
  loading.value = false;
  Object.assign(options, { data: league.getMatches() });
});
</script>

<template>
  <a-table :options="options" color-even="#f6f7f7" :loading="loading" />
</template>
<style scoped>
@media screen and (max-width: 750px) {
  /* Hide Stadium column */
  .table :deep(.table-header-row [data-field='stadium']),
  .table :deep(.table-body-row [data-field='stadium']) {
    display: none;
  }
}

@media screen and (max-width: 500px) {
  .table :deep(.table-header-row [data-field='matchDate']),
  .table :deep(.table-body-row [data-field='matchDate']) {
    display: none;
  }
}
</style>
