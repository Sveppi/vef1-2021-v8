/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
export function isValidBestOf(bestOf, maxBestOf) {
  if (bestOf === null) {
    return false;
  } else if (bestOf >= maxBestOf || bestOf < 1) {
    return false;
  } else {
    if (bestOf % 2 === 0) {
      return false;
    } else {
      return true;
    }
  }
}
//console.assert(isValidBestOf(1) === true, '1 er valid best of');
//console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
//console.assert(isValidBestOf(9) === true, '9 er valid best of');

/**
 * Breytir því sem spilað var úr tölu í texta
 * @param {string} play Hverju var spilað sem tölu
 * @returns Textaheiti þess sem spilað var
 */
export function playAsText(play) {
  if (play === "1") {
    return "skæri";
  } else if (play === "2") {
    return "blað";
  } else if (play === "3") {
    return "steinn";
  } else {
    return "Óþekkt";
  }
}
//console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
//console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
//console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');
//console.assert(playAsText('2') === 'Blað', '2 táknar blað');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
export function checkGame(player, computer) {
  if (
    (player === "1" && computer === "2") ||
    (player === "2" && computer === "3") ||
    (player === "3" && computer === "1")
  ) {
    return 1;
  } else if (player === computer) {
    return 0;
  } else {
    return -1;
  }
}
//console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
//console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
//console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
//console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
//console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar fyrir tölvu.
 * Hér væri hægt að taka inn _fyrri_ leiki spilari til að gera tölvu snjallari..
 *
 * @returns {number} Heiltala á bilinu [1, 3]
 */
export function computerPlay() {
  return (Math.floor(Math.random() * 3) + 1).toString();
}
