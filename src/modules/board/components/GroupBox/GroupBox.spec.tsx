import React from 'react';
import { shallow } from 'enzyme';
import { Box } from '@material-ui/core';

import { GroupBox } from './GroupBox';

const getWrapper = (props = {}) => {
  return shallow(
    <GroupBox isEditMode={false} {...props}>
      content
    </GroupBox>,
  );
};

describe('<GroupBox />', () => {
  it('should render box with boxShadow = 3 if edit mode is on', () => {
    const wrapper = getWrapper({ isEditMode: true });

    expect(wrapper.find(Box).prop('boxShadow')).toEqual(3);
  });

  it('should render box with boxShadow = 0 if edit mode is off', () => {
    const wrapper = getWrapper({ isEditMode: false });

    expect(wrapper.find(Box).prop('boxShadow')).toEqual(0);
  });
});
