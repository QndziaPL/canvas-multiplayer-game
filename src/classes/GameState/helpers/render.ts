import Player from "../../Player.ts";
import Projectile from "../../Projectile.ts";
import Vector2 from "../../Vector2.ts";
import GameState from "../GameState.ts";
import { Drawable } from "../../types/gameObjectTypes.ts";

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
    ctx.beginPath();
    ctx.arc(position.x, position.y, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  });
};

export const centerPositionBasedOnSize = (position: Vector2, sizeRadius: number): Vector2 =>
  new Vector2({
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

const NUMBER_OF_RAYS = 50;

export const calculateFlashlightPoints = (
  playerPosition: Vector2,
  mousePosition: Vector2,
  flashlightRadius: number,
  flashlightAngle: number,
  drawables: Drawable[],
) => {
  const angleIncrement = flashlightAngle / NUMBER_OF_RAYS;
  const flashlightPoints: Vector2[] = [];

  // for (let i = 0; i <= 1; i++) {
  for (let i = -NUMBER_OF_RAYS; i <= NUMBER_OF_RAYS; i++) {
    const currentAngle =
      Math.atan2(mousePosition.y - playerPosition.y, mousePosition.x - playerPosition.x) + i * angleIncrement;

    const rayDirectionX = Math.cos(currentAngle);
    const rayDirectionY = Math.sin(currentAngle);

    const endX = playerPosition.x + rayDirectionX * flashlightRadius;
    const endY = playerPosition.y + rayDirectionY * flashlightRadius;

    // let collided = false;

    const intersectionPointsOfAllObjects: Vector2[] = [];
    for (let drawableIndex = 0; drawableIndex < drawables.length; drawableIndex++) {
      const obstacle = drawables[drawableIndex];
      const intersectionPoint = obstacle.closestCollisionPoint(playerPosition.clone(), new Vector2(endX, endY));

      if (intersectionPoint) {
        // collided = true;
        // flashlightPoints.push(intersectionPoint);
        intersectionPointsOfAllObjects.push(intersectionPoint);
        // break;
      }
    }
    if (!intersectionPointsOfAllObjects.length) {
      flashlightPoints.push(new Vector2(endX, endY));
    }

    const closestIntersectionPoint = Vector2.ClosestPoint(playerPosition, intersectionPointsOfAllObjects);
    if (closestIntersectionPoint) {
      flashlightPoints.push(closestIntersectionPoint);
    }
  }

  return flashlightPoints;
};

export const renderFlashlight = (gameState: GameState) => {
  const playerPosition = gameState.players[0].position.clone();
  const flashlightPoints = calculateFlashlightPoints(
    playerPosition,
    gameState.playerInput.mouse.position,
    700,
    Math.PI / 6,
    gameState.environment.drawables,
  );

  // gameState.ctx.save();
  // gameState.ctx.globalCompositeOperation = "destination-out";

  // gameState.ctx.fillStyle = "rgba(255,251,174,1)";
  gameState.ctx.fillStyle = "rgba(255,251,174,0.9)";
  gameState.ctx.beginPath();
  gameState.ctx.moveTo(playerPosition.x, playerPosition.y);

  for (let i = 0; i < flashlightPoints.length; i++) {
    const { x, y } = flashlightPoints[i];
    gameState.ctx.lineTo(x, y);
  }

  gameState.ctx.closePath();
  gameState.ctx.fill();
  // gameState.ctx.globalCompositeOperation = "source-over";
  // gameState.ctx.restore();

  // gameState.ctx.beginPath();
  // for (let i = 0; i < flashlightPoints.length; i++) {
  //   const { x, y } = flashlightPoints[i];
  //   gameState.ctx.arc(x, y, 2, 0, Math.PI * 2);
  // }
  // gameState.ctx.stroke();
};
