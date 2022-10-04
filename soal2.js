const soal2 = (arr, n) => {
  let i;

  for (i = 0; i < n; i++) {
    let abs_value = Math.abs(arr[i]);
    if (arr[abs_value - 1] > 0) arr[abs_value - 1] = -arr[abs_value - 1];
    else console.log(`repeat ${abs_value}`);
  }

  for (i = 0; i < n; i++) {
    if (arr[i] > 0) console.log(`missing number ${i + 1}`);
  }
};

arr = [1, 3, 4, 2, 5, 6, 3];
n = arr.length;
soal2(arr, n);
