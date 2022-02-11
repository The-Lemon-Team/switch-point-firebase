import { createAction, createAsyncAction } from 'typesafe-actions';

import { IPoint, IPointGroup } from '../../interfaces';

import {
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_COMPLETED,
  CREATE_GROUP_FAILURE,
  DELETE_GROUP,
  FETCH_GROUPS_COMPLETED,
  FETCH_GROUPS_FAILURE,
  FETCH_GROUPS_REQUEST,
  RESET_EDIT_MODE,
  SET_EDIT_MODE,
  SET_GROUP,
  SET_POINT,
  TOGGLE_ACTIVE_POINT,
  UPDATE_GROUP_COMPLETED,
  UPDATE_GROUP_FAILURE,
  UPDATE_GROUP_REQUEST,
  PUSH_GROUP,
  INSERT_TO_GROUP,
} from './constants';

interface IInsertToGroupPayload {
  initialGroup: IPointGroup;
  swapGroup: IPointGroup;
}

const createGroup = createAsyncAction(
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_COMPLETED,
  CREATE_GROUP_FAILURE,
)<Omit<IPointGroup, 'id'>, IInsertToGroupPayload, undefined>();
const fetchGroups = createAsyncAction(
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_COMPLETED,
  FETCH_GROUPS_FAILURE,
)<undefined, IPointGroup[], undefined>();
const updateGroup = createAsyncAction(
  UPDATE_GROUP_REQUEST,
  UPDATE_GROUP_COMPLETED,
  UPDATE_GROUP_FAILURE,
)<IPointGroup, IPointGroup, undefined>();
const deleteGroup = createAction(DELETE_GROUP, (id: string) => ({
  id,
}))<{
  id: string;
}>();
const pushGroup = createAction(PUSH_GROUP)<IPointGroup>();
const setGroup = createAction(SET_GROUP)<IPointGroup>();
const setEditMode = createAction(SET_EDIT_MODE, (id: string) => ({ id }))<{
  id: string;
}>();
const resetEditMode = createAction(RESET_EDIT_MODE)();
const toggleActivePoint = createAction(TOGGLE_ACTIVE_POINT)<{
  id: string;
  groupId: string;
  isActive: boolean;
}>();
const setPoint = createAction(
  SET_POINT,
  (payload: IPoint) => payload,
)<IPoint>();
const insertToGroup = createAction(
  INSERT_TO_GROUP,
  (initialGroup: IPointGroup, swapGroup: IPointGroup) => ({
    initialGroup,
    swapGroup,
  }),
)<IInsertToGroupPayload>();

export const boardActions = {
  createGroupCompleted: createGroup.success,
  createGroupFailure: createGroup.failure,
  createGroupRequest: createGroup.request,
  deleteGroup,
  insertToGroup,
  fetchGroupsCompleted: fetchGroups.success,
  fetchGroupsFailure: fetchGroups.failure,
  fetchGroupsRequest: fetchGroups.request,
  pushGroup,
  resetEditMode,
  setEditMode,
  setGroup,
  setPoint,
  toggleActivePoint,
  updateGroupCompleted: updateGroup.success,
  updateGroupFailure: updateGroup.failure,
  updateGroupRequest: updateGroup.request,
};
