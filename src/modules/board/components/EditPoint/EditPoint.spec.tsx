import React from 'react';
import { shallow } from 'enzyme';
import { IconButton, TextField } from '@material-ui/core';

import { EditPoint } from './EditPoint';

const getWrapper = (props = {}) => {
  return shallow(
    <EditPoint
      disabled={false}
      onPointDelete={jest.fn}
      value="test"
      name="edit-point"
      onChange={jest.fn()}
      onBlur={jest.fn()}
      {...props}
    />,
  );
};

describe('<EditPoint />', () => {
  it('should render TextField with disabled flag when disabled flag is passed', () => {
    const wrapper = getWrapper({
      disabled: true,
    });

    expect(wrapper.find(TextField).prop('disabled')).toBeTruthy();
  });

  it('should call onPointDelete when onClick upon the button is called', () => {
    const onPointDeleteMock = jest.fn();
    const wrapper = getWrapper({
      onPointDelete: onPointDeleteMock,
    });

    wrapper.find(IconButton).prop<() => void>('onClick')();

    expect(onPointDeleteMock).toHaveBeenCalled();
  });
});
