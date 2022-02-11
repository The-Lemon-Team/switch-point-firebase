import React from 'react';
import { connect } from 'react-redux';

import { boardActions, selectEditId } from '../../../../store/board';
import { Board } from '../../components';

import { IStoreState } from '../../../../interfaces';
import { useFirebaseApi } from '../../../firebase/useFirebaseApi';

interface IBoardContainerPureProps {
  editId: string | null;
  setEditMode: (id: string) => void;
  resetEditMode: () => void;
}

export const BoardContainerPure = ({
  editId,
  resetEditMode,
}: IBoardContainerPureProps) => {
  const { pointGroups } = useFirebaseApi();

  return (
    <Board lists={pointGroups} editId={editId} resetEditMode={resetEditMode} />
  );
};

const mapStateToProps = (state: IStoreState) => ({
  editId: selectEditId(state),
});
const mapDispatchToProps = {
  setEditMode: boardActions.setEditMode,
  resetEditMode: boardActions.resetEditMode,
  getGroups: boardActions.fetchGroupsRequest,
};

export const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainerPure);
