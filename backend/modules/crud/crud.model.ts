export interface Model<T> {
  create: (Sample) => T;
  read: () => T;
  delete: (Number) => boolean;
  update: (Sample) => T;
}

class CRUDModel<T> implements Model<T> {
  public create (body: T) {
    const response: T = { ...body, id: 1};
    return response;
  }

  public read (): T {
    const response: T = { title: 'Hello world!', message: 'It works, so this is a message', id: 0 } as unknown as T;
    return response;
  }

  public findById (id: number): T {
    const response: T = { title: 'Hello world!', message: 'It works, so this is a message', id } as unknown as T;
    return response;
  }

  public update (updates: T) {
    return updates;
  }

  public delete (id: number) {
    const rand = Math.random() * 10;
    if (rand < 5) {
      return true;
    }

    return false;
  }
}

export default CRUDModel;
