type DateValue = Date | string | number;

export default function dateEqual(a: DateValue, b: DateValue): boolean {
  let dateA: Date;
  if (typeof a === 'string' || typeof a === 'number') {
    dateA = new Date(a);
  } else {
    dateA = a;
  }

  let dateB: Date;
  if (typeof b === 'string' || typeof b === 'number') {
    dateB = new Date(b);
  } else {
    dateB = b;
  }

  const equalDate = dateA.getUTCDate() === dateB.getUTCDate();
  const equalMonth = dateA.getUTCMonth() === dateB.getUTCMonth();
  const equalYear = dateA.getUTCFullYear() === dateB.getUTCFullYear();

  return equalDate && equalMonth && equalYear;
}
