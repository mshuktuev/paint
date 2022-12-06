<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const canvas = writable(null);

	setContext('canvas', canvas);
</script>

<slot />
