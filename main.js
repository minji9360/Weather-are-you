const weatherButtonsContainer = document.querySelector("#weatherContainer");

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
	const title = document.querySelector("#rank-weather");
	let idx = 0;

	// 버튼 click 상태에 따라 버튼 색상 변경
	for (i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("clicked");
	}
	clickedButton.classList.add("clicked");

	// click된 버튼에 따라 title 변경
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
	title.innerHTML = weatherNames[idx];
}

function init() {
	setNow();
	getWeather();
	// getCurrentWeather();
}

init();
