export function splitArray<T>(inputArray: T[], numArrays: number) {
  var outputArray = [];
  var chunkSize = Math.ceil(inputArray.length / numArrays);
  for (var i = 0; i < inputArray.length; i += chunkSize) {
    outputArray.push(inputArray.slice(i, i + chunkSize));
  }
  return outputArray;
}
