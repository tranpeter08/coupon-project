const validateCoupon = require('./validateCoupon');
const {expect} = require('chai');

describe('validateCoupon()', () => {
  it('find items in cart that match rule conditions', () => {
    const rules = [
      [
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
      ],
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

    const extrarules = [
      {
        query: 'itemInCart',
        queryParams: {
          sku: 'd',
        },
        evaluator: 'toExist',
        evalParams: null,
      },
    ];

    expect(validateCoupon(cartData, rules)).to.equal(true);
    rules[0][0].queryParams.sku = 'x';

    expect(validateCoupon(cartData, rules)).to.equal(false);
    rules.push(extrarules);

    expect(validateCoupon(cartData, rules)).to.equal(true);
    extrarules[0].queryParams.sku = 'z';

    expect(validateCoupon(cartData, rules)).to.equal(false);
  });

  it('validates a field in metadata', () => {
    const rules = [
      [
        {
          query: 'cartMetadata',
          queryParams: null,
          evaluator: 'equalTo',
          evalParams: { customerType: 'RED_CARD' },
        },
      ],
    ];

    const cartData = {
      cart: [],
      metadata: {
        customerType: 'GUEST',
      },
    };

    expect(validateCoupon(cartData, rules)).to.equal(false);
    cartData.metadata.customerType = 'RED_CARD';

    expect(validateCoupon(cartData, rules)).to.equal(true);
  });

  it('validates a sitewide offer', () => {
    const rules = [];
    const cartData = {
      cart: [],
      metadata: {},
    };

    expect(validateCoupon(cartData, rules)).to.equal(true);
  });

  it('validates if a product exists with a certain sku', () => {
    const rules = [
      [
        {
          query: 'itemInCart',
          queryParams: { sku: 'bbb' },
          evaluator: 'equalTo',
          evalParams: { sku: 'ccc' },
        },
      ],
    ];

    const cartData = {
      cart: [
        { sku: 'aaa', price: 4.99 },
        { sku: 'bbb', price: 700.0 },
        { sku: 'ccc', price: 0.9 },
      ],
      metadata: {},
    };

    expect(validateCoupon(cartData, rules)).to.equal(false);
    rules[0][0].evalParams.sku = 'bbb';

    expect(validateCoupon(cartData, rules)).to.equal(true);
  });

  it('validates if cart value is greater than or equal to an amount', () => {
    const rules = [
      [
        {
          query: 'cartMetadata',
          queryParams: null,
          evaluator: 'greaterThanEqual',
          evalParams: { cartTotal: 300 },
        },
      ],
    ];

    const cartData = {
      cart: [
        { sku: 'aaa', price: 4.99 },
        { sku: 'bbb', price: 700.0 },
        { sku: 'ccc', price: 0.9 },
      ],
      metadata: { cartTotal: 200 },
    };

    expect(validateCoupon(cartData, rules)).to.equal(false);
    cartData.metadata.cartTotal = 300;

    expect(validateCoupon(cartData, rules)).to.equal(true);
  });

  it('validates a customer selected item to apply discount to', () => {
    const rules = [
      [
        {
          query: 'itemInCart',
          queryParams: { sku: 'a' },
          evaluator: 'equalToCartMetadataKey',
          evalParams: {
            metadataKey: 'customerSelectedSku',
            resultKey: 'sku',
          },
        },
      ],
    ];

    const cartData = {
      cart: [
        { sku: 'a', qty: 1 },
        { sku: 'b', qty: 1 },
        { sku: 'c', qty: 1 },
      ],
      metadata: {
        customerSelectedSku: 'c',
      },
    };

    const extraRuleSet = [
      {
        query: 'itemInCart',
        queryParams: { sku: 'c' },
        evaluator: 'equalToCartMetadataKey',
        evalParams: { metadataKey: 'customerSelectedSku', resultKey: 'sku' },
      },
    ];

    const badRule = {
      query: 'itemInCart',
      queryParams: { sku: 'b' },
      evaluator: 'equalToCartMetadataKey',
      evalParams: {},
    };

    expect(validateCoupon(cartData, rules)).to.equal(false);
    rules.push(extraRuleSet);

    expect(validateCoupon(cartData, rules)).to.equal(true);
    rules[0].unshift(badRule);

    expect(() => {
      validateCoupon(cartData, rules);
    }).to.throw();
  });
});
