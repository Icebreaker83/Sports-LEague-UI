<script>
/**
 * @component ATable
 * @description
 * A table component that renders data based on provided options.
 * It supports custom formatting through formatters and highlights even rows with an optional `colorEven` prop.
 *
 * @props {Object} options - Configuration object for the table.
 * @prop {Object[]} options.columns - Array of column definitions.
 * @prop {string[]} options.columns[].field - Data field name for the column.
 * @prop {string} options.columns[].title - Column title displayed in the header.
 * @prop {Object} options.columns[].style - Custom CSS styles for the column.
 * @prop {Object} options.columns[].header - Optional header configuration.
 * @prop {string} options.columns[].header.tooltip - Text displayed on hover over the header.
 * @prop {Object} options.columns[].header.style - Custom CSS styles for the header.
 * @prop {Object[]} options.data - Array of data objects to be displayed in the table.
 * @prop {string} colorEven - (Optional) Background color for even rows.
 * @prop {boolean} loading - (Optional) Flag indicating if the table is loading data.
 */
export default {};
</script>
<script setup>
import formatters from './formatters';
import ASpinner from '@/components/ASpinner.vue';

const props = defineProps({
  options: {
    type: Object,
    required: true,
    default: () => ({
      columns: [],
      data: [],
    }),
  },
  colorEven: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
  },
});

const hasFormatter = (column) => {
  return column.formatter && formatters[column.formatter];
};
const getColumnHeaderStyle = (column) => {
  return { ...(column.style || {}), ...(column.header?.style || {}) };
};
const getRowsStyle = (column, rowIndex) => {
  return {
    ...(props.colorEven && (rowIndex + 1) % 2 === 0
      ? { backgroundColor: props.colorEven }
      : {}),
    ...(column.style || {}),
    ...(column.rows?.style || {}),
  };
};
</script>
<template>
  <table aria-label="Table" class="table">
    <thead class="table-header">
      <tr class="table-header-row">
        <th
          v-for="(column, index) in props.options.columns"
          :key="index"
          :title="column.header?.tooltip"
          :data-field="column.field"
          :style="getColumnHeaderStyle(column)"
          class="table-header-col"
        >
          {{ column.title || '' }}
        </th>
      </tr>
    </thead>

    <tbody class="table-body">
      <tr v-if="props.loading">
        <td :colspan="props.options.columns.length">
          <a-spinner />
        </td>
      </tr>
      <template v-else>
        <tr
          v-for="(row, rowIndex) in props.options.data"
          :key="rowIndex"
          class="table-body-row"
        >
          <td
            v-for="(column, columnIndex) in props.options.columns"
            :key="columnIndex"
            :data-field="column.field"
            :style="getRowsStyle(column, rowIndex)"
            class="table-body-cell"
          >
            <component
              v-if="hasFormatter(column)"
              :is="formatters[column.formatter]"
              :value="row[column.field]"
              :row="row"
              v-bind="column.formatterParams || {}"
            />
            <span v-else>{{ row[column.field] }}</span>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<style scoped>
.table {
  border-collapse: collapse;
  color: #4b5c68;
  font-size: 14px;
  .table-header {
    background-color: #e4edf2;
    font-size: 12px;
    height: 40px;
    .table-header-col {
      padding: 0 0.5em;
      text-align: start;
    }
  }

  .table-body {
    .table-body-row {
      height: 70px;
      border-bottom: 1px solid #e4edf2;
      &:last-child {
        border-bottom: none;
      }
      .table-body-cell {
        padding: 0 0.5em;
      }
    }
  }
  :deep(strong) {
    font-size: 16px;
  }
}
</style>
