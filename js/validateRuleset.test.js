const { expect } = require('@jest/globals');
const validateRuleSet = require('./validateRuleSet');

describe('validateRuleset()', () => {
  it('find items in cart that match rule conditions', () => {
    const ruleset = [
      {
        query: 'itemInCart',
        queryParams: {
          sku: 'a',
        },
        evaluator: 'toExist',
        evalParams: null,
      },
      {
        query: 'itemInCart',
        queryParams: {
          sku: 'b',
        },
        evaluator: 'toExist',
        evalParams: null,
      },
      {
        query: 'itemInCart',
        queryParams: {
          sku: 'c',
        },
        evaluator: 'toExist',
        evalParams: null,
      },
    ];

    const cartData = {
      cart: [
        {
          sku: 'a',
          brand: 'soap',
        },
        {
          sku: 'b',
          brand: 'tide',
        },
        {
          sku: 'c',
          brand: 'tide',
        },
        {
          sku: 'd',
          brand: 'tide',
        },
      ],
      metadata: {},
    };

    const extraRule = {
      query: 'itemInCart',
      queryParams: {
        sku: 'd',
      },
      evaluator: 'toExist',
      evalParams: null,
    };

    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
    ruleset[0].queryParams.sku = 'x';
    expect(validateRuleSet(cartData, ruleset)).toEqual(false);
    ruleset.push('OR', extraRule);
    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
    ruleset[4].queryParams.sku = 'z';
    expect(validateRuleSet(cartData, ruleset)).toEqual(false);
  });

  it('validates a field in metadata', () => {
    const ruleset = [
      {
        query: 'metadataField',
        queryParams: null,
        evaluator: 'equalTo',
        evalParams: { customerType: 'RED_CARD' },
      },
    ];

    const cartData = {
      cart: [],
      metadata: {
        customerType: 'GUEST',
      },
    };

    expect(validateRuleSet(cartData, ruleset)).toEqual(false);
    cartData.metadata.customerType = 'RED_CARD';
    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
  });

  it('validates a sitewide offer', () => {
    const ruleset = [];
    const cartData = {
      cart: [],
      metadata: {},
    };

    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
  });

  it('validates if a product exists with a certain sku', () => {
    const cartData = {
      cart: [
        { sku: 'aaa', price: 4.99 },
        { sku: 'bbb', price: 700.0 },
        { sku: 'ccc', price: 0.9 },
      ],
      metadata: {},
    };

    const ruleset = [
      {
        query: 'itemInCart',
        queryParams: { sku: 'bbb' },
        evaluator: 'equalTo',
        evalParams: { sku: 'ccc' },
      },
    ];

    expect(validateRuleSet(cartData, ruleset)).toEqual(false);
    ruleset[0].evalParams.sku = 'bbb';
    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
  });

  it('validates if cart value is greater than or equal to an amount', () => {
    const cartData = {
      cart: [
        { sku: 'aaa', price: 4.99 },
        { sku: 'bbb', price: 700.0 },
        { sku: 'ccc', price: 0.9 },
      ],
      metadata: { cartTotal: 200 },
    };

    const ruleset = [
      {
        query: 'metadataField',
        queryParams: null,
        evaluator: 'greaterThanEqual',
        evalParams: { cartTotal: 300 },
      },
    ];

    expect(validateRuleSet(cartData, ruleset)).toEqual(false);
    cartData.metadata.cartTotal = 300;
    expect(validateRuleSet(cartData, ruleset)).toEqual(true);
  });
});
