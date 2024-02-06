// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 20, b: 5, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 0, action: Action.Divide, expected: Infinity },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 2, b: '3', action: Action.Subtract, expected: null },
  { a: '2', b: '3', action: Action.Multiply, expected: null },
  { a: 2, b: 3, action: 'InvalidAction', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'given a and b with as expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
