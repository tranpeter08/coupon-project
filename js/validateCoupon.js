const validateRule = require('./validateRule');

function validateCoupon(cartData, validationRules) {
  if (!validationRules.length) return true;

  const memo = {};
  let isValid = null;

  for (let ruleSet of validationRules) {
    isValid = null;

    for (let rule of ruleSet) {
      isValid = validateRule(rule, cartData, memo);

      if (isValid === false) {
        break;
      }
    }

    if (isValid === false) {
      continue;
    }

    if (isValid === true) {
      break;
    }
  }

  return isValid;
}

module.exports = validateCoupon;
