
// ======================================
// 1. VARIABEL
// ======================================

// Skor kedua tim
let homeScore = 0;
let guestScore = 0;

// Fouls kedua tim
let homeFouls = 0;
let guestFouls = 0;

// Periode
let period = 1;

// Timer 10 menit = 600 detik
const timerDuration = 600;
let remainingSeconds = timerDuration;

// Status timer
let timerId = null;
let endTime = 0;


// ======================================
// 2. MENGAMBIL ELEMEN HTML
// ======================================

const homeScoreEl =
    document.getElementById("home-score");

const guestScoreEl =
    document.getElementById("guest-score");

const homeFoulsEl =
    document.getElementById("home-fouls");

const guestFoulsEl =
    document.getElementById("guest-fouls");

const periodEl =
    document.getElementById("period");

const timerEl =
    document.getElementById("timer");

const timerButton =
    document.getElementById("timer-button");

const homePanel =
    document.getElementById("home-panel");

const guestPanel =
    document.getElementById("guest-panel");

const leaderStatus =
    document.getElementById("leader-status");


// ======================================
// 3. FUNGSI MENAMBAHKAN SKOR
// ======================================

function addScore(team, points) {

    if (team === "home") {
        homeScore += points;
    }

    if (team === "guest") {
        guestScore += points;
    }

    updateBoard();
}


// ======================================
// 4. FUNGSI UPDATE SCOREBOARD
// ======================================

function updateBoard() {

    // Update angka skor
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;

    // Update fouls
    homeFoulsEl.textContent = homeFouls;
    guestFoulsEl.textContent = guestFouls;

    // Update period
    periodEl.textContent = period;

    // Menentukan tim pemimpin
    if (homeScore > guestScore) {

        homePanel.classList.add("leader");
        guestPanel.classList.remove("leader");

        leaderStatus.textContent = "HOME IS LEADING!";

    } else if (guestScore > homeScore) {

        guestPanel.classList.add("leader");
        homePanel.classList.remove("leader");

        leaderStatus.textContent = "GUEST IS LEADING!";

    } else {

        homePanel.classList.remove("leader");
        guestPanel.classList.remove("leader");

        leaderStatus.textContent = "GAME TIED";
    }
}


// ======================================
// 5. FUNGSI FOULS
// ======================================

function changeFoul(team, amount) {

    if (team === "home") {
        homeFouls = Math.max(0, homeFouls + amount);
    }

    if (team === "guest") {
        guestFouls = Math.max(0, guestFouls + amount);
    }

    updateBoard();
}


// ======================================
// 6. FUNGSI PERIOD
// ======================================

function changePeriod(amount) {

    period = Math.max(1, period + amount);

    updateBoard();
}


// ======================================
// 7. MENAMPILKAN TIMER
// ======================================

function updateTimer() {

    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    let displayMinutes =
        String(minutes).padStart(2, "0");

    let displaySeconds =
        String(seconds).padStart(2, "0");

    timerEl.textContent =
        displayMinutes + ":" + displaySeconds;

    // Teks tombol Start/Pause
    if (timerId !== null) {

        timerButton.textContent = "Pause";

    } else if (remainingSeconds === 0) {

        timerButton.textContent = "Finished";

    } else {

        timerButton.textContent = "Start";
    }

    timerButton.disabled = remainingSeconds === 0;
}


// ======================================
// 8. MENGHITUNG MUNDUR TIMER
// ======================================

function tickTimer() {

    let millisecondsLeft = endTime - Date.now();

    remainingSeconds = Math.max(
        0,
        Math.ceil(millisecondsLeft / 1000)
    );

    if (remainingSeconds === 0) {

        clearInterval(timerId);
        timerId = null;
    }

    updateTimer();
}


// ======================================
// 9. START DAN PAUSE TIMER
// ======================================

function toggleTimer() {

    // Jika sedang berjalan, pause
    if (timerId !== null) {

        tickTimer();

        clearInterval(timerId);
        timerId = null;

        updateTimer();
        return;
    }

    // Jangan mulai jika sudah 00:00
    if (remainingSeconds === 0) {
        return;
    }

    // Menentukan target waktu selesai
    endTime = Date.now() + remainingSeconds * 1000;

    // Mengulang pengecekan setiap 200 ms
    timerId = setInterval(tickTimer, 200);

    updateTimer();
}


// ======================================
// 10. RESET TIMER
// ======================================

function resetTimer() {

    clearInterval(timerId);
    timerId = null;

    remainingSeconds = timerDuration;

    updateTimer();
}


// ======================================
// 11. NEW GAME
// ======================================

function newGame() {

    // Reset skor
    homeScore = 0;
    guestScore = 0;

    // Reset pelanggaran
    homeFouls = 0;
    guestFouls = 0;

    // Reset periode
    period = 1;

    // Reset timer
    resetTimer();

    // Update display
    updateBoard();
}


// ======================================
// 12. TAMPILAN AWAL
// ======================================

updateBoard();
updateTimer();
