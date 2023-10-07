import { Vector2 } from "../classes/GameState/GameState.ts";

export const normalizeVector = (vector: Vector2) => {
  const highestValue = getHighestValue(vector);
  return vector.map((value) => value / highestValue);
};

const getHighestValue = (array: number[]) => Math.max(...array);
