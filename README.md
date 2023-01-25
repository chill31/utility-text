# utility-text
this package helps with text functions and other things like advanced replace, snake_case, other conversions ad useful methods.
<br>This package works both in ES Modules and Common JS projects.

## Starting With the Package
first, to access all the methods, you need to install the package and then type out this code:
```js
const utils = require("utility-text");
```
this line of code imports <b>all</b> the functions available in this package.

## Functions
| Functions | parameters | Output |
|---------|--------------------------------------|------|
| `upper()` | `text` | returns the given text in uppercase. |
| `lower()` | `text` | returns the given text in lowercase. |
| `capitalize()` | `text` | converts each word's first letter to capital case. |
| `reverse()` | `text` | reverses the given text |
| `toggleCase()` | `text` | converts the first letter of each word to lower case and everything else to uppercase |
| `oppositeCase()` | `text`, `upperFirst` | converts each word to it's opposite case |
| `advanceReplace()` | `{ text, replacementText, replacement, countIndex }` | replaces an occurence in the given text the given number of times with the replacement given |
| `analyze()` | `{ text, occurence, strict }` | gives the number of occurences of a specific set of characters provided. |
| `extractURL()` | `{text, wrap}` | wraps valid URLS around the given wraps and afterwards separates the URLS. |
| `extractEmail()` | `{text, wrap}` | wraps valid E-mails around the given wraps and afterwards separates the mails. |
| `slug()` | `text` | makes text URL-friendly |
| `camelCase()` | `text` | converts text to camel case |
| `snakeCase()` | `text` | converts text to snake case |
| `formatNumber()` | `text`, `locale` | formats a number by separating large numbers with commas. You can specify your locale otherwise it will choose the system locale. |