import React from 'react';
import { mount } from 'enzyme';

import { AddingMode } from '../../components';
import { AddingModeContainerPure } from './AddingModeContainer';
import { IPointGroup } from '../../../../interfaces';

const getWrapper = (props = {}) => {
  return mount(
    <AddingModeContainerPure
      isLoading={false}
      editModeId={null}
      createGroup={jest.fn()}
      onClose={jest.fn()}
      {...props}
    />,
  );
};

describe('<AddingModeContainerPure />', () => {
  it('should invoke createGroup and onClose by createGroup calling', () => {
    const groupToTest = {
      description: 'test_description',
      name: 'test_name',
      points: [],
    };
    const createGroupMock = jest.fn();
    const onCloseMock = jest.fn();
    const wrapper = getWrapper({
      onClose: onCloseMock,
      createGroup: createGroupMock,
    });

    wrapper
      .find(AddingMode)
      .prop<(payload: Omit<IPointGroup, 'id'>) => void>('createGroup')(
      groupToTest,
    );

    expect(createGroupMock).toHaveBeenCalledWith(groupToTest);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
