import { Logger } from "./logger.js";

class InputManager {

    constructor (canvas) 
    {
        this.canvas = canvas;

        this.keysdown = {};
        this.keysjustdown = {};
        this.keysjustup = {};

        this.mousePosition = {x: 0, y: 0}

        this.mouseLeftButtonDown = false;
        this.mouseLeftButtonJustDown = false;
        this.mouseRightButtonDown = false;
        this.mouseRightButtonJustDown = false;

        canvas.addEventListener("keydown", (event) => {
            this.keysdown[event.code] = true;
            this.keysjustdown[event.code] = true;

            //Logger.log(`Keydown "${event.code}"`);

            event.preventDefault();
        });

        canvas.addEventListener("keyup", (event) => {
            this.keysdown[event.code] = false;
            this.keysjustup[event.code] = true;

            //Logger.log(`Keyup "${event.code}"`);
        });

        canvas.addEventListener("mousemove", (event) => {
            this.mousePosition.x = event.offsetX;
            this.mousePosition.y = event.offsetY;
        });

        canvas.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.mouseLeftButtonDown = true;
                this.mouseLeftButtonJustDown = true;
                return;
            }
            if (event.button === 2) {
                this.mouseRightButtonDown = true;
                this.mouseRightButtonJustDown = true;
                return;
            }
        });

        canvas.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.mouseLeftButtonDown = false;
                return;
            }
            if (event.button === 2) {
                this.mouseRightButtonDown = false;
                return;
            }
        });

        canvas.addEventListener('contextmenu', function(event) { 
            event.preventDefault();
        });
    }

    refreshInput () {
        this.keysjustdown = {};
        this.keysjustup = {};

        this.mouseLeftButtonJustDown = false;
        this.mouseRightButtonJustDown = false;
    }

    isKeyDown (code) {
        return this.keysdown[code];
    }

    isKeyJustDown (code) {
        return this.keysjustdown[code];
    }

    isKeyJustUp (code) {
        return this.keysjustup[code];
    }

    get mouseX () {
        return this.mousePosition.x / this.canvas.width;
    }

    get mouseY () {
        return this.mousePosition.y / this.canvas.height;
    }

    isMouseLeftDown () {
        return this.mouseLeftButtonDown;
    }

    isMouseLeftJustDown () {
        return this.mouseLeftButtonJustDown;
    }

    isMouseRightDown () {
        return this.mouseRightButtonDown;
    }

    isMouseRightJustDown () {
        return this.mouseRightButtonJustDown;
    }
}

export { InputManager };