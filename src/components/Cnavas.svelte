<script>
	import { getContext, onMount } from 'svelte';

	let canvasNode = null;
	let wrapperNode = null;

	const canvas = getContext('canvas');

	function resizeCanvas() {
		const saved = canvasNode.toDataURL();
		const w = canvasNode.width;
		const h = canvasNode.height;
		canvasNode.width = wrapperNode.offsetWidth;
		canvasNode.height = wrapperNode.offsetHeight;
		const ctx = canvasNode.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvasNode.width, canvasNode.height);
		const img = new Image();
		img.src = saved;
		img.onload = () => {
			ctx.drawImage(img, 0, 0, w, h);
		};
		$canvas = canvasNode;
	}

	onMount(() => {
		$canvas = canvasNode;
		const ctx = canvasNode.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvasNode.width, canvasNode.height);
	});
</script>

<div class="canvas-container">
	<div class="wrapper" bind:this={wrapperNode} on:mouseup={resizeCanvas}>
		<canvas bind:this={canvasNode} width="800" height="400" />
	</div>
</div>

<style>
	.canvas-container {
		flex-grow: 2;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrapper {
		resize: both;
		overflow: hidden;
		padding: 0;
		width: 800;
		height: 400;
		min-width: 100px;
		min-height: 100px;
		max-width: calc(100vw - 150px);
		max-height: 100vh;
		box-sizing: border-box;
		border: 1px solid black;
		display: flex;
		justify-content: start;
		align-items: start;
	}
	canvas {
		z-index: 1;
		background: #fff;
	}
</style>
