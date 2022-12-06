<script>
	import { getContext } from 'svelte';

	const strokeTypes = [
		{ name: '1', value: 1 },
		{ name: '2', value: 2 },
		{ name: '4', value: 4 },
		{ name: '8', value: 8 },
	];
	const { strokeWidth } = getContext('tools');

	function changeStroke(e) {
		$strokeWidth = Number(e.target.value);
	}
</script>

<div class="stroke-picker">
	<div class="title">Stroke</div>
	<select on:change={changeStroke}>
		{#each strokeTypes as stroke}
			<option value={stroke.value}>{stroke.name}</option>
		{/each}
	</select>
</div>

<style>
	.stroke-picker {
		display: flex;
		flex-direction: column;
	}
</style>
