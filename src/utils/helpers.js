import { DateTime } from 'luxon';

/**
 * Converts a millisecond timestamp to a formatted date and time string.
 *
 * This function takes a millisecond timestamp as input and returns a formatted
 * date and time string based on the `VUE_APP_DATETIME_FORMAT` environment variable
 * or a default fallback format if the environment variable is not set.
 *
 * @param {number} milisDate - The millisecond timestamp to convert.
 * @returns {string} The formatted date and time string.
 *
 * @example
 * ```javascript
 * import { milisToDateTime } from './your-module-path';
 *
 * const nowInMilliseconds = Date.now();
 * const formattedDateTime = milisToDateTime(nowInMilliseconds);
 * console.log(formattedDateTime); // Output: e.g., 28.02.2024 17:54 (depending on environment or default format)
 * ```
 */
export const milisToDateTime = (milisDate) => {
  const dateTimeFormat =
    process.env.VUE_APP_DATETIME_FORMAT || 'd.M.yyyy hh:mm';
  return DateTime.fromMillis(milisDate).toFormat(dateTimeFormat);
};
