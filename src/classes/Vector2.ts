export default class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const length = this.length;
    return new Vector2(this.x / length, this.y / length);
  }

  dot(vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  distanceFromPoint(point: Vector2): number {
    const distance = this.subtract(point);
    return distance.length;
  }

  isZero() {
    return this.x === 0 && this.y === 0;
  }
}
