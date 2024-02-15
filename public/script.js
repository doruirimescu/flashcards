let flashcards=[];
const params = new URLSearchParams(window.location.search);
const type = params.get('type'); // This will be 'verb' if the URL was flashcard.html?type=verb

console.log('type:', type);
console.log("IS RUNNING LOCAL:", IS_RUNNING_ON_LOCAL);

if (IS_RUNNING_ON_LOCAL === true) {
    /* Fetch from local server */
    fetch(`http://localhost:3001/flashcards?type=${type}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        flashcards = data.flashcards;
        displayFlashcard(currentFlashcardIndex);
    })
    .catch(error => console.error('Error fetching flashcards:', error));
}
else{
    /* Fetch from github main */

}

let currentFlashcardIndex = 0;

function updateStats(currentIndex, totalCards) {
    const percentage = (currentIndex / totalCards) * 100;
    document.querySelector('.progress-bar').style.width = `${percentage}%`;
    document.getElementById('cardStats').textContent = `Cards visited: ${currentIndex} / ${totalCards}`;
}

function displayFlashcard(index) {
    if (!flashcards.length) return; // Guard clause in case flashcards are empty or not yet loaded

    const flashcard = flashcards[index];
    const flashcardContainer = document.getElementById('flashcardContainer');
    flashcardContainer.innerHTML = `
        <div class="front" id="frontFlash"></div>
        <div class="back" id="backFlash">
            <div class="back-content">
                <h2 class="flashcard-title">${flashcard.title}</h2>
                <div class="flashcard-sentence">
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
