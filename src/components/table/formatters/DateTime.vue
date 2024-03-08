<script>
/**
 * @component DateTime
 * @description This Vue component displays a formatted date and time based on a provided timestamp.
 * 
 * @prop {number} value - Required. The timestamp in milliseconds.
 * @prop {object} row - Optional. Row data
 */
export default {};
</script>

<script setup>
import { milisToDateTime } from '@/utils/helpers';
const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  row: {
    type: Object,
    default: () => ({}),
  },
});

const date = props.value ? milisToDateTime(props.value) : 'N/A';
</script>
<template>
  <span class="date-time">{{ date }}</span>
</template>
<style scoped>
.date-time {
  text-align: right;
  float: right;
}
</style>
