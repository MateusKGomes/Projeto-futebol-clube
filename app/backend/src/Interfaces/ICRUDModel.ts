import IUser from './IUser';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDCreator<T> {
  create(data: IUser): Promise<T>
}

export interface ICRUDModel<T>
  extends
  ICRUDModelReader<T>,
  ICRUDCreator<T> {}
