import Player from "../../Player.ts";
import { Position } from "../GameState.ts";

export const renderPlayers = (players: Player[], ctx: CanvasRenderingContext2D) => {
  players.forEach(({ position, sizeRadius, name, color }) => {
    const { x, y } = centerPositionBasedOnSize(position, sizeRadius);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, sizeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  });
};

export const centerPositionBasedOnSize = (position: Position, sizeRadius: number): Position => ({
  x: position.x - sizeRadius / 2,
  y: position.y - sizeRadius / 2,
});

export const renderFPS = (ctx: CanvasRenderingContext2D, fps: number) => {
  const fpsToFixed = Number(fps.toFixed());
  ctx.save();
  ctx.font = "24px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(`FPS: ${fpsToFixed}`, 40, 40);
  ctx.restore();
};