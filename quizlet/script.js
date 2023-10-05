const totalWords = document.querySelector('.info__total');
const doneWords = document.querySelector('.info__done');
const errorWords = document.querySelector('.info__error');
const card = document.querySelector('.card');
const cardWord = document.querySelector('.card__word');
const cardAnswer = document.querySelector('.card__answer');
const input = document.querySelector('.card__field');
const changeLinks = document.querySelectorAll('.change li');

for (let i = 0; i < changeLinks.length; i++) {
  if (i !== 0) {
    changeLinks[i].addEventListener('click', () => shuffleSet(eval(changeLinks[i].dataset.set)));
  } else {
    changeLinks[0].addEventListener('click', () => installSet(eval(changeLinks[i].dataset.set)));
  }
}

installSet(irregular_verbs);

function shuffleSet(set) {
  const shuffle = (array) => {
    let m = array.length, t, i;

    while (m) {

      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  installSet(shuffle(set));
}

function installSet(set) {
  totalWords.textContent = set.length;
  cardWord.textContent = set[0][0];
  cardAnswer.textContent = set[0][1];

  let wordCount = 1;
  let doneCount = 0;
  let errorCount = 0;
  let errorArr = [];

  doneWords.textContent = doneCount;
  errorWords.textContent = errorCount;

  cardAnswer.classList.remove('show');

  input.onchange = handleChange;
  input.focus();

  if (card.classList.contains('hide')) {
    card.classList.remove('hide');
  }

  function handleChange(e) {
    const target = e.target;
    const parent = target.parentElement;
    const word = parent.querySelector('.card__word').textContent;
    const answer = parent.querySelector('.card__answer').textContent;
    
    if (target.value !== answer) {
      updateErrorCount();
      saveError(word, answer, target.value);
      cardAnswer.classList.add('show');
      target.value = '';
    } else {
      target.value = '';
      cardAnswer.classList.remove('show');
      if (wordCount < set.length) {
        nextWords(wordCount++);
        updateDoneCount();
      } else {
        // cardWord.remove();
        // cardAnswer.remove();
        // input.remove();
        // card.textContent = 'конец';
        updateDoneCount();
        card.classList.add('hide')
      }
    }
  }

  function updateDoneCount() {
    doneCount++;
    doneWords.textContent = doneCount;
  }

  function updateErrorCount() {
    errorCount++;
    errorWords.textContent = errorCount;
  }

  function nextWords(id) {
    cardWord.textContent = set[id][0];
    cardAnswer.textContent = set[id][1];
  }

  function saveError(ru, yes, no) {
    errorArr.push([ru, yes, no]);
    console.log(`Слово: ${ru}   Правильно: ${yes}   Неправильно: ${no}`)
  }
}