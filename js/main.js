$(document).ready(function() {
	var item = localStorage.getItem('xxx');
	if (!item) {
  	console.log('store item');
  	localStorage.setItem('xxx', 'abc');
  }
});
