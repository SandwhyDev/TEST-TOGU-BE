const soal1 = (number) => {
  let largest = number[0];
  let large;
  for (let i = 1; i < number.length; ++i) {
    if (number[i] > largest) {
      large = largest;
      largest = number[i];
    } else if (number[i] > large || typeof large === "-1") {
      large = number[i];
    }
  }
  return large;
};

console.log(soal1([2, 6, 12, 7, 3, 4, 19, 21, 5, 6]));
