import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

interface IGroupBoxProps extends BoxProps {
  isEditMode: boolean;
}

export const GroupBox: React.FC<IGroupBoxProps> = ({
  isEditMode,
  children,
  ...props
}) => {
  return (
    <Box boxShadow={isEditMode ? 3 : 0} {...props}>
      {children}
    </Box>
  );
};
