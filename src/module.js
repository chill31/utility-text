import crypto from 'crypto'

function isValidURL(url) {
  try {
    return Boolean(new URL(url));
  } catch (err) {
    return false;
  }
}

function isValidEmail(mail) {
  const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/gi;
  if (emailCheck.test(mail) === true) {
    return true;
  } else {
    return false;
  }
}

function upper(text) {
  return text.toUpperCase();
}

function lower(text) {
  return text.toLowerCase();
}

function capitalize(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function reverse(text) {
  const newString = text.split("");
  newString.reverse();
  return newString.join("");
}

function toggleCase(text) {
  return text
    .toUpperCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toLowerCase() + word.slice(1);
    })
    .join(" ");
}

function oppositeCase(text, upperFirst = true) {
  let updatedText = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (i % 2 === 0) {
      if (upperFirst) {
        updatedText += char.toUpperCase();
      } else {
        updatedText += char.toLowerCase();
      }
    } else {
      if (upperFirst) {
        updatedText += char.toLowerCase();
      } else {
        updatedText += char.toUpperCase();
      }
    }
  }
  return updatedText;
}

function advanceReplace({ text, replacementText, replacement, countIndex, skip = 0 }) {
  let str = text;
  let word = replacementText;
  let count = 0;
  let maxCount = countIndex;
  let skipCount = 0;

  str = str.replace(new RegExp(word, "g"), function (match) {
    if (skipCount < skip) {
      skipCount++;
      return match;
    }
    if (count >= maxCount) {
      return match;
    }
    count++;
    return replacement;
  });

  return str;
}

function analyze({ text, charSet, strict = true }) {
  if (strict === true) {
    let str = text;
    let word = charSet;
    let count = 0;

    str = str.replace(new RegExp(word, "g"), function () {
      count++;
    });

    return count;
  } else {
    let str = text.toLowerCase();
    let word = charSet.toLowerCase();
    let count = 0;

    str = str.replace(new RegExp(word, "g"), function () {
      count++;
    });

    return count;
  }
}

function extractURL({ text, wrap = ["<", ">"] }) {
  let words = text.split(" ");
  let extractedURLs = [];
  for (let i = 0; i < words.length; i++) {
    if (
      isValidURL(words[i]) &&
      (words[i].startsWith("https://") || words[i].startsWith("http://"))
    ) {
      extractedURLs.push(words[i]);
      words[i] = `${wrap[0] ?? ""}${words[i]}${wrap[1] ?? ""}`;
    } else {
      continue;
    }
  }

  return {
    text: words.join(" "),
    urls: extractedURLs,
  };
}

function extractEmail({ text, wrap = ["<", ">"] }) {
  let words = text.split(" ");
  let extractedMails = [];

  const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/gi;

  for (let i = 0; i < words.length; i++) {
    if (emailCheck.test(words[i]) === true) {
      extractedMails.push(words[i]);
      words[i] = `${wrap[0] ?? ""}${words[i]}${wrap[1] ?? ""}`;
    } else {
      continue;
    }
  }

  return {
    text: words.join(" "),
    mails: extractedMails,
  };
}

function slug(text) {
  return encodeURI(text);
}

function camelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

function snakeCase(text) {
  return (
    text &&
    text
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s) => s.toLowerCase())
      .join("_")
  );
}

function formatNumber(num, locale) {
  try {
    return num.toLocaleString(locale);
  } catch (err) {
    return num.toLocaleString();
  }
}

function charCount(text, exceptions = []) {
  let newText = text;
  exceptions.forEach((exception) => {
    newText = text.replaceAll(exception, "");
  });

  return {
    charCount: newText.length,
    wordCount: newText.split(" ").length,
    noSpacesCount: newText.replaceAll(/ /g, "").length
  }
}

function normalize(text, customSymbols = []) {
  const symbols = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '"', ':', '?', '>', '<', ';', '.', ',', '-']
  customSymbols.forEach((symb) => {
    symbols.push(symb);
  });

  let newText = lower(text);
  let arr = newText.split(" ");
  arr[0] = capitalize(arr[0]);
  newText = arr.join(" ");
  symbols.forEach((s) => {
    newText = newText.replaceAll(s, "");
  });
  return newText;
}

