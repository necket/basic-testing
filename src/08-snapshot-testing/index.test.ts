import { generateLinkedList } from './index';

const elements = [1, 2, 3, 4, 5];
const expectedList = {
  next: {
    next: {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 5,
        },
        value: 4,
      },
      value: 3,
    },
    value: 2,
  },
  value: 1,
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(elements);
    expect(list).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(elements);
    expect(list).toMatchSnapshot();
  });
});
