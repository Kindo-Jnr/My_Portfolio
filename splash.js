// Elements
const helloContainer = document.getElementById('hello-container');
const timerText = document.getElementById('timer-text');
const progressCircle = document.querySelector('.progress-ring-circle');
const skipButton = document.getElementById('skip-button');

// "Hello" in different languages
const hellos = [
  "Hello", // English
  "你好", // Spanish
  "Bonjour", // French
  "Ciao", // Italian
  "Hallo", // German
  "こんにちは", // Japanese (Konnichiwa)
  "Welcome!", // Japanese (Konnichiwa)
];
let index = 0;

// Timer settings
let progress = 0; // Start at 0%
const duration = 3500; // 3 seconds
const intervalTime = 30; // Update every 30ms for smooth animation
const steps = duration / intervalTime; // Total number of steps
const increment = 100 / steps; // Percentage increment per step
const circumference = 283; // Circumference of the circle (2 * π * r)

// Function to flash "Hello" in different languages
function flashHellos() {
  helloContainer.textContent = hellos[index];
  index = (index + 1) % hellos.length; // Cycle through the array
}

// Function to update the timer and progress circle
function updateTimer() {
  progress += increment;
  const offset = circumference - (progress / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
  timerText.textContent = `${Math.min(Math.round(progress), 100)}%`;

  if (progress >= 100) {
    clearInterval(flashInterval);
    clearInterval(timerInterval);
    // Redirect to the main page with the splash parameter
    setTimeout(() => {
      window.location.href = "main.html?splash=1";
    }, 350); // Match the duration of any additional transition
  }
}

// Start flashing "Hello" every 500ms
const flashInterval = setInterval(flashHellos, 500);

// Start the progress timer
const timerInterval = setInterval(updateTimer, intervalTime);

// Skip button functionality
skipButton.addEventListener('click', () => {
  clearInterval(flashInterval);
  clearInterval(timerInterval);
  window.location.href = "main.html?splash=1";
});

