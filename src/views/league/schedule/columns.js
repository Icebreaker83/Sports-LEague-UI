import { t } from '@/plugins/i18n';

/**
 * @typedef {Object} TableColumn
 * @property {string} field - The field name to be used for sorting and data access.
 * @property {string} title - The title to be displayed in the column header.
 * @property {string} [formatter] - An optional formatter function name to be used for formatting the cell data.
 * @property {Object} [formatterParams] - An optional object containing additional parameters to be passed to the formatter function.
 * @property {Object} [header] - An optional object defining the header element.
 * @property {string} [header.tooltip] - An optional tooltip to be displayed when hovering over the header.
 * @property {Object} [style] - An optional object defining the inline style of the column element.
 * @property {string} [style.textAlign] - The horizontal text alignment.
 * @property {Object} [rows] - An optional object defining the style of the column's rows (data cells).
 * @property {string} [rows.fontWeight] - The font weight of the data cells.
 * @property {string} [rows.color] - The color of the data cells.
 * @property {string} [rows.fontSize] - The font size of the data cells.
 */

/**
 * An array of table column definitions for displaying match schedule data.
 *
 * Each column definition is an object with the following properties:
 *
 * - `field`: The data field name associated with the column.
 * - `title`: The column title displayed in the table header.
 * - `formatter` (optional): An optional formatter function name to apply to the cell data.
 *   - Supported formatters:
 *     - `DateTime`: Formats the cell data as a date and time.
 *     - `TeamFlag`: Displays a team flag based on the cell data.
 *     - `MatchResult`: Formats the cell data based on the match result.
 * - `style` (optional): An optional object defining inline styles for the column cells.
 * - `header` (optional): An optional object defining styles specifically for the column header.
 *
 * @typedef {TableColumn[]} ScheduleColumns
 *
 * @type {ScheduleColumns}
 */
const columns = [
  {
    field: 'matchDate',
    title: t('league.schedule.fields.matchDate'),
    formatter: 'DateTime',
    style: {
      width: '60px',
    },
  },
  {
    field: 'stadium',
    title: t('league.schedule.fields.stadium'),
  },
  {
    field: 'homeTeam',
    title: t('league.schedule.fields.homeTeam'),
    formatter: 'TeamFlag',
    header: {
      style: {
        textAlign: 'right',
      },
    },
  },
  {
    field: 'matchPlayed',
    formatter: 'MatchResult',
    style: {
      padding: '0',
    },
  },
  {
    field: 'awayTeam',
    title: t('league.schedule.fields.awayTeam'),
    formatter: 'TeamFlag',
    formatterParams: { reversed: true },
  },
];

export default columns;