function removeDuplicates(text, strict = true) {
  if (strict === true) {
    return Array.from(new Set(text.split(' '))).join(" ")
  } else {
    return Array.from(new Set(text.toLowerCase().split(' '))).join(" ")
  }
}

function minMax(text) {

  const arr = text.split(" ");
  const lengths = [];

  arr.forEach((item) => {
    lengths.push(item.length);
  });

  return {
    longest: arr[lengths.indexOf(Math.max(...lengths))],
    shortest: arr[lengths.indexOf(Math.min(...lengths))]
  }
}

function wrap({ text, char, wrapper }) {

  return text.replaceAll(char, `${wrapper[0]}${char}${wrapper[1]}`);

}

function multipleWrap({ text, charSet, wrapperSet }) {
  let newText = text;

  if (charSet.length !== wrapperSet.length) {
    throw new Error("The length of both charSet and wrapperSet should be the same.");
  }

  const len = charSet.length;

  for (let i = 0; i < len; i++) {
    const regex = new RegExp(charSet[i], "g");
    newText = newText.replace(regex, `${wrapperSet[i][0]}${charSet[i]}${wrapperSet[i][1]}`);
  }

  return newText;
}

function compare(text1, text2) {
  let differences = [];
  let firstText = text1.toString();
  let secondText = text2.toString();

  let maxLen = Math.max(firstText.length, secondText.length);

  const diffTypes = [
    { message: "first text's index is non-existent while the second text's index exists.", code: 0 },
    { message: "second text's index is non-existent while the first text's index exists.", code: 1 },
    { message: "both indexes exist but are not equal", code: 2 }
  ]

  for (let i = 0; i < maxLen; i++) {

    if (!firstText[i] && !!secondText[i]) {
      differences.push({
        firstText: null,
        secondText: secondText[i],
        difference: secondText[i],
        atIndex: i,
        type: diffTypes[0]

      });
    } else if (!secondText[i] && !!firstText[i]) {
      differences.push({
        firstText: firstText[i],
        secondText: null,
        difference: firstText[i],
        atIndex: i,
        type: diffTypes[1]
      });
    } else if (firstText[i] !== secondText[i]) {
      differences.push({
        firstText: firstText[i],
        secondText: secondText[i],
        difference: secondText[i],
        atIndex: i,
        type: diffTypes[2]
      })
    }

  }

  return differences;
}

function insertAt({ text, index, insertionText, before = false }) {
  let newText = text;

  if (text[index] === null || text[index] === undefined) throw new Error("the index must be existent in the provided text.");

  if (before === true) {
    newText = text.slice(0, index) + insertionText + text.slice(index);
  } else {
    newText = text.slice(0, index + 1) + insertionText + text.slice(index + 1);
  }

  return newText;
}

function moveText({ text, moveText, moveIndex }) {
  const start = text.indexOf(moveText);
  if (start === -1) {
    return text;
  }
  const stop = start + moveText.length - 1;
  const movingText = text.slice(start, stop + 1);
  const firstPart = text.slice(0, start);
  const secondPart = text.slice(stop + 1);
  if (moveIndex === 0) {
    return movingText + firstPart + secondPart;
  }
  return firstPart + secondPart.slice(0, moveIndex - start) + movingText + secondPart.slice(moveIndex - start);
}

function moveTextByPos({ text, coords, moveIndex }) {

  const [start, stop] = coords;
  if (start > stop) throw new Error("'coords' error: Starting Coordinate (index 0) must be smaller than the stop coordinate");

  const movingText = text.slice(start, stop + 1);
  const firstPart = text.slice(0, start);
  const secondPart = text.slice(stop + 1);
  return (start === 0 ? "" : firstPart) + secondPart.slice(0, moveIndex - start) + movingText + secondPart.slice(moveIndex - start);

}

function listSearch({ searchList, searchText, returnAll = false }) {
  const matches = [];
  const searchTextLC = normalize(searchText).toLowerCase();

  for (let i = 0; i < searchList.length; i++) {
    const string = normalize(searchList[i]).toLowerCase();

    if (string.includes(searchTextLC)) {
      const match = {
        found: true,
        search: searchText,
        match: searchList[i],
        index: i
      };

      if (!returnAll) {
        return [match];
      }

      matches.push(match);
    }
  }

  if (matches.length === 0) {
    return [{
      found: false,
      search: searchText,
      match: -1,
      index: -1
    }];
  }

  return matches;
}

