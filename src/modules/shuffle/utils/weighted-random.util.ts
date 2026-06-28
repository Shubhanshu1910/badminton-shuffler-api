export class WeightedRandomUtil {
  static pick<T>(
    values: T[],
    weights: number[],
  ): T {
    const total =
      weights.reduce(
        (a, b) => a + b,
        0,
      );

    let random =
      Math.random() * total;

    for (let i = 0; i < values.length; i++) {
      random -= weights[i];

      if (random <= 0) {
        return values[i];
      }
    }

    return values[0];
  }
}