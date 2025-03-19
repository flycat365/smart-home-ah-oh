// 随机整数生成器
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机浮点数生成器
const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
}

module.exports = {
  randomInt,
  randomFloat
};