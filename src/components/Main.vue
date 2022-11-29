<script lang="ts">
import { defineComponent } from "vue";
import { compressToEncodedURI, decompressFromEncodedURI } from "../util/helper";
import StanzaTags from "./StanzaTags.vue";
import Modal from "./Modal.vue";

export default defineComponent({
  components: { StanzaTags, Modal },

  data() {
    return {
      showModal: false, // controls visibility of "about" modal
      mode: "compose", // controls which tab is active
      notification: "", // when present, displays notification (raw HTML)
      timeout: -1, // makes notifications disappear
      poemInput: "", // linked to "paste" tab
      // Poem data
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
      // Examples paradelles
      examples: [
        "\"Beneath the Dripping Cypress Trees\"\nBy: Sally Ann Roberts\n\n'Tis the breeze beneath the cypress trees,\n'Tis the breeze beneath the cypress trees,\nWhere shady branches bend and bow,\nWhere shady branches bend and bow.\nBeneath the bend and branches breeze,\nWhere the cypress' bow 'tis shady trees.\n\nInk like stains of sap fold down,\nInk like stains of sap fold down,\nBrown and dripping tears that keep,\nBrown and dripping tears that keep.\nSap like ink and stains of brown,\nTears that fold keep dripping down.\n\nWill such variegated colors blend,\nWill such variegated colors blend,\nAway within envelope of leaves,\nAway within envelope of leaves.\nOf such colors envelope within,\nVariegated leaves away will blend.\n\nWithin the sap 'tis shady brown,\nAnd keep the breeze of that fold down,\nVariegated stains away will blend,\nWhere colors bow and branches bend.\nTears of ink envelope like leaves,\nBeneath such dripping cypress trees.",
        '"A Paradelle of Winged Flight"\nBy: Mary Ellen Clark\n\nTwilight falls, darkness cover me\nTwilight falls, darkness cover me\nas gentle slumber lures awakening dreams\nas gentle slumber lures awakening dreams\ncover me gentle twilight, darkness lures dreams,\nawakening as slumber falls.\n\nJourney on celestial wings through astral visions\nJourney on celestial wings through astral visions\nand hover above earth-bound limitations\nand hover above earth-bound limitations\non celestial wings, hover above earth bound limitations\nand journey through astral visions.\n\nExplore the expansiveness of self,\nExplore the expansiveness of self,\nlook within and discover your untapped wealth\nlook within and discover your untapped wealth\nlook within the expansiveness of self,\ndiscover and explore your untapped wealth.\n\ncover me, dreams look within darkness\njourney -- discover your gentle awakening;\nslumber lures the expansiveness of self\nthrough astral visions.  Hover above\nearthbound limitations on celestial wings,\nand as twilight falls, explore wealth -- untapped.',
        "\"Dreamt I of What Came to Me\"\nBy: Dan Tharp\n\nFalling asleep 'neath a cypress tree\nFalling asleep 'neath a cypress tree\nWhat variegated colors came calling to me\nWhat variegated colors came calling to me\n'Neath falling colors, asleep to me\nWhat came calling?... A variegated cypress tree\n\nI dreamt of ink in a well so deep\nI dreamt of ink in a well so deep\nAs an envelope as full of words to eat\nAs an envelope as full of words to eat\nIn an envelope of words, I dreamt to eat\nOf ink as full as a well so deep\n\nSo, away I went, to write of that told\nSo, away I went, to write of that told\nTears as joy, on paper to fold\nTears as joy, on paper to fold\nThat on paper to write, of joy told\nAs tears went away... so I, to fold\n\nJoy as tears, full of words went to calling\nInk as well, in an envelope a falling\nVariegated colors to eat of that told\nSo, away I write on paper to fold\nAs deep asleep, 'neath a cypress tree\nSo, dreamt I... of what came to me",
        '"A Paradelle of Love"\nBy: Linda E. Newman\n\nTattered tapestries, remnants of forgotten dreams,\nTattered tapestries, remnants of forgotten dreams\nBlackened by the unforgiving fire of love,\nBlackened by the unforgiving fire of love;\nBlackened by the fire, tattered remnants of\nForgotten tapestries, unforgiving dreams of love.\n\nI douse Love’s flames with crystal tears,\nI douse Love’s flames with crystal tears,\nPieces of my broken heart, shattered souvenirs, \nPieces of my broken heart, shattered souvenirs;\nFlames of my heart I douse with tears;\nLove’s shattered crystal pieces, broken souvenirs.\n\nAll that remain are charred moonbeams,\nAll that remain are charred moonbeams\nAnd sooty ashes of now-dead dreams,\nAnd sooty ashes of now-dead dreams;\nSooty and charred, now-dead moonbeams,\nAshes are all that remain of dreams.\n\nWith tears of love I douse the flames, \nCharred remnants of ashes all that remain, \nDreams are forgotten, fire blackened and tattered,\nPieces of my unforgiving heart, shattered \nBy broken souvenirs of crystal moonbeams,\nLove’s sooty tapestries’ now-dead dreams.',
        '"Untouched Beauty"\nBy: Marie Summers\n\nAmong the variegated skies and cypress trees,\nAmong the variegated skies and cypress trees,\nLies a poet’s inspiration hidden away untouched,\nLies a poet’s inspiration hidden away untouched.\nHidden away among a poet’s inspiration\nLies variegated skies and the untouched cypress trees.\n\nThe tears shed from the beauty of this serene sight,\nThe tears shed from the beauty of this serene sight,\nWill unleash the poet’s ink to flow endlessly,\nWill unleash the poet’s ink to flow endlessly.\nThe tears shed will flow endlessly from the poet’s ink\nTo unleash the beauty of this serene sight.\n\nJournals, they will be filled with letters to be written,\nJournals, they will be filled with letters to be written,\nEnvelopes will be stuffed with the sweet words of nature,\nEnvelopes will be stuffed with the sweet words of nature.\nJournals to be stuffed with the sweet words of nature\nEnvelopes will be filled with letters, written they will be.\n\nThe poet’s ink lies hidden among the cypress trees;\nVariegated skies to shed away untouched tears.\nJournals will be filled with the sweet words of inspiration,\nEnvelopes will be stuffed with a poet’s sight,\nFrom the letters to be written, they will flow endlessly,\nAnd unleash the serene beauty of this nature.',
      ],
    };
  },

  created() {
    // parse URL params (view mode and poem text)
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("mode")) {
      this.mode = urlParams.get("mode") || "";
    }
    if (urlParams.has("poem")) {
      this.loadFromUrl(urlParams.get("poem"));
    }
    // register hotkey to close modal
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.showModal = false;
      }
    });
  },

  methods: {
    clearPoemData() {
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

    /** Create string from poem data */
    fmtPoemToString() {
      const title = this.title ? `"${this.title}"` : "";
      const author = this.author ? `By: ${this.author}` : "";
      let lines = [
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
      return [title, author, "", lines].join("\n");
    },

    /** Parse poem string into data */
    parsePoemFromString(str: string) {
      let lines = str.split("\n");
      // meta
      this.title = lines?.[0].match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
      this.author = lines?.[1]?.slice(4);
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

    tryToParsePoemFromString(str: string) {
      try {
        this.parsePoemFromString(str);
      } catch {
        this.notification = "Could not parse poem from URL.";
      }
    },

    /**
     * Create shareable link & copy to clipboard.
     * Also set to url & create notification.
     */
    share() {
      let baseUrl = window.location.href.split("?")[0];
      let URIencodedPoem = compressToEncodedURI(this.fmtPoemToString());
      let url = `${baseUrl}?mode=view&poem=${URIencodedPoem}`;
      navigator.clipboard.writeText(url); // copy to clipboard
      window.history.pushState({}, document.title, url); // change current URL
      this.notification = `Shareable URL copied to clipboard! <a target="_blank" href="${url}">Link</a>`;
    },

    /** Load poem from URL param */
    loadFromUrl(encodedPoem: string | null) {
      if (!encodedPoem) {
        return;
      }
      let decodedPoem = decompressFromEncodedURI(encodedPoem);
      if (decodedPoem) {
        this.load(decodedPoem);
      }
    },

    /** Load poem from paste menu */
    loadFromInput(poemString: string) {
      this.load(poemString);
      this.poemInput = "";
      this.mode = "compose";
    },

    /** Load random poem from example list */
    loadRandom() {
      let poemString = this.getRandomExample();
      this.load(poemString);
      this.mode = "compose";
    },

    load(poemString: string) {
      this.clearPoemData();
      this.tryToParsePoemFromString(poemString);
    },

    /**
     * Load random poem from examples
     * @returns string
     */
    getRandomExample() {
      return this.examples[Math.floor(Math.random() * this.examples.length)];
    },
  },

  watch: {
    /** Whenever notification is set, clear after a delay */
    notification: function () {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => (this.notification = ""), 5000);
    },
  },

  computed: {
    /** Displayed on the "read" tab */
    wholePoem() {
      return this.fmtPoemToString();
    },
  },
});
</script>