function objectSearch({ searchList, searchText, searchKeys, returnAll = false }) {
  const matches = new Set();
  const searchTextLC = normalize(searchText).toLowerCase();
  const numKeys = searchKeys.length;

  for (const item of searchList) {
    for (let j = 0; j < numKeys; j++) {
      const key = searchKeys[j];
      const string = normalize(item[key]).toLowerCase();

      if (string.includes(searchTextLC)) {
        const match = {
          found: true,
          search: searchText,
          match: item[key],
          object: item,
          key: key,
          index: searchList.indexOf(item)
        };
        matches.add(JSON.stringify(match));
        if (!returnAll) {
          return Array.from(matches).map(match => JSON.parse(match));
        }
      }
    }
  }

  if (!matches.size) {
    const noMatch = {
      found: false,
      search: searchText,
      match: -1,
      object: -1,
      key: -1,
      index: -1
    };
    return [noMatch];
  }

  return Array.from(matches).map(match => JSON.parse(match));
}

function encode(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

function decode(encodedStr) {
  let result = "";
  for (let i = 0; i < encodedStr.length; i += 2) {
    result += String.fromCharCode(parseInt(encodedStr.substr(i, 2), 16));
  }
  return result;
}

function unslug(text) {
  return decodeURI(text);
}

function pushByFilter(array, filter, ...items) {
  let newArr = array;
  for (let item of items) {
    if (filter(item)) {
      newArr.push(item);
    }
  }

  return newArr;
}

function flatten(arr) {
  return arr.reduce((flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next), []);
}

function kebabCase(str) {
  return str
    .split(/[\s_]+/)
    .join("-")
    .toLowerCase();
}

function pullByValue(array, ...values) {
  for (const value of values) {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  return array;
}

function pullByIndex(array, ...indexes) {
  for (let i = indexes.length - 1; i >= 0; i--) {
    const index = indexes[i];
    if (index >= 0 && index < array.length) {
      array.splice(index, 1);
    }
  }

  return array;
}

function toAcronym(text) {
  let acr = "";
  for (let i = 0; i < text.split(" ").length; i++) {
    acr += text.split(" ")[i][0].toUpperCase();
  }

  return acr;
}

function insertToArray({ array, value, index, before = false }) {
  let newArr = array;

  if (before === false) {
    newArr.splice(index + 1, 0, value);
  } else {
    newArr.splice(index, 0, value);
  }

  return newArr;
}

function shrink(array, tillIndex) {
  let arr = [];
  for (let i = 0; i < tillIndex; i++) {
    arr.push(array[i]);
  }

  return arr;
}

function rangeShrink(array, range) {
  let arr = [];
  for (let i = range[0]; i <= range[1]; i++) {
    arr.push(array[i]);
  }

  return arr;
}

function escape(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };

  const reg = /[&<>"'/]/ig;

  return text.replace(reg, (match) => map[match]);
}

function unescape(text) {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x2F;': '/',
  };

  const reg = /&(amp|lt|gt|quot|#039|#x2F);/ig;

  return text.replace(reg, (match) => map[match]);
}

function stripHTML(text) {
  return text.replace(/<[^>]*>/g, '');
}

function truncate({ text, maxLength, ellipsis = { show: true, content: "..." } }) {

  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  if (ellipsis.show === true) {
    return truncated + ellipsis.content
  }

  return truncated

}

class PasswordUtil {

  constructor() {
    this.algorithm = 'sha512';
  }

  generatePassword({ length, includeSymbols = true, includeNumbers = true, includeUpper = true, includeLower = true }) {

    if (!includeSymbols && !includeNumbers && !includeUpper && !includeLower) {
      throw new Error('At least one of includeSymbols, includeNumbers, includeUpper, or includeLower must be true');
    }

    if (length <= 0) {
      throw new Error('password length must be larger than 0');
    }

    const getRandomChar = {
      lower: getRandomLower,
      upper: getRandomUpper,
      number: getRandomNumber,
      symbol: getRandomSymbol,
    };

    function getSecureValue() {
      const randomBytes = crypto.randomBytes(4);
      const randomNumber = randomBytes.readUInt32BE(0) / (Math.pow(2, 32) - 1);

      return randomNumber;
    }

    function getRandomLower() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    function getRandomUpper() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    function getRandomNumber() {
      return String.fromCharCode(Math.floor(getSecureValue() * 10) + 48)
    }

    function getRandomSymbol() {
      const symbols = '~!@#$%^&*()_+{}":?><;.,';
      return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function internalGenerate(length, lower, upper, number, symbol) {
      let generatedPassword = "";
      const typesCount = lower + upper + number + symbol;
      const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

      if (typesCount === 0) {
        return "";
      }

      for (let i = 0; i < length; i++) {

        typesArr.forEach((type) => {
          const name = Object.keys(type)[0]
          generatedPassword += getRandomChar[name]();
        })

      };

      return generatedPassword.slice(0, length).split("").sort(() => Math.random() - 0.5).join("");
    }

    return internalGenerate(length, includeLower, includeUpper, includeNumbers, includeSymbols);

  }

  checkPassword(password) {

    function calculatePasswordStrength(password) {
      const weaknesses = [];
      weaknesses.push(lengthWeakness(password));
      weaknesses.push(lowercaseWeakness(password));
      weaknesses.push(uppercaseWeakness(password));
      weaknesses.push(numberWeakness(password));
      weaknesses.push(specialCharactersWeakness(password));
      weaknesses.push(repeatCharactersWeakness(password));
      return weaknesses;
    }

    function lengthWeakness(password) {
      const length = password.length;

      if (length <= 5) {
        return {
          message: "Your password is too short",
        };
      }

      if (length <= 10) {
        return {
          message: "Your password could be longer",
        };
      }
    }

    function uppercaseWeakness(password) {
      return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
    }

    function lowercaseWeakness(password) {
      return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
    }

    function numberWeakness(password) {
      return characterTypeWeakness(password, /[0-9]/g, "numbers");
    }

    function specialCharactersWeakness(password) {
      return characterTypeWeakness(
        password,
        /[^0-9a-zA-Z\s]/g,
        "special characters"
      );
    }

    function characterTypeWeakness(password, regex, type) {
      const matches = password.match(regex) || [];

      if (matches.length === 0) {
        return {
          message: `Your password has no ${type}`,
        };
      }

      if (matches.length <= 2) {
        return {
          message: `Your password could use more ${type}`,
        };
      }
    }

    function repeatCharactersWeakness(password) {
      const matches = password.match(/(.)\1/g) || [];
      if (matches.length > 0) {
        return {
          message: "Your password has repeat characters",
        };
      }
    }

    const weaknesses = calculatePasswordStrength(password)
    const newWeaknesses = []
    const final = pushByFilter(newWeaknesses, (v => v !== undefined), ...weaknesses);

    if (final.length === 0) {
      return 'No Weaknesses';
    }

    return final

  }

  hashPassword(password, salt = 'salt') {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, this.algorithm).toString('hex');
  }

  generateSalt(length) {
    return crypto.randomBytes(length).toString('hex');
  }

}

// levenshtein distance calculator
function minDistance(text, comparison) {
  const m = text.length;
  const n = comparison.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        dp[i][j] = 0;
      }
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

export default {
  upper,
  lower,
  capitalize,
  reverse,
  toggleCase,
  oppositeCase,
  advanceReplace,
  analyze,
  extractURL,
  extractEmail,
  slug,
  camelCase,
  snakeCase,
  formatNumber,
  isValidEmail,
  isValidURL,
  charCount,
  normalize,
  removeDuplicates,
  minMax,
  wrap,
  multipleWrap,
  compare,
  insertAt,
  moveText,
  moveTextByPos,
  listSearch,
  objectSearch,
  encode,
  decode,
  unslug,
  pushByFilter,
  flatten,
  kebabCase,
  pullByValue,
  pullByIndex,
  toAcronym,
  insertToArray,
  shrink,
  rangeShrink,
  escape,
  unescape,
  stripHTML,
  truncate,
  PasswordUtil,
  minDistance
};