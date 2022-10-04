const soal1 = (arr) => {
  let largest = arr[0];
  let large;
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] > largest) {
      large = largest;
      largest = arr[i];
    } else if (arr[i] > large || typeof large === "-1") {
      large = arr[i];
    }
  }
  return large;
};

console.log(soal1([2, 6, 12, 7, 3, 4, 19, 21, 5, 6]));
