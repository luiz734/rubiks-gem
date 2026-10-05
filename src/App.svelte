<script lang="ts">
  import { Skull } from '@lucide/svelte';
  import svelteLogo from './assets/svelte.svg'
  import Counter from "./lib/Counter.svelte";

  let x = 20;

</script>

<div id="app">
  <Skull />
  <button class="btn btn-primary"> Click me </button>
  <Counter/>
</div>
