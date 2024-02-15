let currentFlashcardIndex = 0;
const flashcards = [
    {
      title: 'SULAA (2)',
      frontImage: 'image17.png',
      backImage: 'assets/back/image41.png',
      content: `
    <div class="flashcard-header">
        <h2>Aurinko sulaa lumen</h2>
    </div>
    <div class="flashcard-list">
        <ol>
            <li>First shit whatever bullshit lol what</li>
            <li>Second shit whatever bullshit lel</li>
        </ol>
    </div>`
    },
    {
      title: 'SULATTAA (2)',
      frontImage: 'a2.png',
      backImage: 'assets/back/image29.png',
      content: `
      <div class="flashcard-header">
        <h2>Aurinko sulaa lumen.</h2>
      </div>
      <div class="flashcard-list">
        <ol>
            <li>Sulattaa + obj</li>
            <li>Second</li>
        </ol>
    </div>
    `
    },
  // Add more flashcards as needed
];

function displayFlashcard(index) {
  const flashcard = flashcards[index];
  const flashcardContainer = document.getElementById('flashcardContainer');
  flashcardContainer.innerHTML = `
    <div class="flashcard" onclick="this.classList.toggle('flipped')">
      <div class="front" id="front_flash">
      </div>
      <div class="back" id="back_flash">
            <div class="back-content">
            <h2 class="flashcard-title">${flashcard.title}</h2>
            ${flashcard.content}
            <!-- Render HTML content -->
        </div>
      </div>
    </div>
  `;
  document.getElementById('front_flash').style.backgroundImage = `url(${flashcard.frontImage})`;
  document.getElementById('back_flash').style.backgroundImage = `url(${flashcard.backImage})`;

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
