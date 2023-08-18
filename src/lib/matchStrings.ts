export const matchString = (a: string | number | null, b: string | number | null): boolean => {

  if (
    a === null ||
    b === null ||
    a === undefined ||
    b === undefined
  ) return false

  const cmpA = a.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const cmpB = b.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const result = cmpA.includes(cmpB);

  return result;
};
