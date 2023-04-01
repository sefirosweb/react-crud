export const matchString = (a: string | number | null, b: string | number | null): boolean => {

  if (
    a === null ||
    b === null ||
    a === undefined ||
    b === undefined
  ) return false

  const result = a
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .match(
      b
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    );

  if (result === null) {
    return false;
  }

  return true;
};
