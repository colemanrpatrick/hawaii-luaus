var isIE9 = false;
var ua = window.navigator.userAgent;

if (ua.indexOf('MSIE 9.0') > -1) {
  isIE9 = true;
}

if (isIE9) {
  // The user is using IE9
  alert("You are using Internet Explorer 9. We recommend upgrading to a modern web browser for better security and performance.");
} else {
  // The user is not using IE9 Continue as normal
}
