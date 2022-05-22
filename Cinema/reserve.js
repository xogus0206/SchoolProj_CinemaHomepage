/* 함수 */
var reserve = new Array(8);

/* 영화 선택 */
function mSelect() {
	// 변수 선언
	var movieNum;
	var movieName;
	var movieDate = new Array();
	// 어떤 영화를 체크했는지 확인하고 value를 movieNum에 저장
	var movieList = document.getElementsByName('movie');
	for (var i = 0; i < 6; i++) {
		if (movieList[i].checked == true) {
			movieNum = movieList[i].value;
		}
	}
	// movieNum 값으로 로컬 스토리지에서 날짜 정보를 불러옴
	if (movieNum == null) {
		alert('영화를 하나 선택하십시오')
	} else {
		movieName = window.localStorage[movieNum];
		movieDate = window.localStorage[movieName].split(',');
		document.getElementById('firstDate1').value = movieDate[0];
		document.getElementById('secondDate1').value = movieDate[1];
		document.getElementById('firstDate2').innerText = '5월 '+ movieDate[0] +'일';
		document.getElementById('secondDate2').innerText = '5월 '+ movieDate[1] +'일';
		// 버튼 활성화
		document.getElementById('dateButton').style.visibility = 'visible';
		// temp1에 선택한 영화 이름 저장
		window.localStorage['temp1'] = movieName;
	}
}

/* 날짜 선택 */
function dSelect() {
	// 변수 선언
	var movieDate;
	var movieTime =  new Array();;
	var movieName = window.localStorage['temp1'];
	// 어떤 날짜를 체크했는지 확인하고 value를 movieDate에 저장
	var dateList = document.getElementsByName('date');
	for (var i = 0; i < 2; i++) {
		if (dateList[i].checked == true) {
			movieDate = dateList[i].value; // 12, 25
		}
	}
	// movieTime 값으로 로컬 스토리지에서 시간 정보를 불러옴
	if (movieDate == null) {
		return alert('날짜를 하나 선택하십시오')
	} else {
		movieTime = window.localStorage[movieName + movieDate].split(','); // 13,15,17,19
		document.getElementById('firstTime1').value = movieTime[0] + ',' + movieTime[1];
		document.getElementById('secondTime1').value = movieTime[2] + ',' +movieTime[3];
		document.getElementById('firstTime2').innerText = movieTime[0]+':00 ~ '+movieTime[1]+':00';
		document.getElementById('secondTime2').innerText = movieTime[2]+':00 ~ '+movieTime[3]+':00';
		// 버튼 활성화
		document.getElementById('timeButton').style.visibility = 'visible';
		// temp2에 선택한 날짜 저장
		window.localStorage['temp2'] = movieDate;
	}
}

/* 시간 선택 */
function tSelect() {
	// 변수 선언
	var movieTime;
	var timeString;
	var t_array = new Array();
	// 어떤 시간을 체크했는지 확인하고 value를 movieTime에 저장
	var timeList = document.getElementsByName('time'); // 13,15, 17,19
	for (var i = 0; i < 2; i++) {
		if (timeList[i].checked == true) {
			movieTime = timeList[i].value; // 변수 t에 시간 값 입력
		}
	}
	// movieTime 값을 처리해서 로컬 스토리지에 저장
	if (movieTime == null) {
		return alert('시간을 하나 선택하십시오')
	} else {
		t_array = movieTime.split(',');
		timeString = t_array[0] + ":00 ~ " + t_array[1] + ":00";
		window.localStorage['temp3'] = movieTime; // 배열로 풀 수 있게 시간 저장
		window.localStorage['temp3_1'] = t_array[0] + t_array[1];
		window.localStorage['temp4'] = timeString; // 시간 풀어서 저장
		// 버튼 활성화
		document.getElementById('customerButton').style.visibility = 'visible';
	}
}

/* 인원 선택 */
function pSelect() {
	// if로 선택 인원 아무것도 없으면 0으로 값을 변환
	var teen = document.getElementById('teen').value;
	if (teen=='') { teen = '0'};
	var adult = document.getElementById('adult').value;
	if (adult=='') { adult = '0'};
	var elder = document.getElementById('elder').value;
	if (elder=='') { elder = '0'};
	var total = parseInt(teen) + parseInt(adult) + parseInt(elder);

	// 인원 체크 및 alert
	if (total == 0) {
		return alert('최소한 1명 이상은 선택하십시오.')
	} else if (total > 8) {
		return alert('9명 이상의 예매는 불가능합니다. 다시 선택하십시오.')
	} else {
		// 가격 측정 및 temp 저장
		var teenPrice = teen * 8000;
		var adultPrice = adult * 10000;
		var elderPrice = elder * 6000;
		var totalPrice = teenPrice + adultPrice + elderPrice;
		window.localStorage['temp5'] = teen;
		window.localStorage['temp6'] = adult;
		window.localStorage['temp7'] = elder;
		window.localStorage['temp8'] = totalPrice;

		// 가격 표시
		document.getElementById("money").innerText = totalPrice + "원";

		// 영화이름, 날짜, 시간 정보를 바탕으로 극장 좌석 정보 불러오기
		var movieName = window.localStorage['temp1'];
		var movieDate = window.localStorage['temp2'];
		var movieTime = new Array();
		var movieTime = window.localStorage['temp3'].split(',');
		// 극장 좌석 정보 key ex) 춘희막이121315 --> 춘희막이가 12일 13:00~15:00에 상영되는 극장 좌석 정보 key
		var theaterNum = movieName + movieDate + movieTime[0] + movieTime[1];

		// 해당 좌석 정보 키에 해당하는 값이 있는지 확인 --> 즉, 이전에 예매한 좌석 확인
		var theater = window.localStorage[theaterNum];
		// 예매 정보가 있다면 해당 정보로 이미 예매된 좌석을 선택 불가 상태로 변경
		if (theater != null) {
			var occupied = new Array(); 
			occupied = theater.split(',');
			for (var i = 0; i < occupied.length; i++) {
				document.getElementById(occupied[i]).className = 'seat not_able';
			}
		}
		// 예매 화면 선명히 보이게
		document.getElementById('theater_container').style.filter = 'blur(0)';
		// 좌석 선택 확인 버튼 활성화
		document.getElementById('final').style.visibility = 'visible';
		alert(total + '개의 좌석을 선택하십시오!')
	}
}

/* 좌석 선택 */
var current = 0;
var seatsChosen = new Array();
window.localStorage['temp10'] = 0;

// 특정 좌석(num) 선택 기능
function chooseSeat(num) {
	var total_people = parseInt(window.localStorage['temp5']) + parseInt(window.localStorage['temp6']) + parseInt(window.localStorage['temp7']);
	var select = document.getElementById(num).className;

	// 해당 좌석이 선택 가능
	if (select == 'seat') {
		// 현재까지 선택한 좌석의 수가 선택 인원보다 적다면 선택 가능
		if (current < total_people) {
			document.getElementById(num).className = 'seat selected';
			seatsChosen.push(num)
			current += 1;
		} else {
			return alert("선택한 인원보다 많은 좌석을 예매할 수 없습니다.")
		}
	// 선택한 좌석을 취소할 경우
	} else if (select == 'seat selected') {
		document.getElementById(num).className = 'seat';
		deleteElement(seatsChosen, num)
		current -= 1;
	} else {
		// 이외의 경우는 선택 불가능한 좌석
		return alert('해당 좌석은 이미 예매되어 있는 상태입니다.')
	}
	// temp에 선택한 좌석 배열 변수와 길이 변수를 저장
	window.localStorage['temp9'] = seatsChosen;
	window.localStorage['temp10'] = seatsChosen.length;
}

// 좌석 취소할 경우 좌석 배열 변수에서 좌석 삭제
function deleteElement(arr, element) {
	for(var i = 0; i < arr.length; i++) {
  		if(arr[i] == element) {
    		arr.splice(i, 1);
    		i--;
  		}
	}
}

// 예매하기 마무리 확인
function finalSelect() {
	var seat_num = window.localStorage['temp10'];
	var total_people = parseInt(window.localStorage['temp5']) + parseInt(window.localStorage['temp6']) + parseInt(window.localStorage['temp7']);
	if (seat_num < total_people) {
		return alert('인원 수에 맞는 좌석을 고르시오.')
	}
	var price = window.localStorage['temp8'];
	result = window.confirm('총 가격은 ' + price + '원 입니다.');
	if (result == true) {
		reservePush();
		while (true) {
			var rand = Math.random(); // 랜덤으로 예매 코드 발행
			if (window.localStorage[rand] == null) {
				if (window.localStorage['check'] == null) { // check키에 아무런 값이 없다면
					var check_key = new Array();
					check_key.push(rand);
				} else {
					var temp = window.localStorage['check']; // check키에 해당하는 값을 꺼내와서 여기에다 예매 코드 하나 더 추가
					var check_key = temp.split(",");
					check_key.push(rand);
				}
				window.localStorage['check'] = check_key;  // check키에 예매 코드 배열을 값으로 지정
				window.localStorage[rand] = reserve; // 해당 예매 코드를 키로 하여 reserve 배열(예매 정보)을 값으로 가짐
				break;
			} else {
				continue;
			}
		}
		// 극장 좌석 정보 저장
		var movieTime = new Array();
		var movieTime = window.localStorage['temp3'].split(',');
		takenSeats_key = window.localStorage['temp1'] + window.localStorage['temp2'] + movieTime[0] + movieTime[1];
		// 극장 좌석 정보 key ex) 춘희막이121315 --> 춘희막이가 12일 13:00~15:00에 상영되는 극장 좌석 정보 key
		if (window.localStorage[takenSeats_key] == null) { // 해당 극장에 예매된 좌석이 있는지 확인, 없으면 새롭게 만듦
			var occupied = new Array();
			occupied = window.localStorage['temp9'].split(',');
			window.localStorage[takenSeats_key] = occupied;
		} else {
			// 예매된 좌석이 있다면 해당 값을 가져와 새롭게 예매된 좌석을 추가
			var occupied = new Array();
			var temp = window.localStorage[takenSeats_key].split(',');
			occupied = window.localStorage['temp9'].split(',');
			occupied.push(temp);
			window.localStorage[takenSeats_key] = occupied;
		}
		tempReset();
		window.location.replace('07_check.html');
	} else {
		var reset = confirm('처음부터 다시 하시겠습니까?');
		if (reset == true) {
			tempReset();
			window.location.replace('05_reserve.html');
		}
	}
}

// reserve 배열에 temp 값 집어넣기
function reservePush(){
	reserve[0] = window.localStorage['temp1'];
	reserve[1] = window.localStorage['temp2'];
	reserve[2] = window.localStorage['temp4'];
	reserve[3] = window.localStorage['temp5'];
	reserve[4] = window.localStorage['temp6'];
	reserve[5] = window.localStorage['temp7'];
	reserve[6] = window.localStorage['temp8'];
	reserve[7] = window.localStorage['temp3_1']
	reserve[8] = window.localStorage['temp9'];
}

// temp값 모두 삭제 및 초기화
function tempReset(){
	window.localStorage.removeItem('temp1');
	window.localStorage.removeItem('temp2');
	window.localStorage.removeItem('temp3');
	window.localStorage.removeItem('temp3_1');
	window.localStorage.removeItem('temp4');
	window.localStorage.removeItem('temp5');
	window.localStorage.removeItem('temp6');
	window.localStorage.removeItem('temp7');
	window.localStorage.removeItem('temp8');
	window.localStorage.removeItem('temp9');
	window.localStorage.removeItem('temp10');
}

// 페이지 초기화
function reset(){
	var reset = confirm('처음부터 다시 하시겠습니까?');
		if (reset == true) {
			tempReset();
			window.location.replace('05_reserve.html');
		}
}