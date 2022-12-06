<script>
	import { getContext } from 'svelte';
	import ColorPicker from './ColorPicker.svelte';
	import ColorPrew from './ColorPrew.svelte';
	import StrokePicker from './StrokePicker.svelte';

	const { toolsTypes, setTool, toolName, clearAll, download } = getContext('tools');
</script>

<aside>
	<div class="tools">
		{#each toolsTypes as tool}
			<button class:selected={$toolName === tool} on:click={() => setTool(tool)}>{tool}</button>
		{/each}
	</div>
	<ColorPrew />
	<StrokePicker />
	<ColorPicker />
	<button on:click={clearAll}>Clear All</button>
	<button on:click={download}>Download</button>
</aside>

<style>
	aside {
		width: 150px;
		height: 100%;
		background: rgb(245, 245, 245);
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding: 20px 10px;
	}
	.tools {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	button.selected {
		background: rgb(205, 255, 251);
		border: 1px black solid;
		border-radius: 3px;
		padding: 2px 0;
	}
</style>
