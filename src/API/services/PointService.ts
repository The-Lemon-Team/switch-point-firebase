import { IPoint } from '../../interfaces';
import { IPointService, IAuthTransport } from '../interfaces';

export class PointService implements IPointService {
  private _httpTransport: IAuthTransport;

  constructor(httpTransport: IAuthTransport) {
    this._httpTransport = httpTransport;
  }

  toggleIsActive = (id: string, isActive: boolean): Promise<IPoint> => {
    return this._httpTransport.put<IPoint>(`/api/point/${id}/setStatus`, {
      isActive,
    });
  };
}
