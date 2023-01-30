# utility-text
this package helps with text functions and other things like advanced replace, snake_case, other conversions ad useful methods.
<br>This package works both in ES Modules and Common JS projects.

## Starting With the Package
first, to access all the methods, you need to install the package and then type out this code:
```js
const utils = require("utility-text");
/* --- OR --- */
import utils from 'utility-text';
```
this line of code imports <b>all</b> the functions available in this package.

## Functions
| Functions | parameters | Output | Return Type |
|---------|------------------|--------------------------------|-------------|
| `upper()` | `text` | returns the given text in uppercase. | <i>String</i> |
| `lower()` | `text` | returns the given text in lowercase. | <i>String</i> |
| `capitalize()` | `text` | converts each word's first letter to capital case. | <i>String</i> |
| `reverse()` | `text` | reverses the given text | <i>String</i> |
| `toggleCase()` | `text` | converts the first letter of each word to lower case and everything else to uppercase | <i>String</i> |
| `oppositeCase()` | `text`, `upperFirst` | converts each word to it's opposite case | <i>String</i> |
| `advanceReplace()` | `{ text, replacementText, replacement, countIndex }` | replaces an occurence in the given text the given number of times with the replacement given | <i>String</i> |
| `analyze()` | `{ text, occurence, strict }` | gives the number of occurences of a specific set of characters provided. | <i>Number</i> |
| `extractURL()` | `{text, wrap}` | wraps valid URLS around the given wraps and afterwards separates the URLS. | <i>Object</i> |
| `extractEmail()` | `{text, wrap}` | wraps valid E-mails around the given wraps and afterwards separates the mails. | <i>Object</i> |
| `slug()` | `text` | makes text URL-friendly | <i>String</i> |
| `camelCase()` | `text` | converts text to camel case | <i>String</i> |
| `snakeCase()` | `text` | converts text to snake case | <i>String</i> |
| `formatNumber()` | `text`, `locale` | formats a number by separating large numbers with commas. You can specify your locale otherwise it will choose the system locale. | <i>String &lt;LocaleString&gt;</i> |
| `isValidEmail()` | `text` | checks whether the given text is an email or not | <i>Boolean</i> |
| `isValidURL()` | `text` | checks whether the given text is a url or not | <i>Boolean</i> |
| `charCount()` | `text`, `exceptions` | returns character count with exceptions | <i>Object</i> |
| `normalize()` | `text`, `customSymbols` | removes all symbols, including the given custom ones, and returns the text with first letter capitalized. | <i>String</i> |
| `removeDuplicates()` | `text`, `strict` | removes all duplicates | <i>String</i> |
| `minMax()` | `text` | returns the shortest and longest words in the given text | <i>Object</i> |
| `wrap()` | `{text, char, wrapper}` | returns the wrapped text | <i>String</i> |
| `multipleWrap()` | `{text, charSet, wrapperSet}` | returns the wrapped text | <i>String</i> |
| `compare()` | `text1`, `text2` | returns the comparison of both texts | <i>Array</i>

## Full Docs
visit The Full Documentation <a href="https://utility-text.vercel.app">here</a>. 