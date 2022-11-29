<script lang="ts">
import { defineComponent } from "vue";
import { findExtra, findUsed, tokenizeLines } from "../tags";
import { PropType } from "vue";

export default defineComponent({
  // type inference enabled
  props: {
    upperLines: Array as PropType<string[]>,
    lowerLines: Array as PropType<string[]>,
  },
  computed: {
    upperTokens() {
      return tokenizeLines(this.upperLines || []);
    },
    lowerTokens() {
      return tokenizeLines(this.lowerLines || []);
    },
    usedTokens() {
      return findUsed(this.upperTokens, this.lowerTokens);
    },
    extraTokens() {
      return findExtra(this.upperTokens, this.lowerTokens);
    },
  },
});
</script>

<template>
  <div class="tags">
    <span
      v-for="(word, index) in upperTokens"
      v-bind:class="{ tag: true, 'is-success': usedTokens[index] }"
    >
      {{ word }}
    </span>
    <span v-for="word in extraTokens" class="tag is-danger">{{ word }}</span>
  </div>
</template>

<style scoped></style>
