import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '@material-ui/core';

import { GroupCard } from './GroupCard';

const getWrapper = (props = {}) => {
  return shallow(
    <GroupCard isEditMode={false} {...props}>
      content
    </GroupCard>,
  );
};

describe('<GroupCard />', () => {
  it('should render card with variant = elevation if edit mode is on', () => {
    const wrapper = getWrapper({ isEditMode: true });

    expect(wrapper.find(Card).prop('variant')).toEqual('elevation');
  });

  it('should render card with variant = outlined if edit mode is off', () => {
    const wrapper = getWrapper({ isEditMode: false });

    expect(wrapper.find(Card).prop('variant')).toEqual('outlined');
  });
});
