import React, { useCallback } from 'react';
import { FormikProps } from 'formik';

import { IPointGroupForm } from '../../../interfaces';

import { createPoint } from './createPoint';

export function useGroupFormHelpers(
  formikRef: React.RefObject<FormikProps<IPointGroupForm>>,
) {
  const addNewPoint = useCallback(() => {
    if (formikRef.current) {
      const currentPoints = formikRef.current.values.points || [];
      const pointsHelpers = formikRef.current.getFieldHelpers('points');

      pointsHelpers.setValue([...currentPoints, createPoint({ name: '' })]);
    }
  }, [formikRef]);

  return { addNewPoint };
}
