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
    let topWord = data.word;
    let word = Object.keys(topWord);
    let count = Object.values(topWord);

    let wordCount = document.querySelector('.word-count');
    let topWordField = document.querySelector('#word');

    topWordField.innerHTML += word;

    wordCount.innerHTML = `<p>${count}</p>`;
  })
  .catch(error => console.error(error))



  let breakDown = document.getElementById('break-down');
  breakDown.addEventListener('click', function (e) {
    let textArea = document.querySelector('textarea');

    let noNewLine = textArea.value.replace(/\n/g, " ");
    let words = noNewLine.split(" ");

    for (var i= 0; i< words.length; i++){
      postWords(words[i]);
    }

    alert("Your string has been added to database!");

    //prevent the normal submission of the form
    e.preventDefault();

  });
})
