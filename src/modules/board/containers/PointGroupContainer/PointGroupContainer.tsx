import React, { useCallback, useRef } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { connect } from 'react-redux';

import { useGroupFormHelpers } from '../../helpers';
import { boardActions, selectIsLoading } from '../../../../store/board';
import { PointGroup } from '../../components';

import {
  IPointGroup,
  IPointGroupForm,
  IStoreState,
} from '../../../../interfaces';
import { useFirebaseApi } from '../../../firebase/useFirebaseApi';

export interface IPointGroupContainerProps extends IPointGroup {
  isEditMode: boolean;
  isLoading: boolean;
  resetEditMode: () => void;

  applyChanges?: (group: IPointGroup) => void;
  deleteGroup: (groupId: IPointGroup['id']) => void;
  setEditMode: (groupId: IPointGroup['id']) => void;
}

export const PointGroupContainerPure = ({
  description,
  id,
  isEditMode,
  isLoading,
  name,
  points,
  resetEditMode,
  setEditMode,

  ...props
}: IPointGroupContainerProps) => {
  const formikRef = useRef<FormikProps<IPointGroupForm>>(null);
  const { addNewPoint } = useGroupFormHelpers(formikRef);
  const { deletePointGroup, updatePointGroup } = useFirebaseApi();

  const handleDeleteGroup = useCallback(() => {
    deletePointGroup(id);
  }, [deletePointGroup, id]);
  const handleSetEditMode = useCallback(() => {
    setEditMode && setEditMode(id);
  }, [id, setEditMode]);
  const handleSubmit = useCallback(
    (values) => {
      resetEditMode();
      updatePointGroup && updatePointGroup({ ...values, id });
    },
    [updatePointGroup, resetEditMode],
  );
  const handleOnAddPoint = useCallback(() => {
    handleSetEditMode();
    addNewPoint();
  }, [handleSetEditMode, addNewPoint]);

  return (
    <Formik<IPointGroupForm>
      initialValues={{ name, description, points: points || [] }}
      onSubmit={handleSubmit}
      innerRef={formikRef}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <PointGroup
            {...props}
            isEditMode={isEditMode}
            applyChanges={handleSubmit}
            onAddPoint={handleOnAddPoint}
            onEdit={handleSetEditMode}
            disabled={isLoading}
            onDelete={handleDeleteGroup}
          />
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = {
  applyChanges: boardActions.updateGroupRequest,
  deleteGroup: boardActions.deleteGroup,
  resetEditMode: boardActions.resetEditMode,
  setEditMode: boardActions.setEditMode,
};

const mapStateToProps = (state: IStoreState) => ({
  isLoading: selectIsLoading(state),
});

export const PointGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PointGroupContainerPure);
