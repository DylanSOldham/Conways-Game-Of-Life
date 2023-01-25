import { Game } from "./modules/game.js";

let canvas = document.querySelector("#game-canvas");
canvas.tabIndex = 1;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

window.addEventListener("resize", (event) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
})

let game = new Game(canvas);
game.Run();