import { ref, update, push, child } from 'firebase/database';
import { useCallback, useMemo } from 'react';
import { useList, useObject } from 'react-firebase-hooks/database';

import { realtimeDatabase } from './firebase';
import { useFirebaseAuth } from './useFirebaseAuth';

import { IPointGroup } from '../../interfaces';
import { IPoint } from '../../interfaces';
import { IFirebaseApi } from './interfaces/IFirebaseApi';

export function useFirebaseApi(): IFirebaseApi {
  const { userData } = useFirebaseAuth();
  const userName = useMemo(() => `${userData?.displayName}` || '', [userData]);
  const userObjRef = ref(realtimeDatabase, userName);
  const refToPointGroups = ref(realtimeDatabase, userName + '/pointGroups');
  const refToPoints = ref(realtimeDatabase, userName + '/points');

  const [pointGroupsSnapshots, loading, error] = useList(refToPointGroups);
  const [pointsSnapshots] = useObject(refToPoints);
  const pointsList = pointsSnapshots?.val() || {};
  const pointGroups = (pointGroupsSnapshots?.map((item) => {
    const points = pointsList[item.key || ''] || [];
    return {
      ...item.val(),
      points: points.map((point: IPoint, index: number) => ({
        ...point,
        id: index,
        pointGroupId: item.key,
      })),
      id: item.key,
    };
  }) || []) as IPointGroup[];
  const createPointGroup = useCallback(
    ({ points = [], ...pointGroup }: Partial<IPointGroup>) => {
      const newGroupRef = push(child(userObjRef, 'pointGroups'));
      const updates = {
        ['pointGroups/' + newGroupRef.key]: pointGroup,
        ['points/' + newGroupRef.key]: points,
      };
      update(userObjRef, updates);
    },
    [userObjRef],
  );
  const updatePointGroup = useCallback(
    ({ id: pointGroupId, ...payload }: IPointGroup) => {
      const updates = {
        ['pointGroups/' + pointGroupId]: payload,
        ['points/' + pointGroupId]: payload.points || [],
      };

      update(userObjRef, updates);
    },
    [pointGroups],
  );
  const deletePointGroup = useCallback(
    (pointGroupId: string) => {
      const updates = {
        ['pointGroups/' + pointGroupId]: null,
        ['points/' + pointGroupId]: null,
      };

      update(userObjRef, updates);
    },
    [pointGroups],
  );
  const togglePoint = useCallback(
    ({ pointGroupId, id, ...payload }: IPoint) => {
      const newPointsRef = ref(
        realtimeDatabase,
        `${userName}/points/${pointGroupId}/${id}`,
      );

      update(newPointsRef, payload);
    },
    [pointGroups],
  );

  return {
    pointGroups,
    loading,
    error,

    togglePoint,
    updatePointGroup,
    deletePointGroup,
    createPointGroup,
  };
}
