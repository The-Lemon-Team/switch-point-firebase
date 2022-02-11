import { renderHook } from '@testing-library/react-hooks';

import { useGroupFormHelpers } from './useGroupFormHelpers';

describe('useGroupFormHelpers()', () => {
  it('should add new point to points state', () => {
    const setValueMock = jest.fn();

    const formikRefMock = {
      current: {
        values: {
          points: [],
        },
        getFieldHelpers: jest.fn().mockImplementation(() => ({
          setValue: setValueMock,
        })),
      },
    };
    const {
      result: { current },
    } = renderHook(() => useGroupFormHelpers(formikRefMock as any));

    current.addNewPoint();

    expect(setValueMock.mock.calls[0][0]).toHaveLength(1);
  });
});
