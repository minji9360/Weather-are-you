const weatherButtonsContainer = document.querySelector("#weatherContainer");

function clickWeatherButtons(clickedButton) {
	const buttons = clickedButton.parentNode.querySelectorAll("button");
	for (i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("clicked");
	}

	clickedButton.classList.add("clicked");
}

function init() {
	// console.log(weatherButtonsContainer.querySelector(""));
}

init();
