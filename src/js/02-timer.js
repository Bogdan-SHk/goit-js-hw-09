import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

buttonStartEl.disabled = true;
buttonStartEl.addEventListener('click', onButtonStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  startTime: null,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      buttonStartEl.disabled = false;
      options.startTime = selectedDates[0].getTime();
      return;
    }
    window.alert('Please choose a date in the future');
  },
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  isActive: false,
  timerId: null,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const ms = options.startTime - currentTime;
      if (ms < 1000) {
        clearInterval(this.timerId);
      }
      const time = convertMs(ms);
      updateTimerFace(time);
      console.log(time);
    }, 1000);
  },
};

function onButtonStart() {
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
