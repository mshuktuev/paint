<script>
	import { getContext } from 'svelte';
	const defaultColors = [
		{ color: 'transparent', r: 0, g: 0, b: 0, a: 0 },
		{ color: '#ffffff', r: 255, g: 255, b: 255, a: 255 },
		{ color: '#000000', r: 0, g: 0, b: 0, a: 255 },
		{ color: '#828282', r: 130, g: 130, b: 130, a: 255 },
		{ color: '#194bff', r: 25, g: 75, b: 255, a: 255 },
		{ color: '#c619ff', r: 198, g: 25, b: 255, a: 255 },
		{ color: '#19ffc2', r: 25, g: 255, b: 194, a: 255 },
		{ color: '#fbff19', r: 251, g: 255, b: 25, a: 255 },
		{ color: '#ff8119', r: 255, g: 129, b: 25, a: 255 },
		{ color: '#5e19ff', r: 94, g: 25, b: 255, a: 255 },
	];
	const { colors, selectType } = getContext('tools');

	function pickColor(color) {
		$colors[$selectType] = color;
	}
</script>

<div class="color-picker">
	{#each defaultColors as color}
		<button class="color" style="background: {color.color};" on:click={() => pickColor(color)}>
			{#if color.color === 'transparent'}
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
