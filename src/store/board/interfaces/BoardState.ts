import { IPointGroup } from '../../../interfaces';

export interface BoardState {
  editMode: string | null;
  lists: {
    isLoading: boolean;
    completed: boolean;
    error: boolean;
    data: IPointGroup[];
  };
}
