Vue.createApp({
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("poem")) {
      this.loadFromUrl(urlParams.get("poem"));
    }
    if (urlParams.has("mode")) {
      this.mode = urlParams.get("mode");
    }
  },

  data() {
    return {
      mode: "compose",
      timeout: null,
      notification: "",
      shareUrl: "",
      poemInput: "",
      title: "",
      author: "",
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
      examples: {
        cypress: {
          title: "",
          author: "",
          text: "'Tis the breeze beneath the cypress trees,\n'Tis the breeze beneath the cypress trees,\nWhere shady branches bend and bow,\nWhere shady branches bend and bow.\nBeneath the bend and branches breeze,\nWhere the cypress' bow 'tis shady trees.\n\nInk like stains of sap fold down,\nInk like stains of sap fold down,\nBrown and dripping tears that keep,\nBrown and dripping tears that keep.\nSap like ink and stains of brown,\nTears that fold keep dripping down.\n\nWill such variegated colors blend,\nWill such variegated colors blend,\nAway within envelope of leaves,\nAway within envelope of leaves.\nOf such colors envelope within,\nVariegated leaves away will blend.\n\nWithin the sap 'tis shady brown,\nAnd keep the breeze of that fold down,\nVariegated stains away will blend,\nWhere colors bow and branches bend.\nTears of ink envelope like leaves,\nBeneath such dripping cypress trees.\n\nCopyright © 2003 Sally Ann Roberts",
        },
      },
    };
  },

  methods: {
    clear() {
      this.title = "";
      this.author = "";
      this.l1 = "";
      this.l3 = "";
      this.l5 = "";
      this.l6 = "";
      this.l7 = "";
      this.l9 = "";
      this.l11 = "";
      this.l12 = "";
      this.l13 = "";
      this.l15 = "";
      this.l17 = "";
      this.l18 = "";
      this.l19 = "";
      this.l20 = "";
      this.l21 = "";
      this.l22 = "";
      this.l23 = "";
      this.l24 = "";
    },

    poemDataToString() {
      title = "";
      if (this.title) {
        title = `"${this.title}"`;
      }

      author = "";
      if (this.author) {
        author = `By: ${this.author}`;
      }

      // meta = "";
      // if (title || author) {
      //   meta = [title, author].join("\n");
      //   meta = meta + "\n";
      // }

      let poem = [
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
      return [title, author, "", poem].join("\n");
    },

    parsePoemFromString(str) {
      let lines = str.split("\n");
      // meta
      const title = lines?.[0];
      this.title = title.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
      this.author = lines?.[1].slice(4);
      // stanza 1
      this.l1 = lines?.[0 + 3];
      this.l3 = lines?.[2 + 3];
      this.l5 = lines?.[4 + 3];
      this.l6 = lines?.[5 + 3];
      // stanza 2
      this.l7 = lines?.[7 + 3];
      this.l9 = lines?.[9 + 3];
      this.l11 = lines?.[11 + 3];
      this.l12 = lines?.[12 + 3];
      // stanza 3
      this.l13 = lines?.[14 + 3];
      this.l15 = lines?.[16 + 3];
      this.l17 = lines?.[18 + 3];
      this.l18 = lines?.[19 + 3];
      // stanza 4
      this.l19 = lines?.[21 + 3];
      this.l20 = lines?.[22 + 3];
      this.l21 = lines?.[23 + 3];
      this.l22 = lines?.[24 + 3];
      this.l23 = lines?.[25 + 3];
      this.l24 = lines?.[26 + 3];
    },

    share() {
      // formulate url
      let baseUrl = window.location.href.split("?")[0];
      let base64Poem = encodeBase64(this.poemDataToString());
      let url = `${baseUrl}?mode=view&poem=${base64Poem}`;
      console.log(url);
      navigator.clipboard.writeText(url);
      // change current URL
      window.history.pushState({}, document.title, url);
      // launch notification
      this.notification = "Shareable URL copied to clipboard!";
      this.shareUrl = url;
    },

    loadFromUrl(encodedPoem) {
      let decodedPoem = decodeBase64(encodedPoem);
      this.load(decodedPoem);
    },

    loadFromInput(poemString) {
      this.load(poemString);
      // this.notification = "Loaded poem from input.";
      this.poemInput = "";
      this.mode = "view";
    },

    load(poemString) {
      this.clear();
      this.parsePoemFromString(poemString);
    },
  },

  watch: {
    notification: function () {
      window.clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.notification = false), 5000);
    },
  },

  computed: {
    wholePoem() {
      return this.poemDataToString();
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
}).mount("#app");

// --- Helper functions ---

function tokenize(words) {
  words = words.replace(/[^A-Za-z0-9\s]/g, " ");
  let tokens = words.toLowerCase().split(" ");
  return tokens.filter((t) => t != "");
}

function tokenizeStanzas(stanzas) {
  try {
    let tokens = [];
    stanzas.forEach((s) => {
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

// -------------------
// Encoding & Decoding
//   Based on: From: https://developer.mozilla.org/en-US/docs/Web/API/btoa
// -------------------

function encodeBase64(str) {
  return btoa(toBinary(str));
}

function decodeBase64(encodedString) {
  return fromBinary(atob(encodedString));
}

function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const charCodes = new Uint16Array(bytes.buffer);
  let result = "";
  for (let i = 0; i < charCodes.length; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}
