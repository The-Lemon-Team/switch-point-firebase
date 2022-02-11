import { IPointGroup } from '../../../interfaces';

export const createNewGroup = ({
  points = [],
  description = '',
  name = '',
}: Omit<Partial<IPointGroup>, 'id'>): Omit<IPointGroup, 'id'> => ({
  points,
  description,
  name,
});
