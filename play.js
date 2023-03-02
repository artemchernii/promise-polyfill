"use strict";
window.onload = function () {
    console.log('window loaded');
};
const artem = {
    name: 'Artem',
    age: 29,
    proff: 'developer',
};
document.body.innerHTML = `
   <h1>This is the story about ${artem.name}</h1>
   <p>He is ${artem.age} years old</p>
   <p>He is a ${artem.proff}</p>
`;
console.log(artem);
let limit = 2;
const promisePlay = new Promise((res, rej) => {
    console.log('limit is', limit);
    if (limit === 1)
        rej('Promise is rejected');
    setTimeout(() => {
        res('Promise is resolved');
    }, 2000);
});
promisePlay.then((val) => console.log(val)).catch((err) => console.log(err));
const button = document.createElement('button');
button.innerText = 'Click me';
button.onclick = () => {
    limit = 2;
    promisePlay
        .then((val) => console.log(val))
        .catch((err) => console.log(err));
};
document.body.appendChild(button);
