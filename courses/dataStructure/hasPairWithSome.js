/**
 * @param  {Array} arr
 * @param  {Number} sum
 * @returns {Array} [index1, index2]
 * O(n^2) time compixty
 * O(1) space compixty
 */
const hasPairWithSumBrutForce = (arr, sum) => {
  // 1) check all pairs of the array with each pair
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) return [i, j];
    }
  }
  return [];
};

/**
 * @param  {Array} arr
 * @param  {Number} sum
 * @returns {Array} [index1,index2]
 * O(n) time complixty
 * o(n) space complixty
 */
const hasPairWithSumObjectBased = (arr, sum) => {
  let arrObj = {};
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (arrObj[element] != undefined) return [arrObj[element], i];
    else arrObj[sum - element] = i;
  }
  return [];
};

/**
 * @param  {Array} arr
 * @param  {Number} sum
 * @returns {Boolean}
 * O(n) time complixty
 * o(n) space complixty
 */
const hasPairWithSumSetBased = (arr, sum) => {
  let arrSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (arrSet.has(element)) return true;
    else arrSet.add(sum - element);
  }
  return false;
};

// console.log(hasPairWithSumBrutForce([1, 2, 3, 4, 5], 6));
// console.log(hasPairWithSumObjectBased([1, 2, 3, 5, 5], 6));
console.log(hasPairWithSumSetBased([1, 2, 3, 5, 5], 6));
