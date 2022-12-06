export default class Tool {

    constructor(canvas, colors, strokeWidth) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')

        this.colorFill = colors.fill
        this.colorStroke = colors.stroke
        this.ctx.strokeStyle = colors.stroke.color
        this.ctx.fillStyle = colors.fill.color
        this.ctx.lineWidth = strokeWidth
        this.ctx.lineCap = "round";
				this.ctx.lineJoin = "round";
        this.clearEvents()
    }

    clearEvents() {
      this.canvas.onmousemove = null
      this.canvas.onmouseup = null
      this.canvas.onmousedown = null
      this.canvas.oncontextmenu = null
      this.canvas.onmouseleave = null
    }
}
