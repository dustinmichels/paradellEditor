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
      examples: [
        "\"Beneath the Dripping Cypress Trees\"\nBy: Sally Ann Roberts\n\n'Tis the breeze beneath the cypress trees,\n'Tis the breeze beneath the cypress trees,\nWhere shady branches bend and bow,\nWhere shady branches bend and bow.\nBeneath the bend and branches breeze,\nWhere the cypress' bow 'tis shady trees.\n\nInk like stains of sap fold down,\nInk like stains of sap fold down,\nBrown and dripping tears that keep,\nBrown and dripping tears that keep.\nSap like ink and stains of brown,\nTears that fold keep dripping down.\n\nWill such variegated colors blend,\nWill such variegated colors blend,\nAway within envelope of leaves,\nAway within envelope of leaves.\nOf such colors envelope within,\nVariegated leaves away will blend.\n\nWithin the sap 'tis shady brown,\nAnd keep the breeze of that fold down,\nVariegated stains away will blend,\nWhere colors bow and branches bend.\nTears of ink envelope like leaves,\nBeneath such dripping cypress trees.",
        '"A Paradelle of Winged Flight"\nBy: Mary Ellen Clark\n\nTwilight falls, darkness cover me\nTwilight falls, darkness cover me\nas gentle slumber lures awakening dreams\nas gentle slumber lures awakening dreams\ncover me gentle twilight, darkness lures dreams,\nawakening as slumber falls.\n\nJourney on celestial wings through astral visions\nJourney on celestial wings through astral visions\nand hover above earth-bound limitations\nand hover above earth-bound limitations\non celestial wings, hover above earth bound limitations\nand journey through astral visions.\n\nExplore the expansiveness of self,\nExplore the expansiveness of self,\nlook within and discover your untapped wealth\nlook within and discover your untapped wealth\nlook within the expansiveness of self,\ndiscover and explore your untapped wealth.\n\ncover me, dreams look within darkness\njourney -- discover your gentle awakening;\nslumber lures the expansiveness of self\nthrough astral visions.  Hover above\nearthbound limitations on celestial wings,\nand as twilight falls, explore wealth -- untapped.',
        "\"Dreamt I of What Came to Me\"\nBy: Dan Tharp\n\nFalling asleep 'neath a cypress tree\nFalling asleep 'neath a cypress tree\nWhat variegated colors came calling to me\nWhat variegated colors came calling to me\n'Neath falling colors, asleep to me\nWhat came calling?... A variegated cypress tree\n\nI dreamt of ink in a well so deep\nI dreamt of ink in a well so deep\nAs an envelope as full of words to eat\nAs an envelope as full of words to eat\nIn an envelope of words, I dreamt to eat\nOf ink as full as a well so deep\n\nSo, away I went, to write of that told\nSo, away I went, to write of that told\nTears as joy, on paper to fold\nTears as joy, on paper to fold\nThat on paper to write, of joy told\nAs tears went away... so I, to fold\n\nJoy as tears, full of words went to calling\nInk as well, in an envelope a falling\nVariegated colors to eat of that told\nSo, away I write on paper to fold\nAs deep asleep, 'neath a cypress tree\nSo, dreamt I... of what came to me",
        '"A Paradelle of Love"\nBy: Linda E. Newman\n\nTattered tapestries, remnants of forgotten dreams,\nTattered tapestries, remnants of forgotten dreams\nBlackened by the unforgiving fire of love,\nBlackened by the unforgiving fire of love;\nBlackened by the fire, tattered remnants of\nForgotten tapestries, unforgiving dreams of love.\n\nI douse Love’s flames with crystal tears,\nI douse Love’s flames with crystal tears,\nPieces of my broken heart, shattered souvenirs, \nPieces of my broken heart, shattered souvenirs;\nFlames of my heart I douse with tears;\nLove’s shattered crystal pieces, broken souvenirs.\n\nAll that remain are charred moonbeams,\nAll that remain are charred moonbeams\nAnd sooty ashes of now-dead dreams,\nAnd sooty ashes of now-dead dreams;\nSooty and charred, now-dead moonbeams,\nAshes are all that remain of dreams.\n\nWith tears of love I douse the flames, \nCharred remnants of ashes all that remain, \nDreams are forgotten, fire blackened and tattered,\nPieces of my unforgiving heart, shattered \nBy broken souvenirs of crystal moonbeams,\nLove’s sooty tapestries’ now-dead dreams.',
        '"Untouched Beauty"\nBy: Marie Summers\n\nAmong the variegated skies and cypress trees,\nAmong the variegated skies and cypress trees,\nLies a poet’s inspiration hidden away untouched,\nLies a poet’s inspiration hidden away untouched.\nHidden away among a poet’s inspiration\nLies variegated skies and the untouched cypress trees.\n\nThe tears shed from the beauty of this serene sight,\nThe tears shed from the beauty of this serene sight,\nWill unleash the poet’s ink to flow endlessly,\nWill unleash the poet’s ink to flow endlessly.\nThe tears shed will flow endlessly from the poet’s ink\nTo unleash the beauty of this serene sight.\n\nJournals, they will be filled with letters to be written,\nJournals, they will be filled with letters to be written,\nEnvelopes will be stuffed with the sweet words of nature,\nEnvelopes will be stuffed with the sweet words of nature.\nJournals to be stuffed with the sweet words of nature\nEnvelopes will be filled with letters, written they will be.\n\nThe poet’s ink lies hidden among the cypress trees;\nVariegated skies to shed away untouched tears.\nJournals will be filled with the sweet words of inspiration,\nEnvelopes will be stuffed with a poet’s sight,\nFrom the letters to be written, they will flow endlessly,\nAnd unleash the serene beauty of this nature.',
      ],
    };
  },

  methods: {
    getRandomExample() {
      return this.examples[Math.floor(Math.random() * this.examples.length)];
    },

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
      const author = lines?.[1];
      this.author = author?.slice(4);
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
      this.poemInput = "";
      this.mode = "compose";
    },

    loadRandom() {
      let poemString = this.getRandomExample();
      this.load(poemString);
      this.poemInput = "";
      this.mode = "compose";
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
