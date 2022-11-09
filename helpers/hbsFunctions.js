function ifeq(a, b, options){
  if (a === b) {
    return options.fn(this);
    }
  return options.inverse(this);
}
function filter(arr, val, options){
    if (arr !== undefined){
        let str = []
        arr.forEach(element => {
            element.param == val ? (str += options.fn(element)) : options.inverse(this);
        });
        return str
    }
}

module.exports = {ifeq, filter}