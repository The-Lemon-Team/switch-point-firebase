import { HttpTransport } from './httpTransport';
import { AuthTransport } from './authTransport';
import { PointService, PointGroupService } from './services';

export const authTransport = new AuthTransport({
  httpTransport: new HttpTransport(),
  window,
});

export const pointService = new PointService(authTransport);
export const pointGroupService = new PointGroupService(authTransport);
