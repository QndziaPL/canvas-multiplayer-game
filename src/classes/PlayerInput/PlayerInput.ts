import Vector2 from "../Vector2.ts";

export type MouseInput = {
  pressed: boolean;
  position: Vector2;
};
export default class PlayerInput {
  #keysPressed: Set<string> = new Set();
  #mouse: MouseInput = {
    pressed: false,
    position: new Vector2({
      x: 0,
      y: 0,
    }),
  };
  constructor() {
    addEventListener("keydown", this.#handleOnKey("keydown"));
    addEventListener("keyup", this.#handleOnKey("keyup"));
    addEventListener("mousedown", this.#handleOnMouse("mousedown"));
    addEventListener("mouseup", this.#handleOnMouse("mouseup"));
    addEventListener("mousemove", this.#handleOnMouse("mousemove"));
  }

  #handleOnKey = (state: "keydown" | "keyup") => (event: KeyboardEvent) => {
    switch (state) {
      case "keydown":
        this.#keysPressed.add(event.key);
        break;
      case "keyup":
        this.#keysPressed.delete(event.key);
        break;
    }
  };

  #handleOnMouse = (state: "mousedown" | "mouseup" | "mousemove") => (event: MouseEvent) => {
    switch (state) {
      case "mousedown":
        this.#mouse.pressed = true;
        break;
      case "mouseup":
        this.#mouse.pressed = false;
        break;
      case "mousemove":
        this.#mouse.position = new Vector2({ x: event.clientX, y: event.clientY });
        break;
    }
  };

  get mouse() {
    return this.#mouse;
  }

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

  get direction(): Vector2 {
    return new Vector2(this.#leftPressed() + this.#rightPressed(), this.#upPressed() + this.#downPressed());
  }
}
