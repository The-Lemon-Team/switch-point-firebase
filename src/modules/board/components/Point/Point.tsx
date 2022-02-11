import React from 'react';
import { Button } from '@material-ui/core';
import AdjustIcon from '@material-ui/icons/Adjust';
import { useField } from 'formik';

import { EditPoint } from '../EditPoint';

export interface IPointProps {
  disabled: boolean;
  index: number;
  isEditMode: boolean;

  onSubmit: () => void;
  onPointToggle: () => void;
  onPointDelete: () => void;
}

export const Point = ({
  disabled,
  index,
  isEditMode,
  onPointDelete,
  onPointToggle,
  onSubmit,
}: IPointProps) => {
  const [nameField] = useField<string>(`points.${index}.name`);
  const [isActiveField] = useField<boolean>(`points.${index}.isActive`);

  return isEditMode ? (
    <EditPoint
      disabled={disabled}
      onSubmit={onSubmit}
      onPointDelete={onPointDelete}
      {...nameField}
    />
  ) : (
    <Button
      variant="contained"
      disabled={disabled}
      color={isActiveField.value ? 'primary' : 'default'}
      startIcon={<AdjustIcon />}
      onClick={onPointToggle}
    >
      {nameField.value}
    </Button>
  );
};
