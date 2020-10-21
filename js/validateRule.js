const queries = require('./queries');
const evaluators = require('./evaluators');

function validateRule(rule, cartData, memo) {
  const { query, evaluator, queryParams, evalParams } = rule;

  if (!queries[query]) throw new Error(`"${query}" is an invalid query`);

  const memoKey = JSON.stringify({ query, queryParams });
  let result;

  if (memo[memoKey]) {
    result = memo[memoKey];
  } else {
    result = queries[query](cartData, queryParams);
    memo[memoKey] = result;
  }

  if (!evaluators[evaluator])
    throw new Error(`"${evaluator}" is an invalid evaluator`);

  return evaluators[evaluator](result, evalParams, cartData);
}

module.exports = validateRule;
