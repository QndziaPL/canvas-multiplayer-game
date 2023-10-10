import Player from "../../Player.ts";
import { Position } from "../GameState.ts";
import Projectile from "../../Projectile.ts";

export const renderPlayers = (ctx: CanvasRenderingContext2D, players: Player[]) => {
  players.forEach(({ position, sizeRadius, name, color }) => {
    const { x, y } = centerPositionBasedOnSize(position, sizeRadius);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, sizeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fillText(name, x + sizeRadius, y + sizeRadius);
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

export const renderProjectiles = (ctx: CanvasRenderingContext2D, projectiles: Projectile[]) => {
  projectiles.forEach(({ position }) => {
    const sizeRadius = 5;
    const { x, y } = centerPositionBasedOnSize(position, sizeRadius);

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, sizeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  });
};