<template>
  <!-- "About" pop-up modal -->
  <modal :show="showModal" @close="showModal = false"></modal>

  <section class="section">
    <div class="container">
      <!-- Control Buttons -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <a class="title" href=".">
              Paradell<span style="color: #6a5acd">Editor</span>
            </a>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <a class="button is-danger is-outlined" @click="clearPoemData">
              <span>Clear</span>
              <span class="icon is-small">
                <i class="fas fa-eraser"></i>
              </span>
            </a>
          </p>
          <div class="level-item">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button
                  class="button is-info is-outlined"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu4"
                >
                  <span>Load Example</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="loadRandom()">
                    Load random
                  </a>
                  <hr class="dropdown-divider" />
                  <a
                    v-for="(example, index) in examples"
                    class="dropdown-item"
                    @click="load(example)"
                  >
                    {{ example.split("\n")[0].slice(1, -1) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p class="level-item">
            <a class="button is-info is-outlined" @click="showModal = true">
              <span>About</span>
              <span class="icon is-small">
                <i class="fas fa-question"></i>
              </span>
            </a>
          </p>
          <p class="level-item">
            <a class="button is-info is-outlined" @click="share">
              <span>Share Poem</span>
              <span class="icon is-small">
                <i class="fas fa-share"></i>
              </span>
            </a>
          </p>
        </div>
      </nav>

      <!-- Notifications -->
      <div class="block" v-if="notification">
        <div class="notification is-warning is-light">
          <button class="delete" @click="notification = ''"></button>
          <span v-html="notification"></span>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="tabs is-boxed">
        <ul>
          <li
            :class="[mode === 'compose' ? 'is-active' : '']"
            @click="mode = 'compose'"
          >
            <a>
              <span class="icon is-small"
                ><i class="fas fa-feather" aria-hidden="true"></i
              ></span>
              <span>Compose</span>
            </a>
          </li>
          <li
            :class="[mode === 'view' ? 'is-active' : '']"
            @click="mode = 'view'"
          >
            <a>
              <span class="icon is-small"
                ><i class="fas fa-book-open" aria-hidden="true"></i
              ></span>
              <span>Read</span>
            </a>
          </li>
          <li
            :class="[mode === 'load' ? 'is-active' : '']"
            @click="mode = 'load'"
          >
            <a>
              <span class="icon is-small"
                ><i class="fas fa-paste" aria-hidden="true"></i
              ></span>
              <span>Paste</span>
            </a>
          </li>
        </ul>
      </div>

      <!--  Compose  -->
      <div v-show="mode === 'compose'">
        <!--  Title & Author -->
        <div class="columns">
          <div class="column is-half">
            <div class="box has-background-white-ter">
              <input
                class="input is-static title-input"
                type="text"
                v-model="title"
                placeholder="Title"
              />
              <input
                class="input is-static author-input"
                type="text"
                v-model="author"
                placeholder="Author"
              />
            </div>
          </div>
        </div>

        <!--  First Stanza  -->
        <div class="columns">
          <div class="column">
            <div class="box">
              <input
                class="input is-static"
                type="text"
                v-model="l1"
                placeholder="Click here to begin writing the first stanza..."
              />
              <input
                class="input is-static"
                type="text"
                v-model="l1"
                disabled
              />
              <input class="input is-static" type="text" v-model="l3" />
              <input
                class="input is-static"
                type="text"
                v-model="l3"
                disabled
              />
              <input class="input is-static" type="text" v-model="l5" />
              <input class="input is-static" type="text" v-model="l6" />
            </div>
          </div>
          <div class="column">
            <stanza-tags :upper-lines="[l1, l3]" :lower-lines="[l5, l6]">
            </stanza-tags>
          </div>
        </div>
        <!-- Second Stanza -->
        <div class="columns">
          <div class="column">
            <div class="box">
              <input
                class="input is-static"
                type="text"
                v-model="l7"
                placeholder="Second stanza..."
              />
              <input
                class="input is-static"
                type="text"
                v-model="l7"
                disabled
              />
              <input class="input is-static" type="text" v-model="l9" />
              <input
                class="input is-static"
                type="text"
                v-model="l9"
                disabled
              />
              <input class="input is-static" type="text" v-model="l11" />
              <input class="input is-static" type="text" v-model="l12" />
            </div>
          </div>
          <div class="column">
            <stanza-tags :upper-lines="[l7, l9]" :lower-lines="[l11, l12]">
            </stanza-tags>
          </div>
        </div>
        <!-- Third Stanza -->
        <div class="columns">
          <div class="column">
            <div class="box">
              <input
                class="input is-static"
                type="text"
                v-model="l13"
                placeholder="Third stanza..."
              />
              <input
                class="input is-static"
                type="text"
                v-model="l13"
                disabled
              />
              <input class="input is-static" type="text" v-model="l15" />
              <input
                class="input is-static"
                type="text"
                v-model="l15"
                disabled
              />
              <input class="input is-static" type="text" v-model="l17" />
              <input class="input is-static" type="text" v-model="l18" />
            </div>
          </div>
          <div class="column">
            <stanza-tags :upper-lines="[l13, l15]" :lower-lines="[l17, l18]">
            </stanza-tags>
          </div>
        </div>
        <!-- Fourth Stanza -->
        <div class="columns">
          <div class="column">
            <div class="box">
              <input
                class="input is-static"
                type="text"
                v-model="l19"
                placeholder="Final stanza..."
              />
              <input class="input is-static" type="text" v-model="l20" />
              <input class="input is-static" type="text" v-model="l21" />
              <input class="input is-static" type="text" v-model="l22" />
              <input class="input is-static" type="text" v-model="l23" />
              <input class="input is-static" type="text" v-model="l24" />
            </div>
          </div>
          <div class="column">
            <stanza-tags
              :upper-lines="[l1, l3, l7, l9, l13, l15]"
              :lower-lines="[l19, l20, l21, l22, l23, l24]"
            >
            </stanza-tags>
          </div>
        </div>
      </div>

      <!--  View Mode  -->
      <div v-show="mode === 'view'">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea viewarea"
              v-model="wholePoem"
              rows="30"
              readonly
            ></textarea>
          </div>
        </div>
      </div>

      <!--  Load Mode  -->
      <div v-show="mode === 'load'">
        <div class="columns">
          <!-- left side (input window) -->
          <div class="column">
            <div class="box">
              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea loadarea"
                    v-model="poemInput"
                    rows="30"
                    :placeholder="getRandomExample()"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- right side (description) -->
          <div class="column">
            <div class="box">
              <div class="field">
                <p class="alt-style">
                  If you want to load a pre-written paradelle into the editor,
                  you can copy/paste it here, then press "load input." Make sure
                  to follow the structure demonstrated in the text area.
                </p>
              </div>
              <div class="field">
                <button
                  class="button"
                  @click="loadFromInput(poemInput)"
                  :disabled="poemInput === ''"
                >
                  <span>Load Input</span>
                  <span class="icon is-small">
                    <i class="fas fa-paste"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Created by
        <a href="https://dustinmichels.com">Dustin Michels</a>. Updated 2022.
        Source code
        <a href="https://github.com/dustinmichels/paradellEditor">here</a>.
      </p>
    </div>
  </footer>
</template>

<style></style>
