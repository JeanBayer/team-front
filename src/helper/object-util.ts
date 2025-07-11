export class ObjectUtil {
  public static onlyTruthyValues<T>(object: T) {
    if (typeof object !== "object" || object === null) return object;

    const iterable = Object.entries(object);

    let newObject: T = {} as T;

    for (const [key, value] of iterable) {
      if (!value || value === undefined || value === null) continue;
      newObject = {
        ...newObject,
        [key]: value,
      };
    }

    return newObject;
  }
}
