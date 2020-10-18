const evaluators = {
  toExist(result) {
    return result ? true : false;
  },

  hasResultCount(result = [], params = { count: 0 }) {
    return result.length === params.count;
  },

  equalTo(result, params) {
    if (!params) throw 'Params undefined!';
    for (let key in params) {
      console.log(result[key], params[key]);
      if (result[key] !== params[key]) {
        return false;
      }
    }

    return true;
  },
};

module.exports = evaluators;
