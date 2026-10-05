<script lang="ts">
  import { Skull } from '@lucide/svelte';
  import svelteLogo from './assets/svelte.svg'
  import Counter from "./lib/Counter.svelte";
  import RubikFace from "./lib/RubikFace.svelte";

  let x = 20;

</script>

<div id="app">
  <RubikFace/>
</div>
