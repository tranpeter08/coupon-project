function findItem(cart, params) {
  if (!params) throw new Error('params must be an object');

  const result = cart.find((item) => {
    for (let key in params) {
      if (item[key] !== params[key]) {
        return false;
      }
    }

    return true;
  });

  return result;
}

const queries = {
  itemInCart(cartData, params) {
    return findItem(cartData.cart, params);
  },

  itemsInCart(cartData, params) {
    const results = cartData.cart.filter((item) => {
      for (let key in params) {
        if (item[key] !== params[key]) {
          return false;
        }
      }

      return true;
    });

    return results;
  },

  cartMetadata(cartData, params) {
    return cartData.metadata;
  },
};

module.exports = queries;
