// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  //inpuut some object or item
  //output that object 'stringifyed' if possible
  if (typeof obj === 'number' || typeof obj === 'boolean'){
    return obj.toString();
  }
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }

  if (Array.isArray(obj)){
    var result = '[';

    for (var i = 0; i < obj.length; i++){
      result += stringifyJSON(obj[i]) + ",";
    }

    if (obj.length > 0){
      result  = result.slice(0,-1);
    }

    result += "]";

    return result;
  }
  if (obj === null) {
    return 'null';
  }
  if (typeof obj === 'object') {
    var result = [];
    for (var keys in obj) {
      if (obj.hasOwnProperty(keys) && obj[keys] !== undefined && typeof(obj[keys]) !== 'function' ) {
        result.push(stringifyJSON(keys) + ':' + stringifyJSON(obj[keys]));
      }
    }
    return  '{' + result.join(',') + '}'
  }
};
