<script>
/**
 * @component TeamFlag
 * @description A Vue component that displays a country flag and its name.
 *
 * @prop {string} value - The country code for the flag to display. Required.
 * @prop {Object} row - Row data.
 * @prop {boolean} reversed - Whether to reverse the layout of the flag and name. Defaults to false.
 */
export default {}
</script>
<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
    default: '',
  },
  row: {
    type: Object,
    default: () => ({}),
  },
  reversed: {
    type: Boolean,
  },
});

const imgSrc = `${process.env.VUE_APP_COUNTRY_FLAGS}${props.value}.png`;
</script>
<template>
  <div class="team-container" :class="{ reversed: props.reversed }">
    <strong>{{ props.value }}</strong>
    <img :src="imgSrc" :alt="`${props.value} Flag`" class="team-flag" />
  </div>
</template>
<style scoped>
.team-container {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  &.reversed {
    flex-direction: row-reverse;
    justify-content: start;
  }
}
.team-flag {
  height: 37px;
  width: 53px;
}
</style>
