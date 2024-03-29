
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log('data', data);
//     });    
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');
let messageThree = document.querySelector('#message-3');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading'    
    fetch('/weather?address='+location).then( (response) => {
        console.log('response', response);
        response.json().then( (data) => {
            console.log('data', data)
            if(data.error) {
                console.log(data.error);
                messageOne.textContent = 'Error';
                messageTwo.textContent = data.error;
            } else {
                console.log(data.location);
                messageOne.textContent = data.location;
                console.log(data.summary);
                messageTwo.textContent = data.summary;
                console.log(data.currently);
                messageThree.textContent = data.nativeSummary+'  Current Time: '+new Date(Number(data.currently)*1000);
            }
            
        });    
    });
})