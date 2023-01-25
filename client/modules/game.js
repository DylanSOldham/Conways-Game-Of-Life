import { Renderer } from "./renderer.js";
import { InputManager } from "./inputmanager.js";
import { ActorManager } from "./actormanager.js";

import { Scene_GameOfLife } from "./scenes/testScene.js";

class Game {

    constructor (canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);

        this.actorManager = new ActorManager();

        this.input = new InputManager(canvas);

        this.quitGame = false;
    }

    Run () {
        this.actorManager.loadScene(Scene_GameOfLife);

        this.Loop();
    }

    Loop () {
        this.Update();
        this.Render();

        if (!this.quitGame) 
        {
            requestAnimationFrame(() => this.Loop());
        }
    }

    Update () {
        this.actorManager.updateActors(this.input);
        this.input.refreshInput();
    }

    Render () {
        this.renderer.clearScreen(0, 13, 22, 255);
        this.actorManager.renderActors(this.renderer);
    }
};

export {Game};