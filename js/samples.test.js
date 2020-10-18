const { expect } = require('@jest/globals');
const validateRuleSet = require('./validateRuleSet');

const rule1 = [
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    evaluator: 'toExist',
    evalParams: null,
  },
  'AND',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'x',
    },
    evaluator: 'toExist',
    evalParams: null,
  },
  'AND',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    evaluator: 'toExist',
    evalParams: null,
  },
  'OR',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    evaluator: 'toExist',
    evalParams: null,
  },
];

const cartData1 = {
  cart: [
    {
      sku: 'b',
      brand: 'soap',
    },
    {
      sku: 'a',
      brand: 'tide',
    },
  ],
  metadata: {},
};

const rule2 = [
  {
    query: 'metadataField',
    queryParams: null,
    evaluator: 'equalTo',
    evalParams: { customerType: 'RED_CARD' },
  },
];

const cartData2 = {
  cart: [],
  metadata: {
    customerType: 'GUEST',
  },
};

describe('validateCoupon()', () => {
  it('find items in cart that match rule conditions', () => {
    expect(validateRuleSet(cartData1, rule1)).toEqual(true);
  });

  it('validates a field in metadata', () => {
    expect(validateRuleSet(cartData2, [...rule2])).toEqual(false);

    cartData2.metadata.customerType = 'RED_CARD';
    expect(validateRuleSet(cartData2, [...rule2])).toEqual(true);
  });
});
