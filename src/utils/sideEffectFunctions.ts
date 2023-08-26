export function moveOneStep(index: number, to: -1 | 1, targetArray: any[]) {
  let targetIndex = index + to;
  if (targetIndex < 0) return;
  if (targetIndex >= targetArray.length) return;
  swap(index, targetIndex, targetArray);
}

export function swap(i: number, j: number, arr: any[]) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
