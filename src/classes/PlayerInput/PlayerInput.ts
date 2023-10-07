import { Vector2 } from "../GameState/GameState.ts";

export default class PlayerInput {
  #keysPressed: Set<string> = new Set();
  constructor() {
    addEventListener("keydown", this.#handleOnKey("down"));
    addEventListener("keyup", this.#handleOnKey("up"));
  }

  #handleOnKey = (state: "down" | "up") => (event: KeyboardEvent) => {
    switch (state) {
      case "down":
        this.#keysPressed.add(event.key);
        break;
      case "up":
        this.#keysPressed.delete(event.key);
        break;
    }
  };

  get keysPressed() {
    return this.#keysPressed;
  }

  #upPressed(): 0 | -1 {
    return this.#keysPressed.has("w") ? -1 : 0;
  }

  #downPressed(): 0 | 1 {
    return this.#keysPressed.has("s") ? 1 : 0;
  }

  #leftPressed(): 0 | -1 {
    return this.#keysPressed.has("a") ? -1 : 0;
  }

  #rightPressed(): 0 | 1 {
    return this.#keysPressed.has("d") ? 1 : 0;
  }

  // get up() {
  //   return this.#upPressed() && !this.#downPressed();
  // }
  //
  // get down() {
  //   return !this.#upPressed() && this.#downPressed();
  // }
  //
  // get left() {
  //   return this.#leftPressed() && !this.#rightPressed();
  // }
  //
  // get right() {
  //   return !this.#leftPressed() && this.#rightPressed();
  // }

  get direction(): Vector2 {
    return [this.#leftPressed() + this.#rightPressed(), this.#upPressed() + this.#downPressed()];
  }
}
