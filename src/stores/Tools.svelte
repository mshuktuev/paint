<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Circle } from '../tools/Circle';
	import Eraser from '../tools/Eraser';
	import { Fill } from '../tools/Fill';
	import { Line } from '../tools/Line';
	import { Pencel } from '../tools/Pencel';
	import { Rect } from '../tools/Rect';
	import { Triangle } from '../tools/Triangle';
	import { TriangleCorner } from '../tools/TriangleCorner';

	let once = true;
	const canvas = getContext('canvas');

	const tools = writable(null);
	const toolName = writable('pencel');
	const colors = writable({
		fill: { color: '#194bff', r: 25, g: 75, b: 255, a: 255 },
		stroke: { color: '#000000', r: 0, g: 0, b: 0, a: 255 },
	});
	const selectType = writable('stroke');

	const strokeWidth = writable(1);

	const toolsTypes = ['pencel', 'rect', 'circle', 'line', 'triangle', 'triangleCorner', 'eraser', 'fill'];

	const toolsSelect = {
		pencel: Pencel,
		rect: Rect,
		circle: Circle,
		line: Line,
		triangle: Triangle,
		triangleCorner: TriangleCorner,
		eraser: Eraser,
		fill: Fill,
	};

	function setTool(tool) {
		$tools = new toolsSelect[tool]($canvas, $colors, $strokeWidth) ?? new toolsSelect['pencel']($canvas, $colors, $strokeWidth);
		$toolName = tool;
	}

	function remakeTool() {
		if (!$canvas) return;
		$tools = new toolsSelect[$toolName]($canvas, $colors, $strokeWidth);
	}

	function initialTool() {
		$tools = new toolsSelect['pencel']($canvas, $colors, $strokeWidth);
	}

	function clearAll() {
		const ctx = $canvas.getContext('2d');
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, $canvas.width, $canvas.height);
	}

	function download() {
		const link = document.createElement('a');

		link.download = 'image.jpg';
		link.href = $canvas.toDataURL('image/jpeg');

		link.click();
	}

	$: if ($canvas && once) {
		initialTool();
		once = false;
	}
	$: remakeTool(), $strokeWidth, $colors, $canvas;

	setContext('tools', { toolsTypes, setTool, colors, strokeWidth, selectType, toolName, clearAll, download });
</script>

<slot />
