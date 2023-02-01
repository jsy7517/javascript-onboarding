const CLAP_NUMBER_REGEX = /[369]/g;

function getClapCount(number) {
  return (`${number}`.match(CLAP_NUMBER_REGEX) ?? []).length;
}

function problem3(number) {
  let answer = 0;

  for (let i = 1; i <= number; i++) {
    answer += getClapCount(i);
  }

  return answer;
}

module.exports = problem3;
