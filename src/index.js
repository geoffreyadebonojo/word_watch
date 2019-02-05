import $ from 'jquery';

function getWord(){
  //if (localStorage.getItem("storedForecast") == null)
  fetch(`http://localhost:3000/api/v1/top_word`)
  .then(response => response.json())
  .then(data => {
    localStorage.setItem("topWord", JSON.stringify(data.word));
    let topWord = JSON.parse(localStorage.getItem("topWord"));
    console.log(topWord);
  })
  .catch(error => console.error(error))
}

$(document).ready(() => {
  // have fun!
  console.log("hello?");
  let breakDownButton = document.querySelector('button');
  breakDownButton.addEventListener('click', function(){
    let textArea = document.querySelector('textarea');
    let value = textArea.value;
    console.log(value);
  });

  let wordCount = document.querySelector('.word-count');
  let topWord = JSON.parse(localStorage.getItem("topWord"));
  console.log(topWord);

  let word = Object.keys(topWord);
  console.log(word);

  let count = Object.values(topWord);
  console.log(count);

  wordCount.innerHTML = `${word}: ${count}`;

})
