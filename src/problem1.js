const START_PAGE_NUMBER = 1;
const END_PAGE_NUMBER = 400;

function isInvalidPageNumbers(pageNumbers) {
  if (isOutOfBound(pageNumbers)) {
    return true;
  }

  if (hasBoundaryPageNumber(pageNumbers)) {
    return true;
  }

  return false;
}

function hasBoundaryPageNumber(pageNumbers) {
  return (
    pageNumbers.includes(START_PAGE_NUMBER) ||
    pageNumbers.includes(END_PAGE_NUMBER)
  );
}

function isOutOfBound(pageNumbers) {
  return pageNumbers.some(
    (pn) => pn < START_PAGE_NUMBER || pn > END_PAGE_NUMBER,
  );
}

function getMaxScore(pageNumbers) {
  return Math.max(getMaxSum(pageNumbers), getMaxMultiplication(pageNumbers));
}

function getMaxSum(pageNumbers) {
  const sums = pageNumbers.map((pn) => getSum(pn));

  return Math.max(...sums);
}

function getSum(pageNumber) {
  const numbers = `${pageNumber}`.split('').map((pn) => parseInt(pn, 10));

  return numbers.reduce((prevSum, number) => prevSum + number, 0);
}

function getMaxMultiplication(pageNumbers) {
  const multiplications = pageNumbers.map((pn) => getMultiplication(pn));

  return Math.max(...multiplications);
}

function getMultiplication(pageNumber) {
  const numbers = `${pageNumber}`.split('').map((pn) => parseInt(pn, 10));

  return numbers.reduce(
    (prevMultiplication, number) => prevMultiplication * number,
    1,
  );
}

function problem1(pobi, crong) {
  if (isInvalidPageNumbers(pobi) || isInvalidPageNumbers(crong)) {
    return -1;
  }

  const pobiScore = getMaxScore(pobi);
  const crongScore = getMaxScore(crong);

  if (pobiScore > crongScore) {
    return 1;
  }

  if (pobiScore < crongScore) {
    return 2;
  }

  return 0;
}

module.exports = problem1;
