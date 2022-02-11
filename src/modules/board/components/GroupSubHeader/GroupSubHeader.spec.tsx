import React from 'react';
import { mount } from 'enzyme';
import { TextField, Box } from '@material-ui/core';
import { Formik } from 'formik';

import { GroupSubHeader } from './GroupSubHeader';

const getWrapper = (props = {}) => {
  return mount(
    <Formik initialValues={{ description: 'description' }} onSubmit={jest.fn()}>
      <GroupSubHeader disabled={false} isEditMode={false} {...props} />
    </Formik>,
  );
};

describe('<GroupSubHeader />', () => {
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
    expect(wrapper.find(Box).contains('description')).toBeTruthy();
  });
});
