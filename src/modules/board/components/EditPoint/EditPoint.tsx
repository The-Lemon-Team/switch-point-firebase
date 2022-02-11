import React, { KeyboardEvent, useCallback, useEffect } from 'react';
import { TextField, Box, IconButton } from '@material-ui/core';
import { FieldInputProps } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './EditPoint.module.css';

interface IEditPointProps extends FieldInputProps<string> {
  disabled: boolean;

  onSubmit: () => void;
  onPointDelete?: () => void;
}

export const EditPoint = ({
  onPointDelete,
  disabled,
  onSubmit,
  ...fieldProps
}: IEditPointProps) => {
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.nativeEvent.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  useEffect(() => {
    if (!fieldProps.value && fieldRef.current) {
      fieldRef.current.focus();
    }
  }, [fieldRef]);

  return (
    <Box className={styles.root}>
      <TextField
        size="small"
        variant="outlined"
        fullWidth
        disabled={disabled}
        inputRef={fieldRef}
        inputProps={{
          onKeyDown: handleKeyDown,
        }}
        {...fieldProps}
      />
      <IconButton
        aria-label="delete"
        onClick={onPointDelete}
        disabled={disabled}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
