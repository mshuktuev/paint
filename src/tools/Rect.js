import Tool from "./Tool";

export class Rect extends Tool {
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
      this.ctx.beginPath()
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL()
    }

    onMouseUp(e) {
      e.stopPropagation()
      this.isDrawing = false
    }

    onMouseMove(e) {
      if (this.isDrawing) {
        const currentX = e.pageX - e.target.offsetLeft;
        const currentY = e.pageY - e.target.offsetTop;
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.draw(this.startX, this.startY, width, height)
      }
    }

    draw(x,y,w,h) {
      const img = new Image()
      img.src = this.saved
      img.onload = () => {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
          this.ctx.beginPath()
          this.ctx.rect(x, y, w, h)
          this.ctx.fill()
          this.ctx.stroke()
      }
    }
}
