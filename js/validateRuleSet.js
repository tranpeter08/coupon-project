const validateRule = require('./validateRule');

function validateRuleSet(cartData, ruleset) {
  // for sitewide coupons
  if (!ruleset.length) {
    return true;
  }

  const rules = [...ruleset];
  const memo = {};
  let isValid = null;

  while (rules.length) {
    let rule = rules.shift();

    if (isValid === true && rule === 'OR') {
      break;
    }

    if (isValid === false && rule !== 'OR') {
      continue;
    }

    if (rule === 'OR') {
      rule = rules.shift();
    }

    isValid = validateRule(rule, cartData, memo);
  }

  return isValid;
}

module.exports = validateRuleSet;
