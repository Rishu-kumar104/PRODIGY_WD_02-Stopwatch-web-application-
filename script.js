let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Format time to display in mm:ss:ms
function formatTime(time) {
  const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0');
  const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

// Start or pause the stopwatch
function startPauseStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.innerText = formatTime(elapsedTime);
    }, 10);
    startPauseBtn.innerText = 'Pause';
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.innerText = 'Start';
    isRunning = false;
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  display.innerText = '00:00:00.000';
  elapsedTime = 0;
  isRunning = false;
  startPauseBtn.innerText = 'Start';
  lapBtn.disabled = true;
  laps.innerHTML = '';
}

// Record a lap
function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.innerText = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.appendChild(lapItem);
}

// Event listeners for buttons
startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
