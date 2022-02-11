import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from '@material-ui/core';
import { act } from 'react-dom/test-utils';

import { Board } from './Board';
import { AddingModeContainer } from '../../containers';
import { IPointGroup } from '../../../../interfaces';
import { PointGroup } from '../PointGroup';

const getWrapper = (props = {}) => {
  return shallow(
    <Board lists={[]} editId={null} resetEditMode={jest.fn()} {...props} />,
  );
};

describe('<Board />', () => {
  it('should activate adding mode by the + button clicking and call resetEditMode when', (done) => {
    const resetEditModeMock = jest.fn();
    const wrapper = getWrapper({ resetEditMode: resetEditModeMock });

    act(() => {
      wrapper.find(Button).prop<() => void>('onClick')();
      wrapper.update();
    });

    setImmediate(() => {
      expect(wrapper.find(AddingModeContainer).exists()).toBeTruthy();
      expect(resetEditModeMock).toHaveBeenCalled();
      done();
    });
  });

  it('should render PointGroupContainer with edit mode when list id and edit mode id is matched', () => {
    const listsExample: IPointGroup[] = [
      {
        id: '10',
        name: 'name',
        description: 'descriptions',
        points: [],
      },
      {
        id: '111',
        name: 'name',
        description: 'descriptions',
        points: [],
      },
    ];
    const wrapper = getWrapper({
      lists: listsExample,
      editId: '111',
    });

    expect(wrapper.find({ id: '111' }).prop('isEditMode')).toBeTruthy();
  });
});
