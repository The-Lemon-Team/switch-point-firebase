import { IPointGroup } from '../../../interfaces';
import { IPoint } from '../../../interfaces';

export interface IFirebaseApi {
  pointGroups: IPointGroup[];
  loading: boolean;
  error: Error | undefined;

  togglePoint: (payload: IPoint) => void;
  createPointGroup: (pointGroupData: Partial<IPointGroup>) => void;
  deletePointGroup: (pointGroupId: string) => void;
  updatePointGroup: (pointGroup: IPointGroup) => void;
}
