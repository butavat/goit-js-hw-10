// Імпорт бібліотеки iziToast
import iziToast from "izitoast";
// Додатковий імпорт стилів бібліотеки iziToast
import "izitoast/dist/css/iziToast.min.css";

// Отримання форми та її елементів
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');
const submitButton = form.querySelector('button[type="submit"]');

// Обробка події сабміту форми
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Отримання значення затримки та стану з форми
  const delay = parseInt(delayInput.value, 10);
  const selectedState = Array.from(stateInputs).find(input => input.checked).value;

  // Створення та обробка промісу
  const promise = new Promise((resolve, reject) => {
    if (selectedState === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  // Обробка виконання промісу
  promise.then(
    // Викликається при вдалому виконанні промісу
    (result) => {
      // Виведення повідомлення типу 'Fulfilled'
      iziToast.success({
          title: 'Fulfilled promise',
          titleColor:'#FFF',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topCenter',
        // Властивості iziToast, які відповідають за вигляд повідомлення
        backgroundColor: '#59A10D',
        messageColor: '#FFF',  // колір тексту
        timeout: 5000,  // час, протягом якого повідомлення буде відображатися (в мілісекундах)
        progressBarColor: 'rgba(255, 255, 255, 0.5)',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    },
    // Викликається при відхиленні промісу
    (result) => {
      // Виведення повідомлення типу 'Rejected'
      iziToast.error({
          title: 'Rejected promise',
          titleColor:'#FFF',
        message: `❌ Rejected promise in ${result}ms`,
       position: 'topCenter',
        // Властивості iziToast, які відповідають за вигляд повідомлення
        backgroundColor: '#CC0000',
        messageColor: '#FFF',  // колір тексту
        timeout: 5000,  // час, протягом якого повідомлення буде відображатися (в мілісекундах)
        progressBarColor: 'rgba(255, 255, 255, 0.5)',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    }
  );
});