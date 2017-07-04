// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var pattObj = /^{(.*)}$/;
  var pattArr = /^\[(.*)]$/;
  var pattStr = /^("(.*)")|('(.*)')$/;
  var pattDigit = /^(-?\d*.?\d*)$/;

  if(json === "null") return null;
  if(json === "false") return false;
  if(json === "true") return true;

  if(pattStr.test(json)){
    if(json === ''){
      return "";
    }
    var arr = json.match(pattStr);
    var str = arr[2];
    return str;
  }

  if(pattArr.test(json)) {
    var arr = [];

    var insideArr = json.match(pattArr)[1];

    if(insideArr !== ''){
      var insideArrSplit = insideArr.split(",");

      for(var i = 0; i < insideArrSplit.length; i++){
        arr.push(parseJSON(insideArrSplit[i].trim()));
      }
    }
    return arr;
  }

  if(pattObj.test(json)){
    var obj = {};

    var insideObj = json.match(pattObj)[1];

    if(insideObj !== '') {
      var arraySplit = parseCommaSplit(insideObj);

      for (var i = 0; i < arraySplit.length; i++) {
        var arrKeyVal = parseObjectSplit(arraySplit[i]);
        var key = arrKeyVal[0].trim();
        var val = arrKeyVal[1].trim();
        key = parseJSON(key);
        val = parseJSON(val);

        if (!isFunction(val) && val !== undefined) {
          obj[key] = val;
        }
      }
    }
    return obj;
  }

  if(pattDigit.test(json)){
    return Number(json);
  }

  throw new SyntaxError;

};


var parseObjectSplit = function(str){
  var doubleQuote = 0;
  var singleQuote = 0;
  var openCurBracket = 0;
  var closeCurBracket = 0;
  var openBracket = 0;
  var closeBracket = 0;
  var results = [];
  var newStr = "";

  for(var i = 0; i < str.length; i++){
    var c = str.charAt(i);
    if(c === '\"') {
      newStr += c;
      doubleQuote++;
    } else if(c === "\'"){
      newStr += c;
      singleQuote++;
    } else if(c === "{"){
      newStr += c;
      openCurBracket++;
    } else if(c === "}") {
      newStr += c;
      closeCurBracket++;
    } else if(c === "["){
      newStr += c;
      openBracket++;
    } else if(c === "]") {
      newStr += c;
      closeBracket++;
    } else if(c === ':' && doubleQuote % 2 === 0 && singleQuote % 2 === 0 && openCurBracket === closeCurBracket && openBracket === closeBracket){
      results.push(newStr);
      newStr = "";
    } else {
      newStr += c;
    }
  }

  if(closeBracket !== openBracket || closeCurBracket !== openCurBracket){
    throw new SyntaxError;
  }

  results.push(newStr);

  return results;

};

var parseCommaSplit = function(str){
  var doubleQuote = 0;
  var singleQuote = 0;
  var openCurBracket = 0;
  var closeCurBracket = 0;
  var openBracket = 0;
  var closeBracket = 0;
  var results = [];
  var newStr = "";

  for(var i = 0; i < str.length; i++){
    var c = str.charAt(i);
    if(c === '"') {
      newStr += c;
      doubleQuote++;
    } else if(c === "'") {
      newStr += c;
      singleQuote++;
    } else if(c === "{") {
      newStr += c;
      openCurBracket++;
    } else if(c === "}") {
      newStr += c;
      closeCurBracket++;
    } else if(c === "[") {
      newStr += c;
      openBracket++;
    } else if(c === "]") {
      newStr += c;
      closeBracket++;
    } else if(c === ','&& doubleQuote % 2 === 0 && singleQuote % 2 === 0 && openCurBracket === closeCurBracket && openBracket === closeBracket){
      results.push(newStr);
      newStr = "";
    } else {
      newStr += c;
    }
  }

  if(closeBracket !== openBracket || closeCurBracket !== openCurBracket){
    throw new SyntaxError;
  }

  results.push(newStr);

  return results;
};

var isFunction = function(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};