const funArray = ["#DBBABA", "#98EECC", "#FF90BB", "#A1C2F1"];

export const RandomFunColorIndex = (ind: number) => {
  return funArray[ind % funArray.length];
};

export const RandomFunColor = () => {
  return funArray[Math.floor(Math.random() * funArray.length)];
};
