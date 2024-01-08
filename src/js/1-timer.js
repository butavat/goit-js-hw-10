// Імпорт бібліотек
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Оголошення змінних
let userSelectedDate;
let timerInterval;

// Ініціалізація flatpickr
const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(), // Змінила на Date.now()
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) { // Змінила на Date.now()
      showErrorToast();
      // Деактивувати кнопку при обранні минулої дати
      document.querySelector('[data-start]').disabled = true;

      // Вивести в консоль елемент перед зміною стилів
      console.log(document.getElementById('error-popup'));

      // Відобразити вікно помилки
      document.getElementById('error-popup').style.display = 'block';
    } else {
      // Активувати кнопку при обранні майбутньої дати
      document.querySelector('[data-start]').disabled = false;

      // Зберегти обрану дату
      userSelectedDate = selectedDate;

      // Приховати вікно помилки, якщо воно вже відображено
      document.getElementById('error-popup').style.display = 'none';
    }
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
function showErrorToast() {
  iziToast.show({
    title: 'Error',
    message: 'Please choose a date in the future',
    timeout: false,
    position: 'topCenter',
    close: false,
    overlay: true,
    displayMode: 2,
    maxWidth: '400px',
    theme: 'dark',
    layout: 2,
    titleColor: '#FFF',
    messageColor: '#FFF',
    backgroundColor: '#EF4040',
    progressBarColor: '#FFF',
    onClose: function () {
      // Логіка, яка виконується при закритті повідомлення
    },
  });
}

// Функція для оновлення інтерфейсу таймера
function updateTimerInterface() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    updateInterfaceValues(convertMs(0));
    showErrorToast();
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