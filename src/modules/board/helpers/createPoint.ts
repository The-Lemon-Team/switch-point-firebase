import { IPointGroupCreate } from '../../../interfaces';

interface CreatePoint {
  name: string;
}

export const createPoint = ({ name }: CreatePoint): IPointGroupCreate => ({
  name,
});
