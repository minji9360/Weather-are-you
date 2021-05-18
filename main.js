const weatherButtonsContainer = document.querySelector("#weatherContainer");

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

function init() {}

init();
