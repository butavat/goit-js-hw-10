import"./assets/styles-b4e5ab85.js";import{i as r}from"./assets/vendor-651d7991.js";const t=document.querySelector(".form");t.addEventListener("submit",function(s){s.preventDefault();const l=t.querySelector('input[name="delay"]'),i=t.querySelectorAll('input[name="state"]'),o=parseInt(l.value,10),n=Array.from(i).find(e=>e.checked).value;new Promise((e,c)=>{setTimeout(n==="fulfilled"?()=>e(o):()=>c(o),o)}).then(e=>{r.success({title:"Fulfilled promise",titleColor:"#FFF",message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter",backgroundColor:"#59A10D",messageColor:"#FFF",timeout:5e3,progressBarColor:"rgba(255, 255, 255, 0.5)",close:!0,closeOnEscape:!0,closeOnClick:!0})},e=>{r.error({title:"Rejected promise",titleColor:"#FFF",message:`❌ Rejected promise in ${e}ms`,position:"topCenter",backgroundColor:"#CC0000",messageColor:"#FFF",timeout:5e3,progressBarColor:"rgba(255, 255, 255, 0.5)",close:!0,closeOnEscape:!0,closeOnClick:!0})})});
//# sourceMappingURL=commonHelpers2.js.map
