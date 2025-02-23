const getGradientOffset = (temperatures: number[]) => {
  const dataMax = Math.max(...temperatures);
  const dataMin = Math.min(...temperatures);

  if (dataMax <= 0) {
    return 0;
  }

  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

export default getGradientOffset;
