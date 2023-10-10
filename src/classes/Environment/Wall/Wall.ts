import { Collider, Drawable } from "../../types/gameObjectTypes.ts";
import { Position } from "../../GameState/GameState.ts";

export type WallConstructorProps = {
  points: Position[];
};
export default class Wall implements Drawable, Collider {
  #points: WallConstructorProps["points"];
  readonly collider = true;
  constructor({ points }: WallConstructorProps) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();

    this.#points.forEach(({ x, y }, index) => {
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.restore();
  }
}