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
};

module.exports = evaluators;
