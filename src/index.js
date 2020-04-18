import { Brain } from "./brain.js";

const brain = new Brain();

function setPos(post, img, pre) {
  if (pre === undefined) {
      post.classList.add(img)
  } else {
      pre.classList.remove(img)
      post.classList.add(img);
}
}
function reset() {
  const cells = document.querySelectorAll(".gamecell");
  for (let cell of cells) {
    while (cell.firstChild && cell.removeChild(cell.firstChild));
    cell.classList.remove("1", "2");
  }
  brain.reset();
  document.querySelector("#turn").textContent = "Game not started yet";
  removeEffect();
  start();
}
function start() {
  for (let i = 0; i < 5; i++) {
    let imgGreen = "1";
    let imgBrown = "2";
    let green = document.querySelector(`div[id="${i}-0"]`);
    let brown = document.querySelector(`div[id="${i}-4"]`);
    setPos(green, imgGreen);
    setPos(brown, imgBrown);
    let lastGreen = document.querySelector('div[id="4-1"]');
    let lastbrown = document.querySelector('div[id="4-3"]');
    setPos(lastGreen, imgGreen);
    setPos(lastbrown, imgBrown);
    lastGreen = document.querySelector('div[id="0-1"]');
    lastbrown = document.querySelector('div[id="0-3"]');
    setPos(lastGreen, imgGreen);
    setPos(lastbrown, imgBrown);
  }
}
document.querySelector("body").addEventListener("load", start);
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", reset);

let startPVP = document.querySelector("#pvp");
startPVP.addEventListener("click", startGamepvp);

function startGamepvp() {
  reset();
  brain.beginGame();
  document.querySelector("#turn").innerText = `${brain.activePlayer}'s turn`;
  let divs = document.querySelectorAll(".gamecell");
  for (let div of divs) {
    div.addEventListener("click", function cellAction(event) {
      if (brain.activePlayer === 1) {
         if (event.currentTarget.classList.contains("1")) {
             removeEffect();
             possibleMovesDOM(
            event.currentTarget.dataset.row,
            event.currentTarget.dataset.column,
                 'green'
          );
        } else if (event.currentTarget.classList.contains("green")) {
          moveCell(
            event.currentTarget,
            brain.activePlayer,
            document.querySelector(".pressedG")
          );
          if (brain.gameActive) removeEffect();
        } else if (event.currentTarget.classList.contains("pressedG")) {
            removeEffect();
        }
      }
      else if (brain.activePlayer === 2) {
         if (event.currentTarget.classList.contains("2")) {
             removeEffect();
             possibleMovesDOM(
            event.currentTarget.dataset.row,
            event.currentTarget.dataset.column,
                 'brown'
          );
        } else if (event.currentTarget.classList.contains("brown")) {
          moveCell(
            event.currentTarget,
            brain.activePlayer,
            document.querySelector(".pressedB")
          );
          if (brain.gameActive) removeEffect();
        } else if (event.currentTarget.classList.contains("pressedB")) {
            removeEffect();
        }
      }
    });
  }}
    function possibleMovesDOM(r,c,color){
        let posMoves = brain.possibleMoves(r, c);
        for (let[key, arr] of Object.entries(posMoves)){
            let place = document.querySelector(`div[id="${arr[1]}-${arr[0]}"]`);
            if (!(place.className.includes('1') || place.className.includes('2'))){
              place.classList.add(color, "shake-little", "neongreen_txt");
          }}
        if (posMoves.length != 0){
          event.currentTarget.classList.add(`pressed${color[0].toUpperCase()}`);
        }}

  function removeEffect() {
    let gs = document.querySelectorAll(".green");
    let bs = document.querySelectorAll(".brown");
      if (gs.length != 0){
    for (let g of gs) {
      g.classList.remove("green", "shake-little", "neongreen_txt");
    }
    }
      else if (bs.length != 0){
    for (let g of bs) {
      g.classList.remove("brown", "shake-little", "neongreen_txt");
    }
  }
      if(document.querySelector('.pressedG')){
          let GS = document.querySelectorAll('.pressedG');
          for(let g of GS){
          g.classList.remove('pressedG');
      }}
      else if(document.querySelector('.pressedB')){
          let BS = document.querySelectorAll('.pressedB');
          for(let b of BS){
          b.classList.remove('pressedB');
      }
  }}

function moveCell(post, img, pre) {
  setPos(post, img, pre);
  let state = brain.move(
    pre.dataset.row,
    pre.dataset.column,
    post.dataset.row,
    post.dataset.column
  );
    console.log(state);
  if (state === 1) {
    turnWin('green')
    lightBoard('green');
  } else if (state === 2) {
    turnWin('brown');
    lightBoard('brown');
  }
  if (brain.activePlayer === 2) {
    let turn = document.querySelector("#turn");
    turn.textContent = "Brown player's turn";
    turn.classList.add("brown1");
    setTimeout(function() {
      turn.classList.remove("brown1");
    }, 1500);
  } else if (brain.activePlayer === 1) {
    let turn = document.querySelector("#turn");
    turn.textContent = "Green player's turn";
    turn.classList.add("green1");
    window.setTimeout(function() {
      turn.classList.remove("green1");
    }, 1500);
  }
}
function lightBoard(color){
    let cells = document.querySelectorAll('.gamecell');
    for (let cell of cells){
        cell.classList.add(color);
        window.setTimeout(function(){
            cell.classList.remove(color);
        }, 1500)
    }
}
function turnWin(color){
    let turn = document.querySelector("#turn");
    turn.innerText = `${color} wins`;
    turn.classList.add(`${color}1`);
}
