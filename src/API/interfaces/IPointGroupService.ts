import { ICreateGroupRequestDto } from '../dto';
import { IPointGroup } from '../../interfaces';

export interface IPointGroupService {
  createGroup(payload: ICreateGroupRequestDto): Promise<IPointGroup>;
  deleteGroup(id: string): Promise<void>;
  updateGroup(payload: IPointGroup): Promise<IPointGroup>;
  getGroups(): Promise<IPointGroup[]>;
}
