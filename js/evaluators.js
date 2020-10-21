const evaluators = {
  toExist(result) {
    return !!result;
  },

  equalTo(result, params) {
    if (!params) throw 'Params undefined!';

    for (let key in params) {
      if (result[key] !== params[key]) {
        return false;
      }
    }

    return true;
  },

  greaterThan(result, params) {
    for (let key in params) {
      return result[key] > params[key];
    }
  },

  greaterThanEqual(result, params) {
    for (let key in params) {
      return result[key] >= params[key];
    }
  },

  lessThan(result, params) {
    for (let key in params) {
      return result[key] < params[key];
    }
  },

  lessThanEqual(result, params) {
    for (let key in params) {
      return result[key] <= params[key];
    }
  },

  hasResultCount(result, params) {
    return result.length === params.count;
  },

  hasResultCountGreaterThan(result, params) {
    return result.length > params.count;
  },

  hasResultCountLessThan(result, params) {
    return result.length < params.count;
  },

  equalToCartMetadataKey(result, params, cartData) {
    // requires metadataKey and resultKey properties to be defined in params
    const { metadata } = cartData;

    if (!params || !metadata)
      throw new Error('params or cart metadata undefined!');

    const { metadataKey, resultKey } = params;

    if (!metadataKey || !resultKey)
      throw new Error('Missing "metadataKey" or "resultKey" properties');

    return result[resultKey] === metadata[metadataKey];
  },
};

module.exports = evaluators;
