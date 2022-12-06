<script>
	import { getContext } from 'svelte';

	const { colors, selectType } = getContext('tools');

	function switchType(type) {
		$selectType = type;
	}
</script>

<div class="colors">
	<button class="color" class:selected={$selectType === 'stroke'} on:click={() => switchType('stroke')}>
		<div class="prew" style="background: {$colors.stroke};">
			{#if $colors.stroke === 'transparent'}
				<div class="line" />
			{/if}
		</div>
		<div class="title">Stroke</div>
	</button>
	<button class="color" class:selected={$selectType === 'fill'} on:click={() => switchType('fill')}>
		<div class="prew" style="background: {$colors.fill};">
			{#if $colors.fill === 'transparent'}
				<div class="line" />
			{/if}
		</div>
		<div class="title">Fill</div>
	</button>
</div>

<style>
	.colors {
		display: flex;
		gap: 5px;
		width: 100%;
		justify-content: space-around;
	}
	.color {
		padding: 5px;
		cursor: pointer;
		border: none;
		outline: none;
		background: transparent;
		transition: background 0.3s;
	}
	.color.selected {
		background: rgb(199, 226, 225);
		border-radius: 5px;
	}
	.prew {
		aspect-ratio: 1;
		width: 50px;
		position: relative;
		overflow: hidden;
		border: 1px solid black;
	}
	.prew .line {
		position: absolute;
		width: 100px;
		height: 1px;
		border: 2px solid red;
		top: 15px;
		left: -19px;
		transform: rotate(-45deg);
	}
	.title {
		text-align: center;
	}
</style>
