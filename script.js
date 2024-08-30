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


//  Professionlal Skills Glow
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
var mixer = mixitup('.portfolio-gallery')

// swipper Section----------



