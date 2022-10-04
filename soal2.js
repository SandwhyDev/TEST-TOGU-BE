function permutation(arr, n) {
  // Set to check the count
  // of non-repeating elements
  let hash = new Set();

  let maxEle = 0;

  for (let i = 0; i < n; i++) {
    // Insert all elements in the set
    hash.add(arr[i]);

    // Calculating the max element
    maxEle = Math.max(maxEle, arr[i]);
  }

  if (maxEle != n) return false;

  // Check if set size is equal to n
  if (hash.length == n) return true;

  return false;
}

// Driver Code

let arr = [1, 2, 3, 6, 5, 4, 7];
// let n = arr.length;

if (permutation(arr)) console.log("Yes");
else console.log("No");
