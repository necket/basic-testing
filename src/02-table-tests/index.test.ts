import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 6, b: 8, action: Action.Multiply, expected: 48 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 30, b: 3, action: Action.Divide, expected: 10 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 10, b: 5, action: Action.Exponentiate, expected: 100000 },
  { a: 2, b: 2, action: 'Unknown action', expected: null },
  { a: '1', b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toEqual(expected);
    },
  );
});
