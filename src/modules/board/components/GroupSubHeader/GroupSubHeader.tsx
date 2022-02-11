import React, { KeyboardEvent, useCallback } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField, Box, Typography } from '@material-ui/core';

interface IGroupSubHeaderProps {
  disabled: boolean;
  isEditMode: boolean;

  onSubmit: () => void;
}

export const GroupSubHeader = ({
  disabled,
  isEditMode,
  onSubmit,
}: IGroupSubHeaderProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.nativeEvent.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <Field name="description">
      {({ field }: FieldProps<string>) => (
        <Box mt={1}>
          {isEditMode && (
            <TextField
              size="small"
              variant="outlined"
              placeholder="description"
              disabled={disabled}
              inputProps={{
                onKeyDown: handleKeyDown,
              }}
              {...field}
            />
          )}
          {!isEditMode && (
            <Typography variant="h6" component="h4">
              {field.value}
            </Typography>
          )}
        </Box>
      )}
    </Field>
  );
};
