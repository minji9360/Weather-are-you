const weatherButtonsContainer = document.querySelector("#weatherContainer");

// var userURL = "http://127.0.0.1:5500/index2.html";
// function getWeather() {
// 	var xhr = new XMLHttpRequest();
// 	var url =
// 		"http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst"; /*URL*/
// 	var queryParams =
// 		"?" +
// 		encodeURIComponent("ServiceKey") +
// 		"=" +
// 		"L3%2BiSEpSWmyt%2FWOCfPWM7FGm1VFKlDiIeDm4OJ8pouGCm7DLYWT%2B7tfgJ3TACDrtdamcVTbtTlYga5PgCxIfbA%3D%3D"; /*Service Key*/
// 	queryParams +=
// 		"&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
// 	queryParams +=
// 		"&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
// 	queryParams +=
// 		"&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("XML"); /**/
// 	queryParams +=
// 		"&" +
// 		encodeURIComponent("base_date") +
// 		"=" +
// 		encodeURIComponent("20210524"); /**/
// 	queryParams +=
// 		"&" +
// 		encodeURIComponent("base_time") +
// 		"=" +
// 		encodeURIComponent("1113"); /**/
// 	queryParams +=
// 		"&" + encodeURIComponent("nx") + "=" + encodeURIComponent("18"); /**/
// 	queryParams +=
// 		"&" + encodeURIComponent("ny") + "=" + encodeURIComponent("1"); /**/
// 	xhr.open("GET", url + queryParams);
// 	xhr.onreadystatechange = function () {
// 		if (this.readyState == 4) {
// 			alert(
// 				"Status: " +
// 					this.status +
// 					"nHeaders: " +
// 					JSON.stringify(this.getAllResponseHeaders()) +
// 					"nBody: " +
// 					this.responseText
// 			);
// 		}
// 	};

// 	xhr.send("");
// }

function getNow() {
	const today = new Date();
	const year = today.getFullYear();
	const month = ("0" + (1 + today.getMonth())).slice(-2);
	const day = ("0" + today.getDate()).slice(-2);
	const hours = ("0" + today.getHours()).slice(-2); // 시
	const minutes = ("0" + today.getMinutes()).slice(-2); // 분

	return [year + month + day, hours + minutes];
}

function setNow() {
	const date = getNow();
	const dateHiddenInput = document.querySelector("#todayDate");
	const timeHiddenInput = document.querySelector("#nowTime");

	dateHiddenInput.value = date[0];
	timeHiddenInput.value = date[1];
}

// 날씨 카테고리 버튼 클릭 시 동작하는 함수
function clickWeatherButtons(clickedButton) {
	const buttons = clickedButton.parentNode.querySelectorAll("button");
	const blackButton = clickedButton.querySelector(".black");
	const whiteButton = clickedButton.querySelector(".white");
	const title = document.querySelector("#rank-weather");
	let idx = 0;

	// 버튼 click 상태에 따라 버튼 색상 변경
	for (i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("clicked");
		buttons[i].querySelector(".black").classList.remove("hidden");
		buttons[i].querySelector(".white").classList.add("hidden");
	}
	clickedButton.classList.add("clicked");
	blackButton.classList.add("hidden");
	whiteButton.classList.remove("hidden");

	// click된 버튼 확인
	const weatherNames = [
		"황사",
		"폭염/열대야",
		"이상고온",
		"집중호우",
		"태풍",
		"폭설",
		"한파",
	];

	for (i = 0; i < buttons.length; i++) {
		if (buttons[i].classList.contains("clicked")) {
			idx = i;
		}
	}

	// title 및 순위 변경
	title.innerHTML = weatherNames[idx];
}

function clickChatbotButton(type) {
	const startButton = document.querySelector("#startButton");
	const stopButton = document.querySelector("#stopButton");
	const chatbot = document.querySelector("#chatbot");

	if (type == "start") {
		startButton.classList.add("hidden");
		stopButton.classList.remove("hidden");
		chatbot.classList.remove("hidden");
	} else {
		startButton.classList.remove("hidden");
		stopButton.classList.add("hidden");
		chatbot.classList.add("hidden");
	}
}

function init() {
	setNow();
	object.onclick = function () {
		clickChatbotButton;
	};
	// getWeather();
	// getCurrentWeather();
}

init();
