export abstract class AbstractDto {
  constructor(data?: any) {
    for (const key in data) {
      this[key] = data[key];
    }
  }

  abstract getEntity();

  static createFromEntities(entity: any, options: any) {
    throw new Error('method not implemented');
  }
}
