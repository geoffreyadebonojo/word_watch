import $ from 'jquery';


function postWords(word){

  let cleanedWord = word.replace(/[^a-zA-Z ]/g, "");
  console.log(cleanedWord);

  let addWordsUrl = "http://localhost:3000/api/v1/words"
  let addWordsData = {
    word: { value: cleanedWord }
  }

  $.post(addWordsUrl, addWordsData, function(data, status){
      console.log(data);
  });
}


$(document).ready(() => {
  // have fun!

  fetch(`http://localhost:3000/api/v1/top_word`)
  .then(response => response.json())
  .then(data => {
    localStorage.setItem("topWord", JSON.stringify(data.word));
    let topWord = JSON.parse(localStorage.getItem("topWord"));
  })
  .catch(error => console.error(error))

  let wordCount = document.querySelector('.word-count');
  let topWord = JSON.parse(localStorage.getItem("topWord"));

  let word = Object.keys(topWord);
  console.log(word);

  let count = Object.values(topWord);
  console.log(count);

  wordCount.innerHTML = `${word}: ${count}`;

  let breakDown = document.getElementById('break-down');
  breakDown.addEventListener('click', function (e) {
    let textArea = document.querySelector('textarea');
    let words = textArea.value.split(" ");
    console.log(words);

    for (var i= 0; i< words.length; i++){
      postWords(words[i]);
    }

    //prevent the normal submission of the form
    e.preventDefault();

  });
})
