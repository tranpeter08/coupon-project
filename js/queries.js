const memo = {};

function findItem(cart, params) {
  if (!params) throw new Error('params must be an object');
  const key = JSON.stringify(['find', params]);

  if (memo[key]) {
    return memo[key];
  }

  const result = cart.find((item) => {
    for (let key in params) {
      if (item[key] !== params[key]) {
        return false;
      }
    }

    return true;
  });

  memo[key] = result;
  return result;
}

const queries = {
  itemInCart(cartData, params) {
    return findItem(cartData.cart, params);
  },

  itemsInCart(cartData, params) {
    const key = JSON.stringify(['filter', params]);

    if (memo[key]) {
      return memo[key];
    }

    const results = cartData.cart.filter((item) => {
      for (let key in params) {
        if (item[key] !== params[key]) {
          return false;
        }
      }

      return true;
    });

    memo[key] = results;
    return results;
  },

  metadataField(cartData, params) {
    return cartData.metadata;
  },
};

module.exports = queries;
