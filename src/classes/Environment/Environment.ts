import { Drawable } from "../types/gameObjectTypes.ts";
import Wall from "./Wall/Wall.ts";
import Vector2 from "../Vector2.ts";

export default class Environment {
  #drawables: Drawable[] = [dziaua, niedziaua, crookedWall];

  get drawables() {
    return this.#drawables;
  }

  drawEnvironment(ctx: CanvasRenderingContext2D) {
    this.#drawables.forEach((drawable) => {
      drawable.draw(ctx);
    });
  }
}

const crookedWall = new Wall({
  points: Vector2.CreateMany({ x: 300, y: 300 }, { x: 330, y: 300 }, { x: 380, y: 600 }, { x: 350, y: 600 }),
});

const dziaua = new Wall({
  points: Vector2.CreateMany({ x: 100, y: 100 }, { x: 110, y: 100 }, { x: 110, y: 400 }, { x: 100, y: 400 }),
});

const niedziaua = new Wall({
  points: Vector2.CreateMany({ x: 200, y: 200 }, { x: 210, y: 200 }, { x: 210, y: 500 }, { x: 200, y: 500 }),
});
