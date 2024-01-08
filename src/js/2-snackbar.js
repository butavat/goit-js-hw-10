import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = form.querySelector('input[name="delay"]');
  const stateInputs = form.querySelectorAll('input[name="state"]');
  
  const delay = parseInt(delayInput.value, 10);
  const selectedState = Array.from(stateInputs).find(input => input.checked).value;

  const promise = new Promise((resolve, reject) => {
    if (selectedState === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise.then(
    (result) => {
      iziToast.success({
        title: 'Fulfilled promise',
        titleColor: '#FFF',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topCenter',
        backgroundColor: '#59A10D',
        messageColor: '#FFF',
        timeout: 5000,
        progressBarColor: 'rgba(255, 255, 255, 0.5)',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    },
    (result) => {
      iziToast.error({
        title: 'Rejected promise',
        titleColor: '#FFF',
        message: `❌ Rejected promise in ${result}ms`,
        position: 'topCenter',
        backgroundColor: '#CC0000',
        messageColor: '#FFF',
        timeout: 5000,
        progressBarColor: 'rgba(255, 255, 255, 0.5)',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
      });
    }
  );
});