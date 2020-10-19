const queries = require('./queries');
const evaluators = require('./evaluators');

function validateRule(rule, cartData) {
  const { query, evaluator, queryParams, evalParams } = rule;

  if (!queries[query]) throw new Error(`"${query}" is an invalid query`);
  const result = queries[query](cartData, queryParams);

  if (!evaluators[evaluator])
    throw new Error(`"${evaluator}" is an invalid evaluator`);

  return evaluators[evaluator](result, evalParams, cartData);
}

module.exports = validateRule;
