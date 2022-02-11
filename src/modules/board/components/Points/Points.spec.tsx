import React from 'react';
import { mount } from 'enzyme';
import { Formik, FormikProps } from 'formik';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { store } from '../../../../store';
import { IPoint, IPointGroupForm } from '../../../../interfaces';
import { Point } from '../Point';
import { Points, IPointsProps } from './Points';

const pointsExample: IPoint[] = [
  {
    id: '1',
    name: 'Name #1',
    pointGroupId: 'testPointGroupId #1',
    isActive: true,
  },
  {
    id: '2',
    name: 'Name #2',
    pointGroupId: 'testPointGroupId #2',
    isActive: false,
  },
];

interface IWrapperProps extends Partial<IPointsProps> {
  formikRef?: React.RefObject<FormikProps<Pick<IPointGroupForm, 'points'>>>;
}

const getWrapper = ({ formikRef, ...props }: IWrapperProps) => {
  return mount(
    <Provider store={store}>
      <Formik
        initialValues={{ points: pointsExample }}
        onSubmit={jest.fn()}
        innerRef={formikRef}
      >
        <Points isEditMode={false} disabled={false} {...props} />
      </Formik>
    </Provider>,
  );
};

describe('<Points />', () => {
  it('should remove point out of formik state by onPointDelete calling', () => {
    const formikRef = React.createRef<
      FormikProps<Pick<IPointGroupForm, 'points'>>
    >();
    const wrapper = getWrapper({ formikRef });

    act(() => {
      wrapper.find(Point).first().prop<() => void>('onPointDelete')();
    });

    expect(formikRef.current?.values.points).toHaveLength(1);
  });

  it('should render each point with disabled as it passed to parent', () => {
    const wrapper = getWrapper({ disabled: true });

    wrapper.find(Point).map((point) => {
      expect(point.prop('disabled')).toBeTruthy();
    });
  });

  it('should render each point with isEditFlag as it passed to parent', () => {
    const wrapper = getWrapper({ isEditMode: true });

    wrapper.find(Point).map((point) => {
      expect(point.prop('isEditMode')).toBeTruthy();
    });
  });
});
