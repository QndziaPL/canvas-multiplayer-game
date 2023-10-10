import { Drawable } from "../types/gameObjectTypes.ts";
import Wall from "./Wall/Wall.ts";

export default class Environment {
  #drawables: Drawable[] = [
    new Wall({
      points: [
        { x: 100, y: 100 },
        { x: 110, y: 100 },
        { x: 110, y: 400 },
        { x: 100, y: 400 },
      ],
    }),
    new Wall({
      points: [
        { x: 300, y: 300 },
        { x: 330, y: 300 },
        { x: 380, y: 600 },
        { x: 350, y: 600 },
      ],
    }),
  ];

  get drawables() {
    return this.#drawables;
  }

  drawEnvironment(ctx: CanvasRenderingContext2D) {
    this.#drawables.forEach((drawable) => {
      drawable.draw(ctx);
    });
  }
}
