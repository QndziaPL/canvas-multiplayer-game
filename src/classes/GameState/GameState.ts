import Player from "../Player.ts";
import { renderFPS, renderPlayers, renderProjectiles } from "./helpers/render.ts";
import PlayerInput from "../PlayerInput/PlayerInput.ts";
import { FPSDebug, updateFpsDebugVariables } from "./helpers/debug.ts";
import Vector2 from "../Vector2.ts";
import Projectile from "../Projectile.ts";
import { updateProjectiles } from "./helpers/updateProjectiles.ts";

export type XYNumericValues = {
  x: number;
  y: number;
};

export type Position = XYNumericValues;

export type GameStateConstructorProps = {
  canvasRef: HTMLCanvasElement;
  playerInput: PlayerInput;
};

export default class GameState {
  // rendering
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  // time
  #lastFrameTime: number;
  #deltaTime = 0;
  // entities
  #players: Player[] = [new Player({ name: "jureczek", initialPosition: { x: 300, y: 300 } })];
  #projectiles: Projectile[] = [];
  // input
  #playerInput: PlayerInput;
  // fps debug
  fpsDebug: FPSDebug = {
    frameCount: 0,
    fps: 0,
    lastFrameTimeForFPS: 0,
  };

  constructor({ canvasRef, playerInput }: GameStateConstructorProps) {
    this.#lastFrameTime = performance.now();
    this.#canvas = canvasRef;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) throw new Error("Couldn't get context2d from canvasRef");
    this.#ctx = ctx;
    this.#playerInput = playerInput;
  }

  tick() {
    const currentTime = performance.now();

    updateFpsDebugVariables(this.fpsDebug, currentTime);

    this.#deltaTime = (currentTime - this.#lastFrameTime) / 1000;
    this.#lastFrameTime = currentTime;

    this.update();
  }

  update() {
    this.#checkInput();
    this.#render();
    updateProjectiles(this.#projectiles, this.#deltaTime);
  }

  #render() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    renderPlayers(this.#ctx, this.#players);
    renderProjectiles(this.#ctx, this.#projectiles);
    renderFPS(this.#ctx, this.fpsDebug.fps);
  }

  #checkInput() {
    const direction = this.#playerInput.direction;
    if (!direction.isZero()) {
      this.movePlayer(this.#players[0].id, direction);
    }
    if (this.#playerInput.mouse.pressed) {
      const playerPosition = { ...this.#players[0].position };
      const vector = new Vector2(this.#playerInput.mouse.position.x, this.#playerInput.mouse.position.y).subtract(
        new Vector2(playerPosition.x, playerPosition.y),
      );
      const normalized = vector.normalize();
      this.#projectiles.push(new Projectile({ position: playerPosition, velocity: normalized }));
    }
  }

  movePlayer = (id: Player["id"], direction: Vector2): void => {
    this.#players[this.getPlayerIndexById(id)].move(direction, this.#deltaTime);
  };

  getPlayerIndexById = (id: Player["id"]): number => {
    const index = this.#players.findIndex((player) => player.id === id);
    if (index === -1) {
      throw new Error(`Player with ID: ${id} not found`);
    }

    return index;
  };
}
