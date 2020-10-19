const validateRule = require('./validateRule');

function validateRuleSet(data, ruleset = []) {
  const rules = [...ruleset];
  let isValid = null;
  // let cursor = null;

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

    isValid = validateRule(rule, data);
  }

  // console.log({ isValid });
  return isValid;
}

module.exports = validateRuleSet;
