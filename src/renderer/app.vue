<template>
  <h1>{{ message }}</h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  message = "Hello Vue!";
}
</script>
