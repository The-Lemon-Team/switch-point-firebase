import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';
import { act } from 'react-dom/test-utils';

import { PointGroup } from '../PointGroup';
import { createNewGroup } from '../../helpers';
import { AddingMode } from './AddingMode';

const getWrapper = (props = {}) => {
  return mount(
    <AddingMode
      createGroup={jest.fn()}
      editModeId={null}
      isLoading={false}
      onDelete={jest.fn()}
      {...props}
    />,
  );
};

describe('AddingMode', () => {
  it('should call createGroup by ', (done) => {
    const createGroupMock = jest.fn();
    const wrapper = getWrapper({
      createGroup: createGroupMock,
    });

    act(() => {
      wrapper.find(PointGroup).prop<() => void>('applyChanges')();
    });

    setImmediate(() => {
      expect(createGroupMock).toHaveBeenCalled();
      done();
    });
  });

  it('should render PointGroup with disabled flag if isLoading passed', () => {
    const wrapper = getWrapper({
      isLoading: true,
    });

    expect(wrapper.find(PointGroup).prop('disabled')).toBeTruthy();
  });

  it('should render PointGroup with no isEditMode when editModeId is passed', () => {
    const wrapper = getWrapper({
      editModeId: 'test_id',
    });

    expect(wrapper.find(PointGroup).prop('isEditMode')).toBeFalsy();
  });

  it('should call onDelete when onDelete on PointGroup is called', (done) => {
    const onDeleteMock = jest.fn();
    const wrapper = getWrapper({
      onDelete: onDeleteMock,
    });

    wrapper.find(PointGroup).prop<() => void>('onDelete')();

    setImmediate(() => {
      expect(onDeleteMock).toHaveBeenCalled();
      done();
    });
  });

  it('should check initial values of formik', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find(Formik).prop('initialValues')).toEqual(
      createNewGroup({}),
    );
  });
});
