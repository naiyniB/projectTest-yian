// src/index.js
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b;
}

/**
 * 判断一个数是否为偶数
 * @param {number} num - 要检查的数
 * @returns {boolean} 如果是偶数返回 true
 */
function isEven(num) {
  return num % 2 === 0;
}

// 导出你的函数，让别人能用
module.exports = {
  add,
  isEven
};