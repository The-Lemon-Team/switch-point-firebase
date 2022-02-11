import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';
import { Button } from '@material-ui/core';

import { IPoint, IPointGroupForm } from '../../../../interfaces';
import { EditPoint } from '../EditPoint';
import { Point, IPointProps } from './Point';

interface IWrapperProps extends Partial<IPointProps> {
  points?: IPoint[];
}

const getWrapper = ({ points, ...props }: IWrapperProps) => {
  return mount(
    <Formik<Pick<IPointGroupForm, 'points'>>
      initialValues={{
        points: points || [
          {
            id: '1',
            isActive: false,
            name: 'testName',
            pointGroupId: '1',
          },
        ],
      }}
      onSubmit={jest.fn()}
    >
      <Point
        disabled={false}
        index={0}
        isEditMode={false}
        onPointDelete={jest.fn()}
        onPointToggle={jest.fn()}
        {...props}
      />
    </Formik>,
  );
};

describe('<Point />', () => {
  describe('isEditMode = true', () => {
    it('should render EditPoint if isEditMode on', () => {
      const wrapper = getWrapper({ isEditMode: true });

      expect(wrapper.find(EditPoint).exists()).toBeTruthy();
    });

    it('should render EditPoint with disabled if it is passed', () => {
      const wrapper = getWrapper({ isEditMode: true, disabled: true });

      expect(wrapper.find(EditPoint).prop('disabled')).toBeTruthy();
    });
  });

  describe('isEdtMode = false', () => {
    it('should render Button if isEditMode off', () => {
      const wrapper = getWrapper({ isEditMode: false });

      expect(wrapper.find(Button).exists()).toBeTruthy();
      expect(wrapper.find(Button).contains('testName')).toBeTruthy();
    });

    it('should render Button with primary color if point is active', () => {
      const wrapper = getWrapper({
        isEditMode: false,
        points: [
          {
            id: '1',
            isActive: true,
            name: 'testName',
            pointGroupId: '1',
          },
        ],
      });

      expect(wrapper.find(Button).prop('color')).toEqual('primary');
    });

    it('should render Button with default color if point is not active', () => {
      const wrapper = getWrapper({
        isEditMode: false,
        points: [
          {
            id: '1',
            isActive: false,
            name: 'testName',
            pointGroupId: '1',
          },
        ],
      });

      expect(wrapper.find(Button).prop('color')).toEqual('default');
    });

    it("should call onPointToggle on button's prop calling", () => {
      const onPointToggleMock = jest.fn();
      const wrapper = getWrapper({
        isEditMode: false,
        onPointToggle: onPointToggleMock,
      });

      wrapper.find(Button).prop<() => void>('onClick')();

      expect(onPointToggleMock).toHaveBeenCalled();
    });
  });
});
