function isValidURL(url) {
  try {
    return Boolean(new URL(url));
  } catch (err) {
    return false;
  }
}

function isValidEmail(mail) {
  const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  if(emailCheck.test(mail) === true) {
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
  let updatedText;

  if (upperFirst === true) {
    for (let i = 0; i < text.length; i++) {
      if (i % 2 == 0) {
        updatedText += text[i].toUpperCase();
      } else if (i % 2 != 0) {
        updatedText += text[i].toLowerCase();
      }
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      if (i % 2 == 0) {
        updatedText += text[i].toLowerCase();
      } else if (i % 2 != 0) {
        updatedText += text[i].toUpperCase();
      }
    }
  }

  return updatedText.split("undefined")[1];
}

function advanceReplace({ text, replacementText, replacement, countIndex }) {
  let str = text;
  let word = replacementText;
  let count = 0;
  let maxCount = countIndex;

  str = str.replace(new RegExp(word, "g"), function (match) {
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

  const emailCheck =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

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
  } catch(err) {
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
  const symbols = [ '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '"', ':', '?', '>', '<', ';', '.', ',']
  customSymbols.forEach((symb) => {
    symbols.push(symb);
  });

  let newText = text;

  symbols.forEach((sym) => {
    newText = text.replaceAll(sym, "");
  });

  let final = newText.toLowerCase().split(" ");
  let firstWord = capitalize(final[0]);
  
  final.shift();
  return firstWord + " " + final.join(" ");
}

function removeDuplicates(text, strict = true) {
  if(strict === true) {
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

function wrap({text, char, wrapper}) {

  return text.replaceAll(char, `${wrapper[0]}${char}${wrapper[1]}`);

}

function multipleWrap({text, charSet, wrapperSet}) {
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
    {message: "first text's index is non-existent while the second text's index exists.", code: 0},
    {message: "second text's index is non-existent while the first text's index exists.", code: 1},
    {message: "both indexes exist but are not equal", code: 2}
  ]

  // text1 is undefined and text2 is existent
  // text2 is undefined and text1 is existent
  // text1 != text2

  for(let i = 0; i < maxLen; i++) {
    
    if(!firstText[i] && !!secondText[i]) {
      differences.push({
        firstText: null,
        secondText: secondText[i],
        difference: secondText[i],
        type: diffTypes[0]
        
      });
    } else if(!secondText[i] && !!firstText[i]) {
      differences.push({
        firstText: firstText[i],
        secondText: null,
        difference: firstText[i],
        type: diffTypes[1]
      });
    } else if(firstText[i] !== secondText[i]) {
      differences.push({
        firstText: firstText[i],
        secondText: secondText[i],
        difference: secondText[i],
        type: diffTypes[2]
      })
    }

  }

  return differences;
}

module.exports = {
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
  compare
};
