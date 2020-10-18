const memo = {};

const queries = {
  findItem(cart, params) {
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
  },

  itemInCart(cartData, params) {
    return this.findItem(cartData.cart, params);
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
