import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { PointGroup } from './PointGroup';
import { Actions } from '../Actions';
import { GroupTitle } from '../GroupTitle';
import { GroupSubHeader } from '../GroupSubHeader';
import { Points } from '../Points';
import { GroupCard } from '../GroupCard';
import { GroupBox } from '../GroupBox';

import { IPointGroupForm } from '../../../../interfaces';

const getWrapper = (props = {}) => {
  return mount(
    <Formik<IPointGroupForm>
      initialValues={{
        points: [],
        name: 'testName',
        description: 'testDescription',
      }}
      onSubmit={jest.fn()}
    >
      <PointGroup
        disabled={false}
        isEditMode={false}
        applyChanges={jest.fn()}
        onDelete={jest.fn()}
        onAddPoint={jest.fn()}
        onEdit={jest.fn()}
        {...props}
      />
    </Formik>,
  );
};

describe('<PointGroup />', () => {
  it('should render components with disabled flag if it is passed', () => {
    const wrapper = getWrapper({ disabled: true });

    wrapper.find(Actions).map((actionsWrapper) => {
      expect(actionsWrapper.prop('disabled')).toBeTruthy();
    });
    expect(wrapper.find(GroupTitle).prop('disabled')).toBeTruthy();
    expect(wrapper.find(GroupSubHeader).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Points).prop('disabled')).toBeTruthy();
  });

  it('should render components with isEditMode flag if it is passed', () => {
    const wrapper = getWrapper({ isEditMode: true });

    wrapper.find(Actions).map((actionsWrapper) => {
      expect(actionsWrapper.prop('isEditMode')).toBeTruthy();
    });
    expect(wrapper.find(GroupBox).prop('isEditMode')).toBeTruthy();
    expect(wrapper.find(GroupCard).prop('isEditMode')).toBeTruthy();
    expect(wrapper.find(GroupSubHeader).prop('isEditMode')).toBeTruthy();
    expect(wrapper.find(Points).prop('isEditMode')).toBeTruthy();
  });

  it('should invoke onAddPoint when onAdd is called in Actions', () => {
    const onAddPointMock = jest.fn();
    const wrapper = getWrapper({
      onAddPoint: onAddPointMock,
    });

    wrapper.find(Actions).first().prop<() => void>('onAdd')();

    expect(onAddPointMock).toHaveBeenCalled();
  });

  it('should invoke onEdit when onEdit is called in Actions', () => {
    const onEditMock = jest.fn();
    const wrapper = getWrapper({
      onEdit: onEditMock,
    });

    wrapper.find(Actions).first().prop<() => void>('onEdit')();

    expect(onEditMock).toHaveBeenCalled();
  });

  it('should invoke applyChanges when onSave is called in Actions', () => {
    const applyChangesMock = jest.fn();
    const wrapper = getWrapper({
      applyChanges: applyChangesMock,
    });

    wrapper.find(Actions).first().prop<() => void>('onSave')();

    expect(applyChangesMock).toHaveBeenCalled();
  });

  it('should invoke onDelete when onDelete is called in Actions', () => {
    const onDeleteMock = jest.fn();
    const wrapper = getWrapper({
      onDelete: onDeleteMock,
    });

    wrapper.find(Actions).first().prop<() => void>('onDelete')();

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
