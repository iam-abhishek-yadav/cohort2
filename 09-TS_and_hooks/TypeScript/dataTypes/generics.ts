function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const el = getFirstElement<string>(["abhishek", "vikas"]);
console.log(el.toLowerCase()); // No type error
