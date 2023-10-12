import Player from "../Player.ts";
import { renderFlashlight, renderFPS, renderPlayers, renderProjectiles } from "./helpers/render.ts";
import PlayerInput from "../PlayerInput/PlayerInput.ts";
import { FPSDebug, updateFpsDebugVariables } from "./helpers/debug.ts";
import Vector2 from "../Vector2.ts";
import Projectile from "../Projectile.ts";
import { updateProjectiles } from "./helpers/updateProjectiles.ts";
import Environment from "../Environment/Environment.ts";
import { checkProjectileCollisions } from "./helpers/checkProjectileCollisions.ts";
import { shoot } from "./helpers/shoot.ts";

export type XYNumericValues = { x: number; y: number };

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
  #players: Player[] = [new Player({ name: "jureczek", initialPosition: new Vector2({ x: 300, y: 300 }) })];
  #projectiles: Projectile[] = [];
  #environment: Environment;
  // input
  #playerInput: PlayerInput;
  // fps debug
  fpsDebug: FPSDebug = {
    frameCount: 0,
    fps: 0,
    lastFrameTimeForFPS: 0,
  };

  constructor({ canvasRef, playerInput }: GameStateConstructorProps) {
    this.#canvas = canvasRef;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) throw new Error("Couldn't get context2d from canvasRef");
    this.#ctx = ctx;

    this.#lastFrameTime = performance.now();
    this.#playerInput = playerInput;

    this.#environment = new Environment();
  }

  get environment() {
    return this.#environment;
  }

  tick() {
    const currentTime = performance.now();

    updateFpsDebugVariables(this.fpsDebug, currentTime);

    this.#deltaTime = (currentTime - this.#lastFrameTime) / 1000;
    this.#lastFrameTime = currentTime;

    this.update();
  }

  update() {
    checkProjectileCollisions(this.#projectiles, this.#environment);
    this.#checkInput();
    this.#render();
    updateProjectiles(this.#projectiles, this.#deltaTime);
  }

  #render() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    renderPlayers(this.#ctx, this.#players);
    renderProjectiles(this.#ctx, this.#projectiles);
    this.#environment.drawEnvironment(this.#ctx);
    renderFlashlight(this);

    renderFPS(this.#ctx, this.fpsDebug.fps);
  }

  #checkInput() {
    const direction = this.#playerInput.direction;

    if (!direction.isZero()) {
      this.movePlayer(this.#players[0].id, direction);
    }

    if (this.#playerInput.mouse.pressed) {
      shoot(this);
    }
  }

  get ctx() {
    return this.#ctx;
  }

  get playerInput() {
    return this.#playerInput;
  }

  get players() {
    return this.#players;
  }

  addProjectile(projectile: Projectile) {
    this.#projectiles.push(projectile);
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
