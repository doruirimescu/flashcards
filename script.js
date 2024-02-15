let currentFlashcardIndex = 0;
const flashcards = [
    {
      title: 'SULAA (1)',
      frontImage: 'assets/front/sulaa.png',
      backImage: 'assets/back/image41.png',
      frontContent:"The snow melts when the sun is shining",
      sentence: "Lumi sulaa, kun aurinko paistaa.",
      listContent:[
        "sulan / sulin / olen sulanut / olin sulanut",
        "sulaisin / olisin sulanut / sulettaisiin, ei sulettaisi",
        "<a href='https://www.verbix.com/webverbix/finnish/sulaa'>Verbix</a>"
      ]
    },
    {
      title: 'SULATTAA (1)',
      frontImage: 'assets/front/sulattaa.png',
      backImage: 'assets/back/image41.png',
      frontContent:"The sun melts the snow",
      sentence: "Aurinko sulttaa lumen.",
      listContent:[
        "Sulattaa + obj",
        "<a href='https://www.verbix.com/webverbix/finnish/sulttaa'>Verbix</a>"
      ]
    },
    {
        title: 'PYÖRITTÄÄ (1)',
        frontImage: 'assets/front/pyörittää.png',
        backImage: 'assets/back/image41.png',
        frontContent:"When a child rolls a snowball, it grows big",
        sentence: "Kun lapsi pyörittää lumipalloa, se kasvaa suureksi.",
        listContent:[
          "Pyörittää + obj",
          "suuri -> suure/n -> suureksi",
          "<a href='https://www.verbix.com/webverbix/finnish/sulttaa'>Verbix</a>"
        ]
      },
      {
        title: 'HIERTÄÄ (1)',
        frontImage: 'assets/front/hiertää.png',
        backImage: 'assets/back/image41.png',
        frontContent:"The shoe is chafing me",
        sentence: "Kenkä hiertää minua.",
        listContent:[
          "Hiertää + P",
          "hierrän / hiersin / olen hiertänyt / olin hiertänyt / hierrettäisiin, ei hierrettäisi",
          "<a href='https://www.verbix.com/webverbix/finnish/hiertaa'>Verbix</a>"
        ]
      },
];

function updateStats(currentIndex, totalCards) {
    const percentage = (currentIndex / totalCards) * 100;
    document.querySelector('.progress-bar').style.width = `${percentage}%`;
    document.getElementById('cardStats').textContent = `Cards visited: ${currentIndex} / ${totalCards}`;
}

function displayFlashcard(index) {
    const flashcard = flashcards[index];
    const flashcardContainer = document.getElementById('flashcardContainer');
    flashcardContainer.innerHTML = `
        <div class="front" id="frontFlash"></div>
        <div class="back" id="backFlash">
            <div class="back-content">
                <h2 class="flashcard-title">${flashcard.title}</h2>
                <div class="flashcard-header">
                    <h2>${flashcard.sentence}</h2>
                </div>
                <div class="flashcard-list">
                <ul>${flashcard.listContent.map((item) => `<li>${item}</li>`).join('')}</ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('frontFlash').style.backgroundImage = `url(${flashcard.frontImage})`;
    document.getElementById('backFlash').style.backgroundImage = `url(${flashcard.backImage})`;
    document.querySelector('.front').style.setProperty('--bubble-content', `"${flashcard.frontContent}"`);

    updateStats(currentFlashcardIndex + 1, flashcards.length);
    document.getElementById('flashcardContainer').classList.remove('flipped');
}


// Initialize with the first flashcard
displayFlashcard(currentFlashcardIndex);

document.getElementById('nextButton').addEventListener('click', () => {
    currentFlashcardIndex = (currentFlashcardIndex + 1); // Loop back to the first card after the last
    if (currentFlashcardIndex >= flashcards.length)
    {
        currentFlashcardIndex = flashcards.length - 1;
    }
    displayFlashcard(currentFlashcardIndex);
  });

document.getElementById('previousButton').addEventListener('click', () => {
    // if currentFlashcardIndex

    currentFlashcardIndex = (currentFlashcardIndex - 1) % flashcards.length; // Loop back to the first card after the last
    if (currentFlashcardIndex < 0)
    {
        currentFlashcardIndex = 0;
    }
    displayFlashcard(currentFlashcardIndex);
});
