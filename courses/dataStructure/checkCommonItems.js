"use strict";
/**
 * @param  {Array} arr1
 * @param  {Array} arr2
 * @returns {Boolean}
 * O(a * b)
 */
const checkCommonItemsBruteForce = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) return true;
  }
  return false;
};
/**
 * @param  {Array} arr1
 * @param  {Array} arr2
 * @returns {Boolean}
 * O(a+b)
 */
const checkCommonItems = (arr1, arr2) => {
  // 1) convert first arr to object
  let arr1Obj = {};
  arr1.forEach((element) => {
    if (!arr1Obj[element]) arr1Obj[element] = true;
  });
  console.log(arr1Obj);
  // 2) loop on second array and checks obj property
  for (let i = 0; i < arr2.length; i++) {
    const item = arr2[i];
    if (arr1Obj[item]) return true;
  }
  return false;
};

console.log(checkCommonItems([1, 4, 3, 5], [1, 8]));
