'use strict';

// Memilih elemen DOM
const player0El = document.querySelector('#section-0');
const player1El = document.querySelector('#section-1');
const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const inputGiliran = document.querySelector('.giliran-main');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('#btn-baru');
const btnRoll = document.querySelector('#btn-putar');
const btnHold = document.querySelector('#btn-tahan');

// Variabel kondisi permainan
let scores, currentScore, activePlayer, playing;

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

  diceEl.style.display = 'none'; // Sembunyikan dadu di awal
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  
  inputGiliran.value = "Giliran: Pemain 1";
};

// Jalankan reset di awal
init();

// Fungsi untuk pindah pemain
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  
  // Toggle class active untuk visual
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
  
  // Update teks input giliran
  inputGiliran.value = `Giliran: Pemain ${activePlayer + 1}`;
};

// Logika mengocok dadu
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate angka dadu acak (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Tampilkan dadu
    diceEl.style.display = 'block';
    diceEl.src = `./images/dadu-${dice}.png`;

    // 3. Cek apakah angka dadu 1
    if (dice !== 1) {
      // Tambahkan ke skor saat ini
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    } else {
      // Jika dapat 1, pindah pemain
      switchPlayer();
    }
  }
});

// Logika menahan skor (Hold)
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Tambahkan skor saat ini ke skor total pemain aktif
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // 2. Cek jika skor pemain sudah >= 100
    if (scores[activePlayer] >= 100) {
      // Selesai game
      playing = false;
      diceEl.style.display = 'none';
      
      document.querySelector(`#section-${activePlayer}`).classList.add('player-winner');
      document.querySelector(`#section-${activePlayer}`).classList.remove('player-active');
      inputGiliran.value = `Pemain ${activePlayer + 1} Menang!`;
    } else {
      // Pindah pemain
      switchPlayer();
    }
  }
});

// Reset game ketika tombol "Game Baru" diklik
btnNew.addEventListener('click', init);