import Tool from "./Tool";

export class Line extends Tool {
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
      this.isDrawing = true
      this.currentX = e.pageX-e.target.offsetLeft
      this.currentY = e.pageY-e.target.offsetTop
      this.ctx.beginPath()
      this.ctx.moveTo(this.currentX, this.currentY )
      this.saved = this.canvas.toDataURL()
      if (e.button === 2) {
        this.ctx.strokeStyle = this.colorFill
      } else {
        this.ctx.strokeStyle = this.colorStroke
      }
    }

    onMouseUp(e) {
      e.stopPropagation()
      this.isDrawing = false
    }

    onMouseMove(e) {
      if (this.isDrawing) {

        this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
      }
    }

    draw(x,y) {
      const img = new Image()
      img.src = this.saved
      img.onload = () => {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    }
}
