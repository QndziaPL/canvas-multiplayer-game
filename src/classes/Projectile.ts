import { Position } from "./GameState/GameState.ts";
import { Movable } from "./types/gameObjectTypes.ts";
import Vector2 from "./Vector2.ts";

export type ProjectileConstructorProps = {
  position: Position;
  velocity: Vector2;
  movementSpeed: number;
};
export default class Projectile implements Movable {
  #position: Position;
  #velocity: Vector2;
  #movementSpeed: number;

  constructor({ position, velocity, movementSpeed = 10 }: ProjectileConstructorProps) {
    this.#position = position;
    this.#velocity = velocity;
    this.#movementSpeed = movementSpeed;
  }

  get movementSpeed() {
    return this.#movementSpeed;
  }

  set movementSpeed(value: number) {
    this.#movementSpeed = value;
  }

  move(deltaTime: number) {
    this.#position.x += this.#velocity.x * this.#movementSpeed * deltaTime;
    this.#position.y += this.#velocity.y * this.#movementSpeed * deltaTime;
  }
}
