import React from 'react';
import {
  CardHeader,
  CardContent,
  Divider,
  CardActions,
} from '@material-ui/core';

import { GroupSubHeader } from '../GroupSubHeader';
import { GroupTitle } from '../GroupTitle';
import { Actions } from '../Actions';
import { GroupBox } from '../GroupBox';
import { GroupCard } from '../GroupCard';
import { Points } from '../Points';

export interface IPointGroupProps {
  disabled: boolean;
  isEditMode: boolean;
  onAddPoint: () => void;
  onEdit?: () => void;
  applyChanges: () => void;
  onDelete: () => void;
}

export const PointGroup = ({
  applyChanges,
  disabled,
  isEditMode,
  onAddPoint,
  onDelete,
  onEdit,
}: IPointGroupProps) => {
  const renderActions = () => (
    <Actions
      isEditMode={isEditMode}
      disabled={disabled}
      onAdd={onAddPoint}
      onEdit={onEdit}
      onSave={applyChanges}
      onDelete={onDelete}
    />
  );

  return (
    <GroupCard isEditMode={isEditMode}>
      <GroupBox isEditMode={isEditMode}>
        <CardHeader
          action={renderActions()}
          title={
            <GroupTitle
              isEditMode={isEditMode}
              disabled={disabled}
              onSubmit={applyChanges}
            />
          }
          titleTypographyProps={{
            align: 'left',
          }}
          subheaderTypographyProps={{
            align: 'left',
          }}
          style={{
            alignItems: 'end',
          }}
          subheader={
            <GroupSubHeader
              isEditMode={isEditMode}
              disabled={disabled}
              onSubmit={applyChanges}
            />
          }
        />
        <Divider variant="middle" />
        <CardContent>
          <Points isEditMode={isEditMode} disabled={disabled} />
        </CardContent>
        {isEditMode && (
          <>
            <Divider variant="middle" />
            <CardActions
              style={{
                justifyContent: 'flex-end',
              }}
            >
              {renderActions()}
            </CardActions>
          </>
        )}
      </GroupBox>
    </GroupCard>
  );
};
