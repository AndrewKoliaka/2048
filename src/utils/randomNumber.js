/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export default function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}