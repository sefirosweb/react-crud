export const matchString = (a: string | number, b: string | number): boolean => {
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
