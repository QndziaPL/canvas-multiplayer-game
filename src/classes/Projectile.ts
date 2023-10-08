import { Position } from "./GameState/GameState.ts";
import { Movable } from "./types/gameObjectTypes.ts";
import Vector2 from "./Vector2.ts";

export type ProjectileConstructorProps = {
  position: Position;
  velocity: Vector2;
  movementSpeed?: number;
  range?: number;
};
export default class Projectile implements Movable {
  #position: Position;
  #velocity: Vector2;
  #movementSpeed: number;
  #range: number;
  #rangeTravelled: number = 0;

  constructor({ position, velocity, movementSpeed = 5000, range = 1500 }: ProjectileConstructorProps) {
    this.#position = position;
    this.#velocity = velocity;
    this.#movementSpeed = movementSpeed;
    this.#range = range;
  }

  get movementSpeed() {
    return this.#movementSpeed;
  }

  set movementSpeed(value: number) {
    this.#movementSpeed = value;
  }

  get outOfRange() {
    return this.#rangeTravelled >= this.#range;
  }

  get position() {
    return this.#position;
  }

  move(deltaTime: number) {
    const startPoint = new Vector2(this.#position.x, this.#position.y);
    this.#position.x += this.#velocity.x * this.#movementSpeed * deltaTime;
    this.#position.y += this.#velocity.y * this.#movementSpeed * deltaTime;
    const destinationPoint = new Vector2(this.#position.x, this.#position.y);
    const distanceTravelled = destinationPoint.distanceFromPoint(startPoint);
    this.#rangeTravelled += distanceTravelled;
  }
}
