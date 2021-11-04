// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show } from "./lib/ui.js";
import { el } from "./lib/helpers.js";
import { createButtons } from "./lib/ui.js";
import { updateResultScreen } from "./lib/ui.js";
import { checkGame } from "./lib/rock-paper-scissors.js";
import { computerPlay } from "./lib/rock-paper-scissors.js";

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  const computer = computerPlay().toString();
 
  console.log("spilar:" + player);
  console.log("tölva:" + computer);

  const result = checkGame(player, computer);

  if (result === 1){
    playerWins++;
  }
  else if (result === -1){
    computerWins++;
  }

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if (result != 0){
    currentRound++;
  }

  // Ákveðum hvaða takka skuli sýna
  if (currentRound <= totalRounds){
    document.querySelector(".finishGame").classList.add("hidden");
    document.querySelector(".nextRound").classList.remove("hidden");
  }else {
    document.querySelector(".finishGame").classList.remove("hidden");
    document.querySelector(".nextRound").classList.add("hidden");
  }

  if (playerWins >= Math.floor(totalRounds / 2 + 1) || computerWins >= Math.floor(totalRounds / 2 + 1)){
    finishGame();
  }

  // Sýnum niðurstöðuskjá
  show("result");
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  totalRounds = e.target.dataset.num;
  currentRound = 1;

  //setja gildi á takkanum
  show("play");
}

// Takki sem byrjar leik
document
  .querySelector(".start button")
  .addEventListener("click", () => show("rounds"));

// Búum til takka
createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
document
  .querySelector("button.scissor")
  .addEventListener("click", () => playRound("1"));
document
  .querySelector("button.paper")
  .addEventListener("click", () => playRound("2"));
document
  .querySelector("button.rock")
  .addEventListener("click", () => playRound("3"));

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  let resultDesc;
  // Bætum við nýjasta leik, Uppfærum stöðu
  if (playerWins > computerWins){
    totalWins++;
    resultDesc = "Þú vannst " + playerWins + "–" + computerWins;
  }
  else if (computerWins > playerWins){
    resultDesc = "Tölvan vann " + playerWins + "–" + computerWins;
  }

  console.log(resultDesc);
  
  games.push({player: playerWins, computer: computerWins, wins: playerWins > computerWins});

  const totalGames = games.length;
  const totalLosses = totalGames - totalWins;

  // Bætum leik við lista af spiluðum leikjum
  document.querySelector(".games__played").textContent = totalGames.toString();
  document.querySelector(".games__wins").textContent = totalWins.toString();
  document.querySelector(".games__losses").textContent = totalLosses.toString();
  document.querySelector(".games__winratio").textContent = (100 * (totalWins / totalGames).toFixed(2)).toString();
  document.querySelector(".games__lossratio").textContent = (100 * (totalLosses / totalGames).toFixed(2)).toString();


  //el með list item, setja inn relevant einingar, appendchild við list item
  const resultList = document.querySelector(".games__list");
  const resultReport = el("li", resultDesc);
  resultList.appendchild(resultReport);

  // Núllstillum breytur
  playerWins = 0;
  computerWins = 0;

  // Byrjum nýjan leik!
  show("start");
}

// Næsta umferð og ljúka leik takkar
document
  .querySelector("button.finishGame")
  .addEventListener("click", finishGame);

document.querySelector("button.nextRound").addEventListener("click", () => show("play"));
