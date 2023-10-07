import Player from "../Player.ts";
import { renderFPS, renderPlayers } from "./helpers/render.ts";
import PlayerInput from "../PlayerInput/PlayerInput.ts";

export type Vector2 = [number, number];

export type Position = {
  x: number;
  y: number;
};

export type GameStateConstructorProps = {
  canvasRef: HTMLCanvasElement;
  playerInput: PlayerInput;
};

export default class GameState {
  #players: Player[] = [new Player({ name: "jureczek", initialPosition: { x: 300, y: 300 } })];
  #lastFrameTime: number;
  #deltaTime = 0;
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #playerInput: PlayerInput;
  #frameCount = 0;
  #fps = 0;
  #lastFrameTimeForFPS = 0;

  constructor({ canvasRef, playerInput }: GameStateConstructorProps) {
    this.#lastFrameTime = performance.now();
    this.#canvas = canvasRef;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) throw new Error("Couldn't get context2d from canvasRef");
    this.#ctx = ctx;
    this.#playerInput = playerInput;
  }

  tick() {
    this.#frameCount++;
    const currentTime = performance.now();

    if (currentTime - this.#lastFrameTimeForFPS >= 1000) {
      this.#fps = this.#frameCount;
      this.#frameCount = 0;
      this.#lastFrameTimeForFPS = currentTime;
    }

    this.#deltaTime = (currentTime - this.#lastFrameTime) / 1000;
    this.#lastFrameTime = currentTime;

    this.update();
  }

  update() {
    this.#checkInput();
    this.#render();
  }

  #render() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    renderPlayers(this.#players, this.#ctx);
    renderFPS(this.#ctx, this.#fps);
  }

  #checkInput() {
    const direction = this.#playerInput.direction;
    this.movePlayer(this.#players[0].id, direction);
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
