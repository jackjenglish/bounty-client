const getObjectIndexByValue = (list, field, value) => {
  for (let i = 0; i <= list.length; i += 1) {
    if (list[i][field] === value) return i;
  }
  return -1;
};

export default getObjectIndexByValue;
