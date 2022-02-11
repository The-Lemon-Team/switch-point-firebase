import { IPoint } from './Point';

export interface IPointGroup {
  id: string;
  name: string;
  description: string;
  points: IPoint[];
}

export type IPointGroupCreate = Omit<
  IPointGroup,
  'id' | 'description' | 'points'
>;
