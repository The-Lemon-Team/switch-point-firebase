import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { BoardState } from './interfaces';

import { boardActions } from './boardActions';
import { IPointGroup } from '../../interfaces';

const initialState: BoardState = {
  editMode: null,
  lists: {
    isLoading: false,
    completed: false,
    error: false,
    data: [],
  },
};

const editModeReducer = createReducer(initialState.editMode)
  .handleAction(boardActions.setEditMode, (state, action) => action.payload.id)
  .handleAction(boardActions.resetEditMode, () => initialState.editMode);

const listsReducer = combineReducers({
  data: createReducer(initialState.lists.data)
    .handleAction(
      boardActions.fetchGroupsCompleted,
      (state, action) => action.payload,
    )
    .handleAction(boardActions.deleteGroup, (state, { payload }) =>
      state.filter((group) => group.id !== payload.id),
    )
    .handleAction(boardActions.setGroup, (state, action) =>
      state.map((group) =>
        group.id === action.payload.id ? action.payload : group,
      ),
    )
    .handleAction(boardActions.pushGroup, (state, action) => [
      ...state,
      action.payload,
    ])
    .handleAction(
      [boardActions.insertToGroup, boardActions.createGroupCompleted],
      (state, { payload }) => {
        return state.reduce((acc, cur) => {
          if (cur.id === payload.initialGroup.id) {
            return [...acc, payload.swapGroup];
          }

          return [...acc, cur];
        }, [] as IPointGroup[]);
      },
    )
    .handleAction(boardActions.toggleActivePoint, (state, { payload }) =>
      state.map((group) => {
        if (group.id === payload.groupId) {
          return {
            ...group,
            points: group.points.map((point) =>
              point.id === payload.id
                ? { ...point, isActive: payload.isActive }
                : point,
            ),
          };
        }

        return group;
      }),
    ),
  isLoading: createReducer(initialState.lists.isLoading)
    .handleAction(boardActions.fetchGroupsCompleted, () => false)
    .handleAction(boardActions.createGroupCompleted, () => false)
    .handleAction(boardActions.createGroupRequest, () => true)
    .handleAction(boardActions.fetchGroupsRequest, () => true),
  completed: createReducer(initialState.lists.completed),
  error: createReducer(initialState.lists.error).handleAction(
    boardActions.fetchGroupsFailure,
    () => true,
  ),
});

export const boardReducer = combineReducers({
  editMode: editModeReducer,
  lists: listsReducer,
});
