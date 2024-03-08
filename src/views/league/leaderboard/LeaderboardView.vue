<script>
/**
 * @component LeaderboardView
 * @description This Vue component displays a leaderboard table using the ATable component.
 */
export default {};
</script>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useLeagueStore } from '@/stores/league';
import ATable from '@/components/table/ATable.vue';
import columns from './columns';
const { league } = useLeagueStore();

const loading = ref(false);
const options = reactive({
  columns,
  data: league.getLeaderboard(),
});

onBeforeMount(async () => {
  if (options.data.length) return;
  loading.value = true;
  await league.fetchData();
  const leaderboard = league.getLeaderboard();
  loading.value = false;
  Object.assign(options, { data: leaderboard });
});
</script>

<template>
  <a-table :options="options" />
</template>

<style scoped>
.table :deep(.table-header-row [data-field='goalsDifference']),
.table :deep(.table-body-row [data-field='goalsDifference']) {
  display: none;
}

@media screen and (max-width: 500px) {
  /* Hide goalsFor and goalsAgainst columns */
  .table :deep(.table-header-row [data-field='goalsFor']),
  .table :deep(.table-body-row [data-field='goalsFor']),
  .table :deep(.table-header-row [data-field='goalsAgainst']),
  .table :deep(.table-body-row [data-field='goalsAgainst']) {
    display: none;
  }
  /* Show goalsDifference column */
  .table :deep(.table-header-row [data-field='goalsDifference']),
  .table :deep(.table-body-row [data-field='goalsDifference']) {
    display: table-cell;
  }
}
</style>
