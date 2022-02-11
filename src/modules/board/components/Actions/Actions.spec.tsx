import React from 'react';
import { shallow } from 'enzyme';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

import { Actions } from './Actions';

const getWrapper = (props = {}) => {
  return shallow(<Actions disabled={false} isEditMode={false} {...props} />);
};

describe('<Actions />', () => {
  it('should render done and delete button if edit mode is on', () => {
    const wrapper = getWrapper({ isEditMode: true });

    expect(wrapper.find(DoneIcon).exists()).toBeTruthy();
    expect(wrapper.find(DeleteIcon).exists()).toBeTruthy();
    expect(wrapper.find(EditIcon).exists()).toBeFalsy();
  });

  it('should render edit icon if edit mode is on', () => {
    const wrapper = getWrapper({ isEditMode: false });

    expect(wrapper.find(EditIcon).exists()).toBeTruthy();
    expect(wrapper.find(DoneIcon).exists()).toBeFalsy();
    expect(wrapper.find(DeleteIcon).exists()).toBeFalsy();
  });

  it('should render buttons with disabled prop if disabled is passed', () => {
    const wrapper = getWrapper({ disabled: true });
    const buttons = wrapper.find(IconButton);

    buttons.forEach((button) => {
      expect(button.prop('disabled')).toBeTruthy();
    });
  });

  describe('add button should render if any state of edit mode', () => {
    it('should add button if edit mode is on', () => {
      const wrapper = getWrapper({ isEditMode: true });

      expect(wrapper.find(AddIcon).exists()).toBeTruthy();
    });

    it('should add button if edit mode is off', () => {
      const wrapper = getWrapper({ isEditMode: false });

      expect(wrapper.find(AddIcon).exists()).toBeTruthy();
    });
  });

  describe('actions', () => {
    it('should call onSave callback when done button is clicked', () => {
      const onSaveMock = jest.fn();
      const wrapper = getWrapper({ isEditMode: true, onSave: onSaveMock });

      wrapper.find(DoneIcon).closest(IconButton).prop<() => void>('onClick')();

      expect(onSaveMock).toHaveBeenCalled();
    });

    it('should call onSave callback when edit button is clicked', () => {
      const onEditMock = jest.fn();
      const wrapper = getWrapper({ isEditMode: false, onEdit: onEditMock });

      wrapper.find(EditIcon).closest(IconButton).prop<() => void>('onClick')();

      expect(onEditMock).toHaveBeenCalled();
    });

    it('should call onSave callback when done button is clicked', () => {
      const onDeleteMock = jest.fn();
      const wrapper = getWrapper({ isEditMode: true, onDelete: onDeleteMock });

      wrapper
        .find(DeleteIcon)
        .closest(IconButton)
        .prop<() => void>('onClick')();

      expect(onDeleteMock).toHaveBeenCalled();
    });

    it('should call onSave callback when done button is clicked', () => {
      const onAddMock = jest.fn();
      const wrapper = getWrapper({ isEditMode: true, onAdd: onAddMock });

      wrapper.find(AddIcon).closest(IconButton).prop<() => void>('onClick')();

      expect(onAddMock).toHaveBeenCalled();
    });
  });
});
