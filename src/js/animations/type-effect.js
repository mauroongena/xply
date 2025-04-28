const words = ["Lifestyle", "T-Shirts", "Front-Zips", "Hoodies", "Denims", "Sportswear"];
const changingText = document.querySelector(".changing-text");

let wordIndex = 0;
let charIndex = 0;
let typing = true;

export function typeEffect() {
  const currentWord = words[wordIndex];

  if (typing) {
    changingText.textContent = currentWord.slice(0, charIndex++);
    if (charIndex > currentWord.length) {
      typing = false;
      setTimeout(typeEffect, 1500); 
      return;
    }
  } else {
    changingText.textContent = currentWord.slice(0, charIndex--);
    if (charIndex < 0) {
      changingText.textContent = "";
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length; 
        typing = true;
        charIndex = 0; 
        typeEffect();
      }, 500); 
      return;
    }
  }

  setTimeout(typeEffect, typing ? 100 : 50);
}
