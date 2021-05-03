const isDuplicateData = (list, value) => {
  if (list.includes(value)) {
    return true;
  }
  return false;
};

module.exports = { isDuplicateData };
