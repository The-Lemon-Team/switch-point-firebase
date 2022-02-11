import React from 'react';
import { mount } from 'enzyme';
import { TextField, Box } from '@material-ui/core';
import { Formik } from 'formik';

import { GroupTitle } from './GroupTitle';

const getWrapper = (props = {}) => {
  return mount(
    <Formik initialValues={{ name: 'testName' }} onSubmit={jest.fn()}>
      <GroupTitle disabled={false} isEditMode={false} {...props} />
    </Formik>,
  );
};

describe('<GroupTitle />', () => {
  it('should render TextField if edit mode is on', () => {
    const wrapper = getWrapper({
      isEditMode: true,
    });

    expect(wrapper.find(TextField).exists()).toBeTruthy();
  });

  it('should not render TextField and should render description if edit mode is off', () => {
    const wrapper = getWrapper({
      isEditMode: false,
    });

    expect(wrapper.find(TextField).exists()).toBeFalsy();
    expect(wrapper.find(Box).contains('testName')).toBeTruthy();
  });

  it('should render disabled TextField when disabled is passed', () => {
    const wrapper = getWrapper({
      isEditMode: true,
      disabled: true,
    });

    expect(wrapper.find(TextField).prop('disabled')).toBeTruthy();
  });
});
