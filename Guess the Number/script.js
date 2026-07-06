'use strict';
console.log('hello');

console.log(document.querySelector('.message').textContent);
// document.querySelector('.guess').value = 12;
console.log(document.querySelector('.guess').value);
let secret = 50;
let cnt = Number(document.querySelector('.score').textContent);
const score = function () {
  cnt--;
  document.querySelector('.score').textContent = cnt;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (cnt == 0) alert('not valid');
  else if (!guess) {
    document.querySelector('.message').textContent = 'Not a Number';
    score();
  } else if (guess === secret) {
    document.querySelector('body').style.backgroundColor="#1097ad";
    document.querySelector('.number').style.width='30rem';
    document.querySelector('.number').textContent=secret;
    document.querySelector('.message').textContent = 'Correct';
    document.querySelector('.score').textContent = cnt;
  } else if (guess < secret) {
    document.querySelector('.message').textContent = 'Too Low';
    score();
  } else if (guess > secret) {
    score();document.querySelector('.message').textContent = 'Too heigh';
  }
});


document.querySelector('.again').addEventListener('click',
function (){
  let high=Number(document.querySelector('.highscore').textContent);
  const guess = Number(document.querySelector('.guess').value);
  document.querySelector('.highscore').textContent=Math.max(high,cnt);
  cnt=20;
  document.querySelector('body').style.backgroundColor='#222';
  document.querySelector('.score').textContent=cnt;
  document.querySelector('.message').textContent='Start guessing...';
  document.querySelector('.number').textContent='?';
  document.querySelector('.guess').value=0;
  
});