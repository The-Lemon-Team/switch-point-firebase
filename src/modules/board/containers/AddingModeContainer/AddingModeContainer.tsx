import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import {
  selectIsLoading,
  selectEditId,
  boardActions,
} from '../../../../store/board';
import { AddingMode } from '../../components';
import { useFirebaseApi } from '../../../firebase/useFirebaseApi';

import { IPointGroup, IStoreState } from '../../../../interfaces';

interface IAddingModeContainerProps {
  isLoading: boolean;
  editModeId: null | string;

  createGroup: (payload: Omit<IPointGroup, 'id'>) => void;
  onClose: () => void;
}

export const AddingModeContainerPure = ({
  isLoading,
  editModeId,
  createGroup,
  onClose,
}: IAddingModeContainerProps) => {
  const { createPointGroup } = useFirebaseApi();
  const handleCreateGroup = useCallback(
    (payload) => {
      createPointGroup(payload);
      onClose();
    },
    [onClose, createGroup],
  );

  return (
    <AddingMode
      createGroup={handleCreateGroup}
      isLoading={isLoading}
      editModeId={editModeId}
      onDelete={onClose}
    />
  );
};

const mapStateToProps = (state: IStoreState) => ({
  editModeId: selectEditId(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = {
  createGroup: boardActions.createGroupRequest,
};

export const AddingModeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddingModeContainerPure);
