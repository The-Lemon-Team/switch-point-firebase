import React from 'react';
import { Avatar } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo';

import styles from './EditAvatar.module.css';

export const EditAvatar = () => {
  return (
    <Avatar variant="rounded" className={styles.avatar}>
      <div className={styles.overlay}>
        <PhotoIcon className={styles.icon} />
      </div>
      <span>I</span>
    </Avatar>
  );
};
