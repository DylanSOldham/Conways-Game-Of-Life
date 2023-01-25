import { ConwayController } from "../actors/conwayController.js";

const Scene_GameOfLife = {
    load: () => {
        let actors = [];

        actors.push(new ConwayController());

        return actors;
    }
}

export {Scene_GameOfLife}