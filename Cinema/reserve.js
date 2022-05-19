/* 웹스토리지에 기본 정보 저장 */
/* 영화 선택 */
window.localStorage["01"] = "춘희막이";
window.localStorage["02"] = "시";
window.localStorage["03"] = "님아, 그 강을 건너지마오";
window.localStorage["04"] = "말임씨를 부탁해";
window.localStorage["05"] = "기적";
window.localStorage["06"] = "역할들";

/* 함수 */
var reserve = new Array(8);

/* 영화 선택 */
function mSelect() {
	var key; // 첫 키 ex) 01
	var m; // 영화이름 키 ex) 춘희막이
	var movieList = document.getElementsByName('movie');

	for (var i = 0; i < 6; i++) {
		if (movieList[i].checked == true) {
			key = movieList[i].value;
		}
	}
	if (key == null) {
		alert('영화를 하나 선택하십시오')
	} else {
		var url_1 = 'reDate' + key + '.html';
		document.getElementById("dateWindow").src = url_1; // 날짜 선택 페이지 부름
	}

	m = window.localStorage[key]; // 변수 m에 영화이름 부름
	window.localStorage['temp1'] = m;
}

/* 날짜 선택 */
function dSelect() {
	var d; // 날짜 ex) 25
	var date;
	var dateList = document.getElementsByName('date');

	for (var i = 0; i < 2; i++) {
		if (dateList[i].checked == true) {
			d = dateList[i].value; // 변수 d에 날짜 값 입력
		}
	}
	if (d == null) {
		return alert('날짜를 하나 선택하십시오')
	} else {
		var url_2 = 'reTime' + d + '.html';
		document.getElementById("timeWindow").src = url_2; // 날짜 선택 페이지 부름
	}
	date = d[2] + d[3];
	window.localStorage['temp2'] = date;
}

/* 시간 선택 */
function tSelect() {
	var t;
	var time;
	var timeList = document.getElementsByName('time');

	for (var i = 0; i < 2; i++) {
		if (timeList[i].checked == true) {
			t = timeList[i].value; // 변수 t에 시간 값 입력
		}
	}
	if (t == null) {
		return alert('시간을 하나 선택하십시오')
	} else {
		alert('날짜/시간 선택 완료! 인원을 선택하십시오')

		window.localStorage['temp3'] = t;
		time = t[0] + t[1] + ":00 ~ " + t[2] + t[3] + ":00"
		window.localStorage['temp4'] = time;
	}
}

/* 인원 선택 */
function pSelect() {
	var teen = document.getElementById('teen').value;
	var adult = document.getElementById('adult').value;
	var elder = document.getElementById('elder').value;
	var total = parseInt(teen) + parseInt(adult) + parseInt(elder);

	if (total == 0) {
		return alert('최소한 1명 이상은 선택하십시오.')
	} else if (total > 8) {
		return alert('9명 이상의 예매는 불가능합니다. 다시 선택하십시오.')
	} else {
		var teenPrice = teen * 8000;
		var adultPrice = adult * 10000;
		var elderPrice = elder * 5000;
		var totalPrice = teenPrice + adultPrice + elderPrice;
		window.localStorage['temp5'] = teen;
		window.localStorage['temp6'] = adult;
		window.localStorage['temp7'] = elder;
		window.localStorage['temp8'] = totalPrice;

		var key1 = window.localStorage['temp2'];
		var key2 = window.localStorage['temp3'];
		var url_3 = 'theater_' + key1 + key2 + '.html';
		document.getElementById("theater_container").src = url_3;
		document.getElementById("money").innerText = totalPrice + "원";
	}
}

/* 좌석 선택 */
var current = 0;
var seatsChosen = new Array();
window.localStorage['temp10'] = 0;
function chooseSeat(num) {
	var total_people = parseInt(window.localStorage['temp5']) + parseInt(window.localStorage['temp6']) + parseInt(window.localStorage['temp7']);
	var select = document.getElementById(num).className;

	if (select == 'seat') {
		if (current < total_people) {
			document.getElementById(num).className = 'seat selected';
			seatsChosen.push(num)
			current += 1;
		} else {
			return alert("선택한 인원보다 많은 좌석을 예매할 수 없습니다.")
		}
	} else if (select == 'seat selected') {
		document.getElementById(num).className = 'seat';
		deleteElement(seatsChosen, num)
		current -= 1;
	} else {
		return alert('해당 좌석은 이미 예매되어 있는 상태입니다.')
	}
	window.localStorage['temp9'] = seatsChosen;
	window.localStorage['temp10'] = seatsChosen.length;
}

function deleteElement(arr, element) {
	for(var i = 0; i < arr.length; i++) {
  		if(arr[i] == element) {
    		arr.splice(i, 1);
    		arr.length 
    		i--;
  		}
	}
}

function finalSelect() {
	var seat_num = window.localStorage['temp10'];
	var total_people = parseInt(window.localStorage['temp5']) + parseInt(window.localStorage['temp6']) + parseInt(window.localStorage['temp7']);
	if (seat_num < total_people) {
		return alert('인원 수에 맞는 좌석을 고르시오.')
	}
	var price = window.localStorage['temp8'];
	result = window.confirm('총 가격은 ' + price + '입니다.');
	if (result == true) {
		reservePush();
		while (true) {
			var rand = Math.random();
			if (window.localStorage[rand] == null) {
				if (window.localStorage['check'] == null) {
					var check_key = new Array();
					check_key.push(rand);
				} else {
					var temp = window.localStorage['check'];
					var check_key = temp.split(",");
					check_key.push(rand);
				}
				window.localStorage['check'] = check_key;
				window.localStorage[rand] = reserve;
				break;
			} else {
				continue;
			}
		}
		takenSeats_key = window.localStorage['temp1'] + window.localStorage['temp2'] + window.localStorage['temp3'];
		if (window.localStorage[takenSeats_key] == null) {
			var occupied = new Array();
			occupied = window.localStorage['temp9'].split(',');
			window.localStorage[takenSeats_key] = occupied;
		} else {
			var occupied = new Array();
			var temp = window.localStorage[takenSeats_key].split(',');
			occupied = window.localStorage['temp9'].split(',');
			occupied.push(temp);
			window.localStorage[takenSeats_key] = occupied;
		}
		tempReset();
		window.parent.location.href = '07_check.html'
	} else {
		var reset = confirm('처음부터 다시 하시겠습니까?');
		if (reset == true) {
			tempReset();
			window.parent.location.href = '05_reserve.html'
		}
	}
}

function reservePush(){
	reserve[0] = window.localStorage['temp1'];
	reserve[1] = window.localStorage['temp2'];
	reserve[2] = window.localStorage['temp4'];
	reserve[3] = window.localStorage['temp5'];
	reserve[4] = window.localStorage['temp6'];
	reserve[5] = window.localStorage['temp7'];
	reserve[6] = window.localStorage['temp8'];
	reserve[7] = window.localStorage['temp9'];
}

function tempReset(){
	window.localStorage.removeItem('temp1');
	window.localStorage.removeItem('temp2');
	window.localStorage.removeItem('temp3');
	window.localStorage.removeItem('temp4');
	window.localStorage.removeItem('temp5');
	window.localStorage.removeItem('temp6');
	window.localStorage.removeItem('temp7');
	window.localStorage.removeItem('temp8');
	window.localStorage.removeItem('temp9');
	window.localStorage.removeItem('temp10');
}