window.onload = function () {
	var temp = document.getElementById('keytitle').innerText;
	var occupied = new Array(); 
	occupied = window.localStorage[temp].split(',');
	for (var i = 0; i < occupied.length; i++) {
		document.getElementById(occupied[i]).className = 'seat not_able';
	}
}