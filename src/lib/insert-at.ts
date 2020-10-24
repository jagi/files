export function insertAt<T>(array: T[], index: number, ...elements: T[]): T[] {
  return array.splice(index, 0, ...elements);
}
