<script>
	import Cnavas from './components/Cnavas.svelte';
	import Toolbar from './components/Toolbar.svelte';
	import CnavasStore from './stores/CnavasStore.svelte';
	import Tools from './stores/Tools.svelte';
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
