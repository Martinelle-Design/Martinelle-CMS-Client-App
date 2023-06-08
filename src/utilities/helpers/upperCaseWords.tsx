const upperCaseWords = (mySentence: string) =>
  mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
export default upperCaseWords;
