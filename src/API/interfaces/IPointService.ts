import { IPoint } from '../../interfaces';

export interface IPointService {
  toggleIsActive(id: string, isActive: boolean): Promise<IPoint>;
}
