var app = new Vue({
  el: "#app",
  data: {
    mode: "compose",
    modalActive: false,
    l1: "",
    l3: "",
    l5: "",
    l6: "",
    l7: "",
    l9: "",
    l11: "",
    l12: "",
    l13: "",
    l15: "",
    l17: "",
    l18: "",
    l19: "",
    l20: "",
    l21: "",
    l22: "",
    l23: "",
    l24: "",
  },
  computed: {
    wholePoem: {
      get() {
        return [
          this.l1,
          this.l1,
          this.l3,
          this.l3,
          this.l5,
          this.l6,
          "",
          this.l7,
          this.l7,
          this.l9,
          this.l9,
          this.l11,
          this.l12,
          "",
          this.l13,
          this.l13,
          this.l15,
          this.l15,
          this.l17,
          this.l18,
          "",
          this.l19,
          this.l20,
          this.l21,
          this.l22,
          this.l23,
          this.l24,
        ].join("\n");
      },
      set(poem) {},
    },
    // --- stanza 1 ---
    s1upper() {
      return tokenizeStanzas([this.l1, this.l3]);
    },
    s1lower() {
      return tokenizeStanzas([this.l5, this.l6]);
    },
    s1used() {
      return findUsed(this.s1upper, this.s1lower);
    },
    s1extra() {
      return findExtra(this.s1upper, this.s1lower);
    },
    // --- stanza 2 ---
    s2upper() {
      return tokenizeStanzas([this.l7, this.l9]);
    },
    s2lower() {
      return tokenizeStanzas([this.l11, this.l12]);
    },
    s2used() {
      return findUsed(this.s2upper, this.s2lower);
    },
    s2extra() {
      return findExtra(this.s2upper, this.s2lower);
    },
    // --- stanza 3 ---
    s3upper() {
      return tokenizeStanzas([this.l13, this.l15]);
    },
    s3lower() {
      return tokenizeStanzas([this.l17, this.l18]);
    },
    s3used() {
      return findUsed(this.s3upper, this.s3lower);
    },
    s3extra() {
      return findExtra(this.s3upper, this.s3lower);
    },
    // --- stanza 4 ---
    s4upper() {
      return tokenizeStanzas([
        this.l1,
        this.l3,
        this.l7,
        this.l9,
        this.l13,
        this.l15,
      ]);
    },
    s4lower() {
      return tokenizeStanzas([
        this.l19,
        this.l20,
        this.l21,
        this.l22,
        this.l23,
        this.l24,
      ]);
    },
    s4used() {
      return findUsed(this.s4upper, this.s4lower);
    },
    s4extra() {
      return findExtra(this.s4upper, this.s4lower);
    },
  },
});

// --- Helper functions ---

function tokenize(words) {
  words = words.replace(/[^A-Za-z0-9\s]/g, " ");
  let tokens = words.toLowerCase().split(" ");
  return tokens.filter((t) => t != "");
}

function tokenizeStanzas(stanzas) {
  let tokens = [];
  stanzas.forEach((s) => {
    tokens.push(...tokenize(s));
  });
  // tokens.sort();
  return tokens;
}

/**
 * Returns list of bool values, length of upper words
 * indicating whether that word has been used or not.
 */
function findUsed(upper, lower) {
  let lowerWords = lower.slice();
  let wordUsed = [];
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
function findExtra(upper, lower) {
  let upperWords = upper.slice();
  let extraWords = [];
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
