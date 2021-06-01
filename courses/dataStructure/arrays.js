/**
 * lookup => O(1)
 * push =>O(1)
 * Insert => O(n)
 * delete => O(n)
 */

// let arr = ["t", "e", "r", "te"];

// arr.push("cc"); // O(1)

// arr.pop(); // O(1)

// arr.unshift("f"); // o(n)

// arr.shift(); // O(n)

// arr.splice(5, 0, "gg"); // O(n)

// reverse a string

/**
 * @param  {String} str
 * @returns {String}
 */
const reversString = (str) => {
  // reverse string as an array of chars
  let len = str.length;
  str = str.split("");
  for (let i = 0; i < Math.floor(len / 2); i++) {
    const tempChar = str[i];
    str[i] = str[len - i - 1];
    str[len - i - 1] = tempChar;
  }
  return str.join("");
};
const reversStringByJs = (str) => [...str].reverse().join("");
// console.log(reversString("islam"));

/**
 * @param  {Array} arr1
 * @param  {Array} arr2
 * @returns {Array}
 */
const mergeSortedArrays = (arr1, arr2) => {
  let arr2Index = 0;
  let arr1Index = 0;
  const result = [];
  while (arr1Index < arr1.length || arr2Index < arr2.length) {
    if (arr1Index === arr1.length || arr1[arr1Index] > arr2[arr2Index]) {
      result.push(arr2[arr2Index++]);
    } else {
      result.push(arr1[arr1Index++]);
    }
  }
  return result;
};

// console.log(mergeSortedArrays([0, 4, 6, 8], [1, 2, 3, 5, 6]));

// when to use Arrays

/**
 * fast lookups
 * fast push/pop
 * ordered
 */

/**
 * slow insertio
 * slow deletes
 * fixed size for static arrays
 */
