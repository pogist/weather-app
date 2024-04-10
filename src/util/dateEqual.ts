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

  const equalDate = dateA.getDate() === dateB.getDate();
  const equalMonth = dateA.getMonth() === dateB.getMonth();
  const equalYear = dateA.getFullYear() === dateB.getFullYear();
  return equalDate && equalMonth && equalYear;
}
