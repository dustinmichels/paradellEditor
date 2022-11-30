<script setup lang="ts">
import { ref } from "vue";
import StanzaTags from "./StanzaTags.vue";

let lA = ref("");
let lB = ref("");
let lC = ref("");
let lD = ref("");

// const lines = ref([
//   { id: "A", text: "Vegetables" },
//   { id: "B", text: "Cheese" },
//   { id: "C", text: "Whatever else humans are supposed to eat" },
//   { id: "D", text: "Whatever else eat" },
// ]);
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="box">
        <input
          class="input is-static"
          type="text"
          v-model="lA"
          placeholder="Second stanza..."
        />
        <input class="input is-static" type="text" v-model="lA" disabled />
        <input class="input is-static" type="text" v-model="lB" />
        <input class="input is-static" type="text" v-model="lB" disabled />
        <input class="input is-static" type="text" v-model="lC" />
        <input class="input is-static" type="text" v-model="lD" />
      </div>
    </div>
    <div class="column">
      <StanzaTags :upper-lines="[lA, lB]" :lower-lines="[lC, lD]"> </StanzaTags>
    </div>
  </div>
</template>
