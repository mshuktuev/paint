import Tool from "./Tool";

export class Pencel extends Tool {
    constructor(canvas, colors, strokeWidth) {
        super(canvas, colors, strokeWidth);
        this.addListeners()
    }

    addListeners() {
      this.canvas.onmousemove =  this.onMouseMove.bind(this);
      this.canvas.onmousedown = this.onMouseDown.bind(this);
      this.canvas.onmouseup =  this.onMouseUp.bind(this);
      this.canvas.onmouseleave =  this.onMouseUp.bind(this);
    }

    onMouseDown(e) {
      if (this.isDrawing) return

      this.isDrawing = true
      if (e.button === 2) {
        this.ctx.strokeStyle = this.colorFill
      } else {
        this.ctx.strokeStyle = this.colorStroke
      }
      this.ctx.beginPath()
      this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    onMouseUp(e) {
      e.stopPropagation()
      this.isDrawing = false
    }

    onMouseMove(e) {
      if (this.isDrawing) {
        this.draw(e.pageX - e.target.offsetLeft, e.pageY- e.target.offsetTop)
      }
    }

    draw(x,y) {
      this.ctx.lineTo(x, y)
      this.ctx.stroke()
    }
}
