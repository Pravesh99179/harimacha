/** ₹ with Indian digit grouping, e.g. ₹1,299. */
export function rupee(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
