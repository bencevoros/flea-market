import Database, { Repository } from '../../shared/database/database';

export interface Model<T> {
  repository: Repository<T>;
  create: (object: T) => Promise<T>;
  read: () => Promise<T[]>;
  delete: (id: number) => Promise<void>;
  update: (object: T) => Promise<T>;
}
 
class CRUDModel<T> implements Model<T> {
  repository: Repository<T>;

  constructor(entity: string) {
    new Database().connect().then((connection) => {
      this.repository = connection.getRepository(entity);
    });
  }

  public async create (body: T): Promise<T> {
    return await this.repository.save(body);
  }

  public async read (): Promise<T[]> {
    return await this.repository.find();
  }

  public async findById (id: number): Promise<T> {
    return await this.repository.findOne(id);
  }

  public async update (updates: T): Promise<T> {
    return await this.repository.save(updates);
  }

  public async delete (id: number): Promise<void> {
    const entityToRemove = await this.repository.findOne(id);

    await this.repository.remove(entityToRemove);
  }
}

export default CRUDModel;
