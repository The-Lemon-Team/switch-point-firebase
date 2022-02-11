import React from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';

import { EditAvatar } from '../EditAvatar';

interface IAvatarProps {
  isEditMode: boolean;
  onAvatarUpdate?: () => void;
}

export const Avatar = ({ isEditMode }: IAvatarProps) => {
  return isEditMode ? (
    <EditAvatar />
  ) : (
    <MaterialAvatar variant="rounded">I</MaterialAvatar>
  );
};
