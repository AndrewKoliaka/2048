/**
 * Compare two objects by their properties
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Boolean}
 */
export default function (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}