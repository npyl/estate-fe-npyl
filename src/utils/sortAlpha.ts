/**
 * Compares two values using locale-sensitive string comparison.
 * This function is used as a comparator for sorting operations.
 *
 * @param {string} a - The first value to compare
 * @param {string} b - The second value to compare
 * @returns {number} A negative number if a < b, positive if a > b, or 0 if equal
 */
const compare = (a: string, b: string): number => a.localeCompare(b);

/**
 * Sorts an array alphabetically using locale-sensitive comparison.
 * This function mutates the original array and returns the sorted result.
 *
 * @param {string[]} a - The array to sort alphabetically
 * @returns {string[]} The same array instance, now sorted alphabetically
 *
 */
const sortAlpha = (a: string[]): string[] => a.sort(compare);

export default sortAlpha;
