// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var arrPatt = /^\[(.*)]$/;
  var objPatt = /^{(.*)}$/;

  if(arrPatt.test(json)) {
    return [];
  }
  if (objPatt.test(json)) {
    return {};
  }
//trivial change
};
