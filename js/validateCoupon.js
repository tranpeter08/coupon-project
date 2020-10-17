const validateRule = require('./queries');

const validationRule = [
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    eval: 'toExist',
    evalParams: null,
  },
  'AND',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'x',
    },
    eval: 'toExist',
    evalParams: null,
  },
  'AND',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    eval: 'toExist',
    evalParams: null,
  },
  'OR',
  {
    query: 'itemInCart',
    queryParams: {
      sku: 'a',
    },
    eval: 'toExist',
    evalParams: null,
  },
];

const sampleCart = [
  {
    sku: 'bb',
    brand: 'soap',
  },
  {
    sku: 'a',
    brand: 'tide',
  },
];

function validateRuleSet(cart = [], cartMetadata, rules = []) {
  let isValid = null;

  while (rules.length) {
    let rule = rules.shift();

    if (isValid === true && rule === 'OR') {
      break;
    }

    if (isValid === false && rule !== 'OR') {
      continue;
    }

    if (rule === 'OR' || rule === 'AND') {
      rule = rules.shift();
    }

    isValid = validateRule(rule, cart);
  }

  console.log({ isValid });
  return isValid;
}

validateRuleSet(sampleCart, null, validationRule);
