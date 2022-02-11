import React from 'react';
import { FieldArray } from 'formik';

import { PointContainer } from '../../containers';

import styles from './Points.module.css';

import { IPoint } from '../../../../interfaces';

export interface IPointsProps {
  disabled: boolean;
  isEditMode: boolean;
}

export const Points: React.FC<IPointsProps> = ({ disabled, isEditMode }) => {
  return (
    <FieldArray name="points">
      {({ remove, form }) => {
        const points: IPoint[] = (form.values.points || []) as IPoint[];

        return points.map((point, index) => (
          <div className={styles.point} key={point.id || `new-${index}`}>
            <PointContainer
              key={point.id || `new-${index}`}
              disabled={disabled}
              index={index}
              isEditMode={isEditMode}
              deletePoint={() => remove(index)}
            />
          </div>
        ));
      }}
    </FieldArray>
  );
};
