const buttonStartEl = document.querySelector("[data-start]");
const buttonStopEl = document.querySelector("[data-stop]");
let timerId = null;


buttonStartEl.addEventListener('click', onButtonStart);

function onButtonStart() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    buttonStartEl.disabled = true;
}


buttonStopEl.addEventListener('click', onButtonStop);

function onButtonStop() {
    clearInterval(timerId);
    buttonStartEl.disabled = false;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
