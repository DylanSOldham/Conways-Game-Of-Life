import { Logger } from "./logger.js";

class ActorManager {

    constructor () {
        this.actors = [];
        this.nextActorId = 0;
    }

    addActor (actor) 
    {
        if (!actor.Update && !actor.Render) {
            Logger.err("Actor must have an Update or Render function: " + JSON.stringify(actor));
            return;
        }

        actor.id = this.nextActorId++;
        actor.delete = false;

        this.actors.push(actor);
    }

    loadScene (scene) {
        this.actors = [];
        let newActors = scene.load(); // TODO - load will take persistent game state as input

        for (let i = 0; i < newActors.length; ++i) {
            this.addActor(newActors[i]);
        }
    }

    updateActors (input) {
        for (let i = 0; i < this.actors.length; ++i) {
            let actor = this.actors[i];

            if (!actor.delete) {
                actor.Update?.(input);
            } else {
                this.actors.splice(index, 1);
            }
        }
    }

    renderActors (renderer) {
        for (let actor of this.actors) {
            actor.Render?.(renderer);
        }
    }
};

export { ActorManager };