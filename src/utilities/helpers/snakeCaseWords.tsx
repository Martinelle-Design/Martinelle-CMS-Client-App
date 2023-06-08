import upperCaseWords from "./upperCaseWords";

export const snakeCaseWords = (e: string) => {
  const newStr = e
    .split(/[ ]+/)
    .reduce((a, b) => a.toLowerCase() + "_" + b.toLowerCase());
  return newStr;
};
export const replaceSnakeCaseWithSpaces = (e: string) => {
  const newStr = e.split(/[_]+/).reduce((a, b) => a + " " + b);
  return upperCaseWords(newStr);
};
