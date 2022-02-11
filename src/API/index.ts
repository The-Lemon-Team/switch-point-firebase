import { authTransport, pointService, pointGroupService } from './entities';
import { IApi } from './interfaces';
export * from './interfaces';

export const api: IApi = { authTransport, pointService, pointGroupService };
