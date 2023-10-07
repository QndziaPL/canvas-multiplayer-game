import { Position, Vector2 } from "./GameState/GameState.ts";
import { v4 as uuid } from "uuid";

export const DEFAULT_PLAYER_CONSTS = {
  movementSpeed: 500,
  sizeRadius: 10,
};
export type PlayerContructorProps = {
  name: string;
  initialPosition: Position;
  movementSpeed?: number;
  sizeRadius?: number;
  color?: string;
};
export default class Player {
  #id: string;
  #name: string;
  #position: Position;
  #movementSpeed: number;
  #sizeRadius: number;
  #color: string;
  constructor({
    name,
    initialPosition,
    movementSpeed = DEFAULT_PLAYER_CONSTS.movementSpeed,
    sizeRadius = DEFAULT_PLAYER_CONSTS.sizeRadius,
    color = "#0000FF",
  }: PlayerContructorProps) {
    this.#id = uuid();
    this.#name = name;
    this.#position = initialPosition;
    this.#movementSpeed = movementSpeed;
    this.#sizeRadius = sizeRadius;
    this.#color = color;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  set position(position: Position) {
    this.#position = position;
  }

  get movementSpeed() {
    return this.#movementSpeed;
  }

  set movementSpeed(movementSpeed: number) {
    this.#movementSpeed = movementSpeed;
  }

  get id() {
    return this.#id;
  }

  get sizeRadius() {
    return this.#sizeRadius;
  }

  get color() {
    return this.#color;
  }

  move(vector: Vector2, deltaTime: number) {
    this.#position.x += vector[0] * this.#movementSpeed * deltaTime;
    this.#position.y += vector[1] * this.#movementSpeed * deltaTime;
  }
}
