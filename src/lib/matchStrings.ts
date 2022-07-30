export const matchString = (a: string, b: string): boolean => {
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
