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
 * An array of column definitions used for building a leaderboard table.
 *
 * The columns represent various data points about teams in a league, such as
 * team name, matches played, goals for, etc. Each column object specifies
 * the field name, header title, optional formatting details, and potentially
 * styles for the header and data cells.
 *
 * @type {TableColumn[]}
 */
const columns = [
  {
    field: 'teamName',
    title: t('league.leaderboard.fields.teamName'),
    formatter: 'TeamFlag',
    formatterParams: { reversed: true },
  },
  {
    field: 'matchesPlayed',
    title: t('league.leaderboard.fields.matchesPlayed.self'),
    header: {
      tooltip: t('league.leaderboard.fields.matchesPlayed.title'),
    },
  },
  {
    field: 'goalsFor',
    title: t('league.leaderboard.fields.goalsFor.self'),
    header: {
      tooltip: t('league.leaderboard.fields.goalsFor.title'),
    },
  },
  {
    field: 'goalsAgainst',
    title: t('league.leaderboard.fields.goalsAgainst.self'),
    header: {
      tooltip: t('league.leaderboard.fields.goalsAgainst.title'),
    },
  },
  {
    field: 'goalsDifference',
    title: t('league.leaderboard.fields.goalsDifference.self'),
    header: {
      tooltip: t('league.leaderboard.fields.goalsDifference.title'),
    },
  },
  {
    field: 'points',
    title: t('league.leaderboard.fields.points'),
    header: {
      style: {
        textAlign: 'center',
      },
    },
    style: {
      textAlign: 'center',
    },
    rows: {
      style: {
        fontWeight: 700,
        color: '#025FEB',
        fontSize: '16px',
      },
    },
  },
];

export default columns;
