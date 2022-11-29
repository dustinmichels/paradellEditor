export function tokenize(words: string) {
  words = words.replace(/[^A-Za-z0-9\s]/g, " ");
  const tokens = words.toLowerCase().split(" ");
  return tokens.filter((t) => t != "");
}

/**
 * Tokenize each line and combine tokens into single array
 * @param {string[]} lines
 * @returns list of tokens
 */
export function tokenizeLines(lines: string[]) {
  try {
    let tokens: string[] = [];
    lines.forEach((s) => {
      tokens.push(...tokenize(s));
    });
    return tokens;
  } catch {
    return [];
  }
}

/**
 * Returns list of bool values, length of upper words
 * indicating whether that word has been used or not.
 */
export function findUsed(upper: string[], lower: string[]) {
  let lowerWords = lower.slice();
  let wordUsed: boolean[] = [];
  let res;
  upper.forEach((w) => {
    let idx = lowerWords.findIndex((el) => el === w);
    if (idx > -1) {
      res = true;
      lowerWords.splice(idx, 1);
    } else {
      res = false;
    }
    wordUsed.push(res);
  });
  return wordUsed;
}

/**
 * Returns list of lower words not in upper portion
 */
export function findExtra(upper: string[], lower: string[]) {
  let upperWords = upper.slice();
  let extraWords: string[] = [];
  lower.forEach((w) => {
    let idx = upperWords.findIndex((el) => el === w);
    if (idx > -1) {
      upperWords.splice(idx, 1);
    } else {
      extraWords.push(w);
    }
  });
  return extraWords;
}

// -------------------
// Encoding & Decoding
// Using LZString: https://pieroxy.net/blog/pages/lz-string/index.html
// -------------------

export function compressToEncodedURI(str: string) {
  // return LZString.compressToEncodedURIComponent(str);
  return "123";
}

export function decompressFromEncodedURI(encodedString: string) {
  // return LZString.decompressFromEncodedURIComponent(encodedString);
  return "abc";
}
