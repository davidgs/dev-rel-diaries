const count = document.getElementById('count');
const input = document.getElementById('mde-quote-input');
var globalWordCounter = 0;
const WORD_LIMIT = 250;

input.addEventListener('keydown', function (e) {
  if (globalWordCounter > WORD_LIMIT && e.code !== "Backspace") {
    e.preventDefault();
    return alert("You have reached the word limit");
  }
});

input.addEventListener('keyup', function (e) {
  wordCounter(e.target.value);
});

function isWord(str) {
  var alphaNumericFound = false;
  for (var i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if ((code > 47 && code < 58) || // numeric (0-9)
      (code > 64 && code < 91) || // upper alpha (A-Z)
      (code > 96 && code < 123)) { // lower alpha (a-z)
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

function wordCounter(text) {
  var text = input.value.replace(/\n/g, " ");
  var charCount = 0;
  for (var i = 0; i < text.length; i++) {
    charCount++;
  }
  text = text.split(' ');
  var wordCount = 0;
  for (var i = 0; i < text.length; i++) {
    if (!text[i] == ' ' && isWord(text[i])) {
      wordCount++;
    }
  }
  var wordcharCount = wordCount.toString() + " Character Count: " + charCount.toString();
  globalWordCounter = wordcharCount;
  count.innerText = wordcharCount;
}