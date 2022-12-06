import Tool from "./Tool";

export class Fill extends Tool {
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

      this.actionFill(this.currentX, this.currentY)
    }

    onMouseUp(e) {
      e.stopPropagation()
      this.isDrawing = false
    }

    onMouseMove(e) {
      return
    }

    actionFill(startX, startY) {
      //get imageData
      this.colorLayer = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      this.startPos = (startY * this.canvas.width + startX) * 4;

      //clicked color
      this.startR = this.colorLayer.data[this.startPos];
      this.startG = this.colorLayer.data[this.startPos + 1];
      this.startB = this.colorLayer.data[this.startPos + 2];
      //exit if color is the same
      if (
        this.colorFill.r === this.startR &&
        this.colorFill.g === this.startG &&
        this.colorFill.b === this.startB
      ) {
        return;
      }
      //Start with click coords
      this.pixelStack = [[startX, startY]];
      this.floodFill();


      //render floodFill result
      this.ctx.putImageData(this.colorLayer, 0, 0);

      //helpers


    }
    colorPixel(pixelPos) {
      this.colorLayer.data[pixelPos] = this.colorFill.r;
      this.colorLayer.data[pixelPos + 1] = this.colorFill.g;
      this.colorLayer.data[pixelPos + 2] = this.colorFill.b;
      this.colorLayer.data[pixelPos + 3] = 255;
    }
     matchStartColor(pixelPos) {
      let r = this.colorLayer.data[pixelPos];
      let g = this.colorLayer.data[pixelPos + 1];
      let b = this.colorLayer.data[pixelPos + 2];
      return r === this.startR && g === this.startG && b === this.startB;
    }

    floodFill() {
      this.newPos = this.pixelStack.pop();
      this.x = this.newPos[0];
      this.y = this.newPos[1];

      //get current pixel position
      this.pixelPos = (this.y * this.canvas.width + this.x) * 4;
      // Go up as long as the color matches and are inside the canvas
      while (this.y >= 0 && this.matchStartColor(this.pixelPos)) {
        this.y--;
        this.pixelPos -= this.canvas.width * 4;
      }
      //Don't overextend
      this.pixelPos += this.canvas.width * 4;
      this.y++;
      this.reachLeft = false;
      this.reachRight = false;
      // Go down as long as the color matches and in inside the canvas
      while (this.y < this.canvas.height && this.matchStartColor(this.pixelPos)) {
        this.colorPixel(this.pixelPos);

        if (this.x > 0) {
          if (this.matchStartColor(this.pixelPos - 4)) {
            if (!this.reachLeft) {
              //Add pixel to stack
              this.pixelStack.push([this.x - 1, this.y]);
              this.reachLeft = true;
            }
          } else if (this.reachLeft) {
            this.reachLeft = false;
          }
        }

        if (this.x < this.canvas.width - 1) {
          if (this.matchStartColor(this.pixelPos + 4)) {
            if (!this.reachRight) {
              //Add pixel to stack
              this.pixelStack.push([this.x + 1, this.y]);
              this.reachRight = true;
            }
          } else if (this.reachRight) {
            this.reachRight = false;
          }
        }
        this.y++;
        this.pixelPos += this.canvas.width * 4;
      }

      // this.ctx.putImageData(colorLayer, 0, 0);
      // source = this.canvas.toDataURL();
      // renderImage();

      if (this.pixelStack.length) {
        this.floodFill();
        // window.setTimeout(floodFill, 100);
      }
    }


    // draw(x,y) {
    //   const img = new Image()
    //   img.src = this.saved
    //   img.onload = () => {
    //     this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
    //     this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    //     this.ctx.beginPath()
    //     this.ctx.moveTo(this.currentX, this.currentY )
    //     this.ctx.lineTo(x, y)
    //     this.ctx.stroke()
    //   }
    // }
}
