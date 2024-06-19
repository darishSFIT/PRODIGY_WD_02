let startTime, elapsedTime = 0, intervalId;
const timeDisplay = document.getElementById('time-display');
const recordsContainer = document.getElementById('records');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const recordButton = document.getElementById('record-btn');
const clearRecordsButton = document.getElementById('clear-records-btn');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function start() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    recordButton.disabled = false;
    timeDisplay.classList.remove('blink');
}

function pause() {
    clearInterval(intervalId);
    startButton.disabled = false;
    pauseButton.disabled = true;
    timeDisplay.classList.add('blink');
}

function reset() {
    clearInterval(intervalId);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    recordButton.disabled = true;
    timeDisplay.classList.remove('blink');
}

function record() {
    const recordTime = formatTime(elapsedTime);
    const recordElement = document.createElement('div');
    recordElement.textContent = recordTime;
    recordElement.classList.add('record');
    recordsContainer.appendChild(recordElement);
}

function clearRecords() {
    recordsContainer.innerHTML = '';
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
recordButton.addEventListener('click', record);
clearRecordsButton.addEventListener('click', clearRecords);

pauseButton.disabled = true;
resetButton.disabled = true;
recordButton.disabled = true;