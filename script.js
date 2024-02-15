let currentFlashcardIndex = 0;
var flashcards;
var json = $.getJSON("test.json", function(json) {
    flashcards = json.flashcards;
    console.log(flashcards); // this will show the info it in firebug console


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
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length; // Loop back to the first card after the last

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
});
