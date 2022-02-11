import React, { useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import { connect } from 'react-redux';

import { boardActions } from '../../../../store/board';
import { Point } from '../../components';
import { useFirebaseApi } from '../../../firebase/useFirebaseApi';

import { IPoint, IPointGroup } from '../../../../interfaces';

interface IPointContainerProps {
  disabled: boolean;
  index: number;
  isEditMode: boolean;
  togglePoint?: (payload: {
    id: IPoint['id'];
    groupId: IPointGroup['id'];
    isActive: boolean;
  }) => void;
  deletePoint?: () => void;
}

export const PointContainerPure = ({
  deletePoint,
  index,
  ...props
}: IPointContainerProps) => {
  const form = useFormikContext<IPointGroup>();
  const { togglePoint } = useFirebaseApi();
  const [pointField] = useField<IPoint>(`points.${index}`);
  const pointData = pointField.value;
  const handleOnPointToggle = useCallback(() => {
    togglePoint &&
      togglePoint({
        ...pointData,
        id: pointData.id,
        // groupId: pointData.pointGroupId,
        isActive: !pointData.isActive,
      });
  }, [togglePoint, pointData]);
  const handleOnPointDelete = useCallback(() => {
    deletePoint && deletePoint();
  }, [deletePoint, pointData]);

  return (
    <Point
      index={index}
      onPointToggle={handleOnPointToggle}
      onPointDelete={handleOnPointDelete}
      onSubmit={form.submitForm}
      {...props}
    />
  );
};

const mapDispatchToProps = {
  togglePoint: boardActions.toggleActivePoint,
};

export const PointContainer = connect(
  null,
  mapDispatchToProps,
)(PointContainerPure);
