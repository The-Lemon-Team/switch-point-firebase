import React from 'react';
import { mount } from 'enzyme';
import { Formik, FormikProps } from 'formik';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { store } from '../../../../store';
import { PointGroup } from '../../components';
import {
  PointGroupContainerPure,
  IPointGroupContainerProps,
} from './PointGroupContainer';

import { IPointGroup, IPointGroupForm } from '../../../../interfaces';

type IWrapperProps = Partial<IPointGroupContainerProps>;

const pointsExample = [
  {
    id: 'p-1',
    isActive: false,
    name: 'testName',
    pointGroupId: 'g-2',
  },
];

const pointGroupExample: IPointGroup = {
  name: 'testName',
  points: pointsExample,
  description: 'testDescription',
  id: 'g-2',
};

const getWrapper = (props: IWrapperProps) => {
  return mount(
    <Provider store={store}>
      <PointGroupContainerPure
        isEditMode={false}
        isLoading={false}
        setEditMode={jest.fn()}
        resetEditMode={jest.fn()}
        deleteGroup={jest.fn()}
        {...pointGroupExample}
        {...props}
      />
    </Provider>,
  );
};

describe('<PointGroupContainer />', () => {
  it('should render PointGroup with disabled if isLoading passed', () => {
    const wrapper = getWrapper({ isLoading: true });

    expect(wrapper.find(PointGroup).prop('disabled')).toBeTruthy();
  });

  it('should render PointGroup with isEditMode if it is passed', () => {
    const wrapper = getWrapper({ isEditMode: true });

    expect(wrapper.find(PointGroup).prop('isEditMode')).toBeTruthy();
  });

  it('should add new point and set edit mode by onAddPoint calling', () => {
    const setEditModeMock = jest.fn();
    const wrapper = getWrapper({
      setEditMode: setEditModeMock,
    });
    const formikRef = wrapper
      .find(Formik)
      .prop<React.RefObject<FormikProps<IPointGroupForm>>>('innerRef');

    act(() => {
      wrapper.find(PointGroup).prop<() => void>('onAddPoint')();
      wrapper.update();
    });

    expect(formikRef.current?.values.points).toHaveLength(2);
    expect(setEditModeMock).toHaveBeenCalledWith('g-2');
  });

  it('should call setEditMode by onEdit calling', () => {
    const setEditModeMock = jest.fn();
    const wrapper = getWrapper({
      setEditMode: setEditModeMock,
    });

    act(() => {
      wrapper.find(PointGroup).prop<() => void>('onEdit')();
    });

    expect(setEditModeMock).toHaveBeenCalledWith('g-2');
  });

  it('should call deleteGroup with current id by onDelete calling', () => {
    const onDeleteMock = jest.fn();
    const wrapper = getWrapper({
      deleteGroup: onDeleteMock,
    });

    act(() => {
      wrapper.find(PointGroup).prop<() => void>('onDelete')();
    });

    expect(onDeleteMock).toHaveBeenCalledWith('g-2');
  });

  it('should call setEditMode by onAddPoint calling', (done) => {
    const setEditModeMock = jest.fn();
    const wrapper = getWrapper({
      setEditMode: setEditModeMock,
    });

    act(() => {
      wrapper.find(PointGroup).prop<() => void>('onAddPoint')();
      wrapper.update();
    });

    setImmediate(() => {
      expect(setEditModeMock).toHaveBeenCalled();
      done();
    });
  });
});
