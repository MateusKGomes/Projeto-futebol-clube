import IMatches from './matches/IMatches';
import IUser from './user/IUser';

export interface ICRUDMatchesModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
  findProgressMatches(q: boolean): Promise<T[]>,
  finishMatches(id: IMatches['id'], body: IMatches): Promise<T | null>
}

export interface ICRUDTeamModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}
export interface ICRUDCreator<T> {
  create(data: IUser): Promise<T>
}

export interface ICRUDModel<T>
  extends
  ICRUDTeamModelReader<T>,
  ICRUDCreator<T> {}
