import { IAuthTransport, IPointGroupService } from '../interfaces';
import { IPointGroup } from '../../interfaces';

export class PointGroupService implements IPointGroupService {
  private _httpTransport: IAuthTransport;

  constructor(httpTransport: IAuthTransport) {
    this._httpTransport = httpTransport;
  }

  createGroup = (
    createPayload: Omit<IPointGroup, 'id'>,
  ): Promise<IPointGroup> => {
    return this._httpTransport.post<IPointGroup>(
      '/api/point-groups',
      createPayload,
    );
  };

  deleteGroup = (id: string): Promise<void> => {
    return this._httpTransport.delete(`/api/point-groups/${id}`);
  };

  updateGroup = ({ id, ...payload }: IPointGroup): Promise<IPointGroup> => {
    return this._httpTransport.put<IPointGroup>(
      `/api/point-groups/${id}`,
      payload,
    );
  };

  getGroups = (): Promise<IPointGroup[]> => {
    return this._httpTransport.get('/api/point-groups');
  };
}
