<script>
/**
 * @typedef {Object} MatchData
 * @prop {string} homeTeamScore - The score of the home team.
 * @prop {string} awayTeamScore - The score of the away team.
 */

/**
 * @component MatchResult
 * @description Renders the score of a match.
 *
 * @prop {boolean} value - Whether the match has been played.
 * @prop {MatchData} row - Data about the match.
 */
export default {};
</script>

<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    required: true,
    default: false,
  },
  row: {
    type: Object,
    required: true,
    default: () => ({
      homeTeamScore: '-',
      awayTeamScore: '-',
    }),
  },
});

const result = props.value
  ? `${props.row.homeTeamScore} : ${props.row.awayTeamScore}`
  : '- : -';
</script>
<template>
  <div class="match-result-container">
    <strong>{{ result }}</strong>
  </div>
</template>
<style scoped>
.match-result-container {
  display: flex;
  justify-content: center;
  min-width: 40px;
}
</style>
