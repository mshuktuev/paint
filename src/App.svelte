<script>
	import { onMount } from 'svelte';
	import Cnavas from './components/Cnavas.svelte';
	import Toolbar from './components/Toolbar.svelte';
	import CnavasStore from './stores/CnavasStore.svelte';
	import Tools from './stores/Tools.svelte';

	onMount(() => {
		window.onbeforeunload = function (evt) {
			var message = 'Рисунок не сохранился, вы уверены что хотите закрыть страницу?';
			if (typeof evt == 'undefined') {
				evt = window.event;
			}
			if (evt) {
				evt.returnValue = message;
			}
			return message;
		};
	});
</script>

<CnavasStore>
	<Tools>
		<main on:contextmenu|preventDefault>
			<Toolbar />
			<Cnavas />
		</main>
	</Tools>
</CnavasStore>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
