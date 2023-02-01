const CURRENCY_UNITS = [50000, 10000, 5000, 1000, 500, 100, 50, 10, 1];

function getCurrencyReturn(money) {
  return CURRENCY_UNITS.reduce((prevResult, currencyUnit) => {
    if (money >= currencyUnit) {
      const unitCount = Math.floor(money / currencyUnit);
      prevResult.push(unitCount);
      money %= currencyUnit;

      return prevResult;
    }

    prevResult.push(0);
    return prevResult;
  }, []);
}

function problem5(money) {
  const answer = getCurrencyReturn(money);

  return answer;
}

module.exports = problem5;
