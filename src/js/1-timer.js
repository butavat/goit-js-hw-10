// Отримуємо DOM-елементи
const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval;

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      userSelectedDate = selectedDate;
      startButton.removeAttribute('disabled');
    } else {
      userSelectedDate = null;
      startButton.setAttribute('disabled', true);
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: 5000,
        closeOnClick: true,
        drag: false,
      });
    }
  },
});

startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', true);
  startTimer(userSelectedDate);
});

function startTimer(targetDate) {
  const initialTime = targetDate.getTime() - new Date().getTime();

  function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = targetDate.getTime() - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay({ days, hours, minutes, seconds });
  }

  timerInterval = setInterval(updateTimer, 1000);
  updateTimer(); // Викликаємо оновлення відразу після старту, щоб уникнути затримки
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}