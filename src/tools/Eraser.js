import { Pencel } from "./Pencel"

export default class Eraser extends Pencel {
  constructor(canvas, colors, strokeWidth) {
    super(canvas,colors, strokeWidth);
  }


  draw(x, y) {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
  onMouseUp(e) {
    e.stopPropagation()
    this.isDrawing = false
  }
}
