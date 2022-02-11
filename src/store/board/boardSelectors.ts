import { createSelector } from 'reselect';

import { IStoreState } from '../../interfaces';

export const selectBoardSlice = (state: IStoreState) => state.board;
export const selectEditId = createSelector(
  selectBoardSlice,
  (board) => board.editMode,
);
export const selectLists = createSelector(
  selectBoardSlice,
  (board) => board.lists,
);
export const selectListsCompleted = createSelector(
  selectLists,
  (board) => board.completed,
);
export const selectListsLoading = createSelector(
  selectLists,
  (board) => board.completed,
);
export const selectListsData = createSelector(
  selectLists,
  (listSlice) => listSlice.data,
);
export const selectGroup = (groupId: string) =>
  createSelector(selectListsData, (groups) =>
    groups.find((group) => group.id == groupId),
  );
export const selectIsLoading = createSelector(
  selectLists,
  (board) => board.isLoading,
);
export const selectPointGroups = createSelector(
  selectLists,
  (board) => board.data,
);

export const selectPoint = (groupId: string, pointId: string) =>
  createSelector(selectGroup(groupId), (group) =>
    group?.points.find((point) => point.id === pointId),
  );
