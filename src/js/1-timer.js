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
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      // Деактивувати кнопку при обранні минулої дати
      document.querySelector('[data-start]').disabled = true;

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

// Функція для оновлення інтерфейсу таймера
function updateTimerInterface() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    // Зупинити таймер, якщо час сплив
    clearInterval(timerInterval);
    // Оновити інтерфейс з нульовими значеннями
    updateInterfaceValues(convertMs(0));
  } else {
    // Оновити інтерфейс
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
  // Деактивувати кнопку при натисканні
  document.querySelector('[data-start]').disabled = true;

  // Запускати оновлення таймера кожну секунду
  timerInterval = setInterval(updateTimerInterface, 1000);

  // Оновити таймер вперше для відображення значень
  updateTimerInterface();
});