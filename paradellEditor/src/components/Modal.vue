<script setup lang="ts">
const props = defineProps({
  show: Boolean,
});
</script>

<template>
  <div class="modal" v-bind:class="{ 'is-active': show }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">About 🤔</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body content">
        <p>The paradelle is a rigid, modern poetic form.</p>
        <p>
          According to
          <a target="_blank" href="https://en.wikipedia.org/wiki/Paradelle"
            >Wikipedia</a
          >:
        </p>
        <blockquote>
          Billy Collins originally said the paradelle was invented in
          11th-century France, but he later admitted that he invented it himself
          to parody strict forms of poetry, particularly the
          <a target="_blank" href="https://en.wikipedia.org/wiki/Villanelle"
            >villanelle</a
          >. His sample paradelle, "Paradelle for Susan" (c. 1997), was
          seemingly intentionally terrible, completing the final stanza with the
          line "Darken the mountain, time and find was my into it was with to
          to".
        </blockquote>
        <p>
          Despite it's satirical beginnings, people have gone on to write some
          very beautiful paradelles. The tricky part is that you must re-use
          words introduced in previous couplets and stanzas in later couplets
          and stanzas. This editor exists to help you keep track of the words
          you need to use.
        </p>
        Here are the
        <a
          target="_blank"
          href="https://www.writersdigest.com/write-better-poetry/poetic-form-paradelle"
          >complete rules</a
        >:
        <ul>
          <li>The paradelle is a 4-stanza poem.</li>
          <li>Each stanza consists of 6 lines.</li>
          <li>
            For the first 3 stanzas: the 1st and 2nd lines should be the same;
            the 3rd and 4th lines should also be the same; and the 5th and 6th
            lines should be composed of all the words from the 1st and 3rd lines
            and only the words from the 1st and 3rd lines.
          </li>
          <li>
            The final stanza should be composed of all the words in the 5th and
            6th lines of the first three stanzas and only the words from the 5th
            and 6th lines of the first three stanzas.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
