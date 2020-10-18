const queries = require('./queries');
const evaluators = require('./evaluators');

function validateRule(rule, cartData) {
  const { query, evaluator, queryParams, evalParams } = rule;
  const result = queries[query](cartData, queryParams);

  console.log({ result });
  return evaluators[evaluator](result, evalParams, cartData);
}

module.exports = validateRule;
