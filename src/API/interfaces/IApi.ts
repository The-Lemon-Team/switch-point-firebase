import { IAuthTransport } from './IAuthTransport';
import { IPointService } from './IPointService';
import { IPointGroupService } from './IPointGroupService';

export interface IApi {
  authTransport: IAuthTransport;
  pointService: IPointService;
  pointGroupService: IPointGroupService;
}
