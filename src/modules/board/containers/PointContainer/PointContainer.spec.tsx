import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { PointContainerPure } from './PointContainer';
import { IPointGroupForm } from '../../../../interfaces';
import { Point } from '../../components/Point';

const getWrapper = (props = {}) => {
  return mount(
    <Formik<Pick<IPointGroupForm, 'points'>>
      initialValues={{
        points: [
          {
            id: 'p-1',
            isActive: true,
            name: 'testName',
            pointGroupId: 'g-2',
          },
        ],
      }}
      onSubmit={jest.fn()}
    >
      <PointContainerPure
        disabled={false}
        index={0}
        isEditMode={false}
        {...props}
      />
    </Formik>,
  );
};

describe('<PointContainer />', () => {
  it('should call togglePoint with id and inverted isActive field', () => {
    const togglePointMock = jest.fn();
    const wrapper = getWrapper({
      togglePoint: togglePointMock,
    });

    wrapper.find(Point).prop<() => void>('onPointToggle')();

    expect(togglePointMock).toHaveBeenCalledWith({
      groupId: 'g-2',
      id: 'p-1',
      isActive: false,
    });
  });

  it('should call deletePoint with point id and pointGroupId', () => {
    const deletePointMock = jest.fn();
    const wrapper = getWrapper({
      deletePoint: deletePointMock,
    });

    wrapper.find(Point).prop<() => void>('onPointDelete')();

    expect(deletePointMock).toHaveBeenCalledWith('p-1', 'g-2');
  });

  it('should render Point with disabled and isEditMode and disabled', () => {
    const wrapper = getWrapper({
      disabled: true,
      isEditMode: true,
    });

    expect(wrapper.find(Point).prop<boolean>('disabled')).toBeTruthy();
    expect(wrapper.find(Point).prop<boolean>('isEditMode')).toBeTruthy();
  });
});
