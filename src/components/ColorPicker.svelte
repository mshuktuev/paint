<script>
	import { getContext } from 'svelte';
	const defaultColors = ['transparent', 'red', 'blue', 'yellow', 'black', 'pink'];
	const { colors, selectType } = getContext('tools');

	function pickColor(color) {
		$colors[$selectType] = color;
	}
</script>

<div class="color-picker">
	{#each defaultColors as color}
		<button class="color" style="background: {color};" on:click={() => pickColor(color)}>
			{#if color === 'transparent'}
				<div class="line" />
			{/if}
		</button>
	{/each}
</div>

<style>
	.color-picker {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-items: center;
		gap: 5px;
	}
	.color {
		border: 1px solid black;
		height: 20px;
		width: 20px;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}
	.line {
		position: absolute;
		width: 40px;
		height: 1px;
		border: 2px solid red;
		top: 6px;
		left: -10px;
		transform: rotate(-45deg);
	}
</style>
