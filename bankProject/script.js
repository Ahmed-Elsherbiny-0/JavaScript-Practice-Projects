'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const createUsernames=function(accs){
    accs.forEach(e=>{
        e.username=e.owner.toLowerCase().split(' ').map(e =>e[0]).join('')
    });
};

const displayMovements  =function(account){
containerMovements.innerHTML='';

account.movements.forEach((e,i)=>{
 const str=`<div class="movements__row">
          <div class="movements__type movements__type--${e>=0?'deposit':'withdrawal'}">${i+1} ${e>=0?'deposit':'withdrawal'}</div>
          <div class="movements__value">${e}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin',str);
})};

const calcDisplayBalance=function(account){
    labelBalance.textContent=`${account.reduce((curr,e)=>curr+e,0)} EUR`;
}


let user=null;
btnLogin.addEventListener('click',(ele)=>{
ele.preventDefault();

 user=accounts.find((e)=> e.username==inputLoginUsername.value &&inputLoginPin.value==e.pin);
if (user){
    inputLoginPin.value=inputLoginUsername.value='';
    inputLoginPin.blur();
    containerApp.style.opacity=1;
       labelWelcome.textContent=`Good Day ,${user.owner.split(' ')[0]}`;
       displayMovements(user);
       calcDisplayBalance(user.movements);
       tick();
}
});

   btnTransfer.addEventListener('click',(e)=>{
    e.preventDefault();
    let person =accounts.find(e=>e.username==inputTransferTo.value);
    if (person&&person.username!==user.username){
       let amount= Number(inputTransferAmount.value);
        if(Number((labelBalance.textContent).split(' ')[0])>=amount){
            user.movements.push(-amount);
            displayMovements(user);
            calcDisplayBalance(user.movements);
            person.movements.push(amount);
        }
    }
     inputTransferAmount.value=inputTransferTo.value='';
    })



btnClose.addEventListener('click',(e)=>{
 e.preventDefault();
 let idx=accounts.findIndex(e=>e.username==inputCloseUsername.value&&e.pin==inputClosePin.value);
 inputClosePin.value=inputCloseUsername.value=''
 if (idx>=0&&idx<accounts.length){
    accounts.splice(idx,1);
    containerApp.style.opacity=0;
labelWelcome.textContent=`Log in to get started`;
 }
})








createUsernames(accounts);







const  r=account1.movements;
const res=r.reduce((acc,e)=>{return acc=e;},0);
console.log(res);


labelDate.textContent=(new Date()).toLocaleDateString("en-US",{
   hour: "2-digit",
  minute: "2-digit"
});


function tick (){
let time =1000;
let timer=setInterval(() => {
    let min=Math.trunc(time/60);
    let sec=time%60;
    labelTimer.textContent=`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    if (time==0){
        clearInterval(timer);
            containerApp.style.opacity=0;
labelWelcome.textContent=`Log in to get started`;
    }
    time--;
}, 1000);
}



