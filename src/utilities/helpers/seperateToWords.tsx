import { camelCase, kebabCase, startCase, words, toLower } from "lodash";

function isKebabCase(str: string) {
  return kebabCase(str) === str.toLowerCase();
}
function isCamelCase(str: string) {
  return camelCase(str) === str;
}
function isStartCase(str: string) {
  return startCase(str) === str;
}
function isPascalCase(str: string) {
  return startCase(toLower(str));
}
const seperateToWords = (str: string) => {
  if (isKebabCase(str))
    return startCase(words(str, /[^-]+/g).reduce((a, b) => a + " " + b));
  if (isCamelCase(str) || isStartCase(str) || isPascalCase(str))
    return startCase(words(startCase(str)).reduce((a, b) => a + " " + b));
  return str;
};
export default seperateToWords;
