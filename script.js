'use strict';

// Memilih elemen DOM
const player0El = document.querySelector('#section-0');
const player1El = document.querySelector('#section-1');
const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const inputGiliran = document.querySelector('.giliran-main');
const mainEl = document.querySelector('main');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('#btn-baru');
const btnRoll = document.querySelector('#btn-putar');
const btnHold = document.querySelector('#btn-tahan');

// Variabel kondisi permainan
let scores, currentScore, activePlayer, playing;

// Helper: trigger animasi sekali pakai
const triggerAnim = function (el, className, duration = 600) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), duration);
};

// Fungsi Inisialisasi (Reset Game)
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = 'none';
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');

  inputGiliran.value = 'Giliran: Pemain 1';

  triggerAnim(mainEl, 'reset-anim', 500);
};

init();

// Fungsi untuk pindah pemain
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');

  inputGiliran.value = `Giliran: Pemain ${activePlayer + 1}`;
  triggerAnim(inputGiliran, 'giliran-flash', 500);
};

// Logika mengocok dadu
btnRoll.addEventListener('click', function () {
  if (playing) {
    btnRoll.disabled = true;
    btnHold.disabled = true;

    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.style.display = 'block';
    diceEl.classList.remove('rolling', 'landed', 'dice-one');
    void diceEl.offsetWidth;

    if (dice === 1) {
      diceEl.classList.add('dice-one');
    } else {
      diceEl.classList.add('rolling');
    }

    setTimeout(() => {
      diceEl.src = `./images/dadu-${dice}.png`;
    }, 300);

    setTimeout(() => {
      diceEl.classList.remove('rolling', 'dice-one');

      if (dice !== 1) {
        triggerAnim(diceEl, 'landed', 400);
        currentScore += dice;
        const currentScoreEl = document.getElementById(`current-${activePlayer}`);
        currentScoreEl.textContent = currentScore;
        triggerAnim(currentScoreEl, 'current-score-pop', 350);
      } else {
        setTimeout(() => switchPlayer(), 200);
      }

      btnRoll.disabled = false;
      btnHold.disabled = false;
    }, 800);
  }
});

// Logika menahan skor (Hold)
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    const scoreEl = document.getElementById(`score-${activePlayer}`);
    scoreEl.textContent = scores[activePlayer];
    triggerAnim(scoreEl, 'score-pop', 400);

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = 'none';

      const winnerSection = document.querySelector(`#section-${activePlayer}`);
      winnerSection.classList.add('player-winner');
      winnerSection.classList.remove('player-active');

      inputGiliran.value = `🏆 Pemain ${activePlayer + 1} Menang!`;
      triggerAnim(inputGiliran, 'giliran-flash', 600);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
