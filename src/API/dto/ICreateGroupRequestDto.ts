import { IPointGroup } from '../../interfaces';

export type ICreateGroupRequestDto = Omit<IPointGroup, 'id'>;
