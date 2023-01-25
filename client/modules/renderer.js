import { Logger } from "./logger.js";

const makeColor = (r, g, b, a) => {
    return `rgba(${r || 0}, ${g || 0}, ${b || 0}, ${a || 255})`;
}

class Renderer {

    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        if (!this.ctx) 
        {
            Logger.err("Canvas 2D Context was null");
        }
    }

    clearScreen (r, g, b, a) {
        this.ctx.fillStyle = makeColor(r, g, b, a);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect (x, y, w, h, color) {
        this.ctx.fillStyle = makeColor(color.r, color.g, color.b, color.a);
        this.ctx.fillRect(x, y, w, h);
    }

    get width () {
        return this.canvas.width;
    }

    get height () {
        return this.canvas.height;
    }

};

export { Renderer };