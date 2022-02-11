import React, { useCallback, useState } from 'react';
import { Button } from '@material-ui/core';

import { AddingModeContainer, PointGroupContainer } from '../../containers';

import styles from './Board.module.css';

import { IPointGroup } from '../../../../interfaces';

interface IBoardProps {
  lists: IPointGroup[];
  editId: string | null;
  resetEditMode: () => void;
}

export const Board = ({ lists, editId, resetEditMode }: IBoardProps) => {
  const [addingModeOn, setAddingMode] = useState(false);
  const activateAddingMode = useCallback(() => {
    setAddingMode(true);
    resetEditMode();
  }, [setAddingMode, resetEditMode]);

  return (
    <div className={styles.root}>
      {lists.map(({ id, name, description, points }) => (
        <PointGroupContainer
          id={id}
          name={name}
          description={description}
          points={points}
          isEditMode={id === editId}
        />
      ))}
      <div className={styles.group}>
        {!addingModeOn && (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => activateAddingMode()}
          >
            +
          </Button>
        )}
        {addingModeOn && (
          <AddingModeContainer onClose={() => setAddingMode(false)} />
        )}
      </div>
    </div>
  );
};
