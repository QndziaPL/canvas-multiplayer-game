import Vector2 from "../Vector2.ts";
import { Position } from "../GameState/GameState.ts";

export type MoveWithVector = (vector: Vector2, deltaTime: number) => void;
export type MoveWithoutVector = (deltaTime: number) => void;
export type MoveFunction = MoveWithVector | MoveWithoutVector;
export interface Movable {
  movementSpeed: number;
  move: MoveFunction;
}

export interface Shootable {
  shoot(): void;
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
  points: Position[];
}

export class Collider {
  // @ts-ignore
  readonly collider: true;
  static isCollider(object: any): object is Collider {
    return "collider" in object;
  }
}
