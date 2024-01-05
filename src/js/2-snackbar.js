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
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    },
    // Викликається при відхиленні промісу
    (result) => {
      // Виведення повідомлення типу 'Rejected'
      iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${result}ms`,
        position: 'topRight',
      });
    }
  );
});