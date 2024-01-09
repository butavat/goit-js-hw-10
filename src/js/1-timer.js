// Імпорт бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.start-button');

// Оголошення змінних
let userSelectedDate;
let timerInterval;

// Ініціалізація flatpickr
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];




    if (selectedDate < Date.now()) {
      return iziToast.error({
        position: 'topCenter',
        title: 'Error',
        titleColor: '#FFF',
        message: 'Please choose a date in the future',
        messageColor: '#FFF',
      })
    }
    startBtn.disabled = false;
        userSelectedDate = selectedDate;
  },
});

// Функція для підрахунку часу
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

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для відображення помилки за допомогою iziToast


// Функція для оновлення інтерфейсу таймера
function updateTimerInterface() {
  const currentTime = Date.now();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    iziToast.success({
        position: 'topCenter',
      title: 'success',
        titleColor: '#FFF',
      message: 'Time is out!',
        messageColor: '#FFF',
      })
  } else {
    updateInterfaceValues(convertMs(timeDifference));
  }
}

// Функція для оновлення значень в інтерфейсі
function updateInterfaceValues({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Навішайте обробник подій на кнопку Start
document.querySelector('[data-start]').addEventListener('click', () => {
  document.querySelector('[data-start]').disabled = true;
  timerInterval = setInterval(updateTimerInterface, 1000);
  updateTimerInterface();
});