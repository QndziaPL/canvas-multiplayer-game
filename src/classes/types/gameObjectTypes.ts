import Vector2 from "../Vector2.ts";

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
