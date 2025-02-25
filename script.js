// ==================== Splash Page Logic ====================
const splashPage = document.querySelector('.splash-page');

if (splashPage) {
  const helloContainer = document.getElementById('hello-container');
  const timerText = document.getElementById('timer-text');
  const progressCircle = document.querySelector('.progress-ring-circle');
  

  // "Hello" in different languages
  const hellos = [
    "Hello", // English
    "Hola", // Spanish
    "Bonjour", // French
    "Ciao", // Italian
    "Hallo", // German
    "こんにちは", // Japanese (Konnichiwa)
    "Welcome!", // Welcome
  ];
  let index = 0;

  // Timer settings
  let progress = 0; // Start at 0%
  const duration = 7000; // 3 seconds
  const intervalTime = 70; // Update every 30ms for smooth animation
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
      // Play a sound effect
      const sound = new Audio('sounds/complete.mp3'); // Add a sound file
      sound.play();
      document.body.style.opacity = '0'; // Fade out the page
      setTimeout(() => {
        window.location.href = "main.html"; // Redirect after fade-out
      }, 500); // Match the duration of the fade-out
    }
  }

  // Start flashing "Hello" every 500ms
  const flashInterval = setInterval(flashHellos, 1000);

  // Start the progress timer
  const timerInterval = setInterval(updateTimer, intervalTime);

  // Skip button functionality
  skipButton.addEventListener('click', () => {
    clearInterval(flashInterval);
    clearInterval(timerInterval);
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = "main.html";
    }, 700);
  });
}

// ==================== Existing JavaScript ====================
// Select all elements with the "word" class
let words = document.querySelectorAll(".word");

// Split each word into letters and wrap each letter in a span element
words.forEach((word) => {
  let letters = word.textContent.split(""); // Trim extra spaces
  word.textContent = ""; // Clear the word's text content
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter; // Non-breaking space for spaces
    span.className = "letter";
    word.append(span);
  });
});

// Initialize variables for tracking current word index and max word index
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Set initial opacity for the first word
words[currentWordIndex].style.opacity = "1";

// Function to change the text with animation
let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  // Animate letters of the current word out
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  // Animate letters of the next word in
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.classList.remove("behind");
      letter.classList.add("in");
    }, 340 + i * 80);
  });

  // Update currentWordIndex for the next iteration
  currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// Call changeText initially and set it to repeat every 300ms
changeText();
setInterval(changeText, 3000);

// Experience Section Tabs---------------------
function openExperience(evt, jobName) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from all tab buttons
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the selected tab content and add active class to the button
  document.getElementById(jobName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Automatically open the first tab when the page loads
document.getElementById("defaultOpen").click();

function toggleText(button) {
  var fullText = button.previousElementSibling;

  if (fullText.style.display === "none" || fullText.style.display === "") {
    fullText.style.display = "block";
    button.textContent = "Read Less";
  } else {
    fullText.style.display = "none";
    button.textContent = "Read More";
  }
}

// Professional Skills Glow
const circles = document.querySelectorAll('.circle');

circles.forEach(elem => {
  var dots = parseInt(elem.getAttribute("data-dots")); // Parse dots as integer
  var marked = parseInt(elem.getAttribute("data-percent")); // Parse marked as integer
  var percent = Math.floor((dots * marked) / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`; // Fixed typo in rotate variable
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll('.points'); // Fixed typo in class selector
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked');
  }
});

// Mix it up Section----------
var mixer = mixitup('.portfolio-gallery');

// Active menu----------
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// Sticky Navbar--------
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('header');
  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 50);
  });
});

// Toggle Icon Navbar------
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x"); // Toggle the icon class
  navlist.classList.toggle("open"); // Toggle the 'open' class on navlist
}

// Close the menu when a nav link is clicked
navlist.querySelectorAll("a").forEach(link => {
  link.onclick = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
  };
});

// Tooltip-------------
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Reviews Section
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

let runtime = 3000; // Animation duration
let timeAutoNext = 7000; // Auto-slide interval
let runtimeout;
let runAutoRun;

// Event Listeners for Next and Previous Buttons
nextDom.onclick = function () {
  showSlider('next');
};
prevDom.onclick = function () {
  showSlider('prev');
};

// Function to Show the Next/Previous Slide
function showSlider(type) {
  let itemSlider = document.querySelectorAll('.carousel .list .item');
  let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

  if (type === 'next') {
    listItemDom.appendChild(itemSlider[0]); // Move the first item to the end
    thumbnailDom.appendChild(itemThumbnail[0]); // Move the first thumbnail to the end
    carouselDom.classList.add('next');
  } else if (type === 'prev') {
    let lastIndex = itemSlider.length - 1;
    listItemDom.prepend(itemSlider[lastIndex]); // Move the last item to the start
    thumbnailDom.prepend(itemThumbnail[lastIndex]); // Move the last thumbnail to the start
    carouselDom.classList.add('prev');
  }

  // Clear and Reset Timeout for Class Removal
  clearTimeout(runtimeout);
  runtimeout = setTimeout(() => {
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
  }, runtime);

  // Restart Auto-Run Timer
  clearTimeout(runAutoRun);
  runAutoRun = setTimeout(() => {
    showSlider('next');
  }, timeAutoNext);
}

// Auto-run the Next Slide
runAutoRun = setTimeout(() => {
  showSlider('next');
}, timeAutoNext);