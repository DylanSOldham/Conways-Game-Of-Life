import { Logger } from "../logger.js";

class ConwayController {

    constructor () {
        this.simSpeed = 6; // Updates per second
        this.paused = false;
        this.lastUpdate = Date.now();
        this.hoveredX = null;
        this.hoveredY = null;

        this.board_width = 16*5;
        this.board_height = 12*5;
        this.board = [];
        for (let i = 0; i < this.board_width; ++i) {
            this.board.push([]);
            for (let j = 0; j < this.board_height; ++j) {
                this.board[i].push((Math.random() * 10 < 1) ? 1 : 0);
            }
        }
    }

    Update (input) {

        this.hoveredX = Math.floor(input.mouseX * this.board_width);
        this.hoveredY = Math.floor(input.mouseY * this.board_height);

        if (input.isMouseLeftDown() && this.board[this.hoveredX]?.[this.hoveredY] !== undefined) {
            this.board[this.hoveredX][this.hoveredY] = 1;
        }

        if (input.isMouseRightDown() && this.board[this.hoveredX]?.[this.hoveredY]) {
            this.board[this.hoveredX][this.hoveredY] = 0;
        }

        if (input.isKeyJustDown("Space")) this.paused = !this.paused;

        if (this.paused || Date.now() - this.lastUpdate < 1000/this.simSpeed) return;

        this.lastUpdate = Date.now();

        this.AdvanceConway();
    }

    Render (renderer) 
    {
        let squareWidth = renderer.width / this.board_width;
        let squareHeight = renderer.height / this.board_height;

        for (let i = 0; i < this.board_width; ++i) {
            for (let j = 0; j < this.board_height; ++j) {
                
                if (i === this.hoveredX && j === this.hoveredY) {
                    renderer.drawRect(
                        i * squareWidth, j * squareHeight, 
                        squareWidth, squareHeight, 
                        {r: 255, g: 0, b: 25}
                    );
                }
                else if (this.board[i][j]) {
                    renderer.drawRect(
                        i * squareWidth, j * squareHeight, 
                        squareWidth, squareHeight, 
                        {r: 0, g: 255, b: 25}
                    );

                    renderer.drawRect(
                        i * squareWidth + 1, j * squareHeight + 1, 
                        squareWidth - 2, squareHeight - 2, 
                        {r: 0, g: 0, b: 0}
                    );
                }
            }
        }
    }

    AdvanceConway () {
        const newboard = [];
        for (let i = 0; i < this.board_width; ++i) {
            newboard.push([]);
            for (let j = 0; j < this.board_height; ++j) {
                let neighborCount = 0;

                for (let k = i - 1; k <= i + 1; ++k) {
                    for (let l = j - 1; l <= j + 1; ++l) {
                        if (!(l == j && k == i)) {
                            let xindex = (k + this.board_width) % this.board_width;
                            let yindex = (l + this.board_height) % this.board_height;
                            neighborCount += this.board[xindex][yindex];
                        }
                    }
                }

                let squareIsNowAlive = (this.board[i][j] === 1 )
                    ? (neighborCount === 2 || neighborCount === 3) 
                    : neighborCount === 3;
                newboard[i].push(squareIsNowAlive ? 1 : 0);
            }
        }

        this.board = newboard;
    }
};

export { ConwayController };