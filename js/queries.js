const memo = {};

function validateRule(rule, cart) {
  const queries = {
    findItem(params) {
      return function (item) {
        const keys = Object.keys(params);

        for (let key of keys) {
          if (item[key] !== params[key]) {
            return false;
          }
        }

        return true;
      };
    },

    itemInCart(params) {
      const key = JSON.stringify(params);
      if (memo[key]) {
        return memo[key];
      }

      const result = cart.find(this.findItem(params));
      memo[key] = result;
      return result;
    },

    itemsInCart(paramList) {},
  };

  const evaluators = {
    toExist(result) {
      return result ? true : false;
    },
  };

  const { query, eval, queryParams, evalParams } = rule;
  const result = queries[query](queryParams);

  console.log({ result });
  return evaluators[eval](result, evalParams);
}

module.exports = validateRule;
