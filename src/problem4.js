const ALPHABET_REGEX = /[a-zA-Z]/;
const [CHARCODE_A, CHARCODE_Z] = 'AZ'.split('').map(c => c.charCodeAt(0));

function getFrogTranslatedWord(word) {
  return word.split('').reduce((prevResult, c) => {
    if (isAlphabet(c)) {
      return prevResult + frogTranslate(c);
    }

    return prevResult + c;
  }, '');
}

function isAlphabet(c) {
  return ALPHABET_REGEX.test(c);
}

function frogTranslate(c) {
  const charCode = c.toUpperCase().charCodeAt(0);
  const charCodeDiff = CHARCODE_A + CHARCODE_Z - charCode;
  const result = String.fromCharCode(charCodeDiff);

  return isLowerCase(c) ? result.toLowerCase() : result;
}

function isLowerCase(alphabet) {
  return alphabet >= 'a';
}

function problem4(word) {
  const answer = getFrogTranslatedWord(word);

  return answer;
}

module.exports = problem4;
