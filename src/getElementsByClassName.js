// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, position) {
  var result = [];
  var elem = position === undefined ? document.body : position;
  //ver resutl  ;

  //var classes = elem.classList;
  if (elem.classList.contains(className)) {
    result.push(elem);
  }

  var children = elem.children;

  for (var i = 0; i < children.length; i++) {
    result = result.concat(getElementsByClassName(className, children[i]));
  }


  return result;

};
