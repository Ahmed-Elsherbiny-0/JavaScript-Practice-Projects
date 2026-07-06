'use strict';

// Coding Challenge #1
// We're building a football betting app (soccer for my American friends 😅)!
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored
// GOOD LUCK 😀
// The Complete JavaScript Course 16



const game = {
team1: 'Bayern Munich',
team2: 'Borrussia Dortmund',
players: [
[
'Neuer',
'Pavard',
'Martinez',
'Alaba',
'Davies',
'Kimmich',
'Goretzka',
'Coman',
'Muller',
'Gnarby',
'Lewandowski',
],
[
'Burki',
'Schulz',
'Hummels',
'Akanji',
'Hakimi',
'Weigl',
'Witsel',
'Hazard',
'Brandt',
'Sancho',
'Gotze',
],
],
score: '4:0',
scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
'Hummels'],
date: 'Nov 9th, 2037',
odds: {
team1: 1.33,
x: 3.25,
team2: 6.5,
},
printGoals(...players){
    players.forEach(e=>{
        console.log(e);
    });
    console.log(`total number is ${players.length}`);
}
};
//challeng1 

// const [player1,player2]=game.players;
// const [gk,...fieldPlayers]=player1;
// let allplayers=[...player1,...player2];

// const substitute=['Thiago', 'Coutinho' , 'Perisic'];
// const finalplayers=[...player1,...substitute];
// const {team1, x:draw ,team2}=game.odds;
// team1>team2&&console.log('team 2 win');
// team1<team2&&console.log('team 1 win');

//challenge 2

// 1-
// for (let [goal,name] of (game.scored).entries()){
//     console.log(`${name} and goal number is ${goal+1}`);
// }
// 3-
// for (let [name,value] of Object.entries(game.odds) )
// {
//     console.log(`odd of ${name!='x'?`victory ${game[name]}`:'draw'} : ${value}`)
// }
// -------------------------------------

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


// let st= new Set(gameEvents.values())
// console.log([gameEvents.values()])


// gameEvents.delete(64);

// console.log(gameEvents)




// -------------------------

// let arr=['ahmed ','ali','ali'];
// let mp =new Map();
// mp.set(document.querySelector('.ahmed').textContent.value);


// let st=new Set([1,2,3,3,3]);
// let ss=Object.entries([1,2,3,3,3]);
// console.log(ss);
// for(let x of ss)
//     console.log(x);


// const addtax =(rate)=>((value)=>value+value*rate);
// const mytax=addtax(10);
// console.log(mytax(20));




















/*

Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/


// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer(){
//     let x=Number(prompt(`${this.question} ${this.options.join('\n')}`));
// if (x &&x>=0&&x<=3)
// this.answers[x]++;
// console.log(poll.answers)
//   },
//   results(arr){

//   }
// }
// document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll))
// poll.registerNewAnswer();

// const securebooking =function(){
//   let pass=5;
//   return function(){
//     pass++;
//     console.log(`${pass} passengers`)
//   }
// }

// let boker=securebooking();
// boker();
// boker();
// boker();
// console.dir(boker);









// //closure 
// (function () {
//   const header = document.querySelector('h1');
//   header.style.color = 'red';
//   document.querySelector('body').addEventListener('click',function()
//   {header.style.color = 'blue'
//   })
// })(); 


let arr=[1,2,3,4,5];
for(let x of arr.entries()){
  console.log(x[0],x[1]);
}