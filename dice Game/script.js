"use strict";
const random_Number = () => Math.trunc(Math.random() * 6) + 1;
const currentp1 = document.getElementById("current--0");
const currentp2 = document.getElementById("current--1");
const scoreplayer1 = document.getElementById("score--0");
const scoreplayer2 = document.getElementById("score--1");
const modal_add = () =>
  document.querySelector(".dice").classList.remove("hidden");
const model_remove = () =>
  document.querySelector(".dice").classList.add("hidden");
let dice_image = document.querySelector(".dice");
const active = function () {
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
};
let player1 = 0,
  cnt_player = 0;
document.querySelector(".btn--roll").addEventListener("click", function () {
  let val = random_Number();
  dice_image.src = `dice-${val}.png`;
  if (val != 1) {
    modal_add();
    player1
      ? (currentp1.textContent = val + cnt_player)
      : (currentp2.textContent = val + cnt_player);
    cnt_player += val;
  } else {
    model_remove();
    ((cnt_player = 0),
      (currentp1.textContent = 0),
      (currentp2.textContent = 0));
    active();
    player1 = !player1;
  }
});
// document.querySelector('.btn--roll').addEventListener('click',function(){
//     const val=random_Number();
//     document.querySelector('.dice').src=`dice-${val}.png`;
//     modal_add();
//     if (val!=1){
//         //    player1?(currentp1.textContent)=val+cnt_player:(currentp2.textContent)=val+cnt_player;
//         cnt_player+=val;
//         (document.getElementById(`current--${player1}`).textContent)=cnt_player;
//     }
//     else {
//         model_remove();
//         active();
//       player1==0?currentp1.textContent=0:currentp2.textContent=0;
//         cnt_player=0;
//         player1=Number(!player1);
//     }
// })
document.querySelector(".btn--hold").addEventListener("click", function () {
  model_remove();
  player1 != 0
    ? (scoreplayer1.textContent = Number(scoreplayer1.textContent) + cnt_player)
    : (scoreplayer2.textContent =
        Number(scoreplayer2.textContent) + cnt_player);
  player1 != 0 ? (currentp1.textContent = 0) : (currentp2.textContent = 0);
  active();
  cnt_player = 0;
  player1 = Number(!player1);
});
document.querySelector(".btn--new").addEventListener("click", function () {
  model_remove();
  ((player1 = true),
    (cnt_player = 0),
    (scoreplayer1.textContent = 0),
    (scoreplayer2.textContent = 0),
    (currentp1.textContent = 0),
    (currentp2.textContent = 0));
  active();
});
