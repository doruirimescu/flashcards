import { IS_HOSTED_LOCALLY, GITHUB_FETCH_URL, getStructure } from "./config.mjs";

// Local variables
let flashcards=[];
const params = new URLSearchParams(window.location.search);
const paramType = params.get('type'); // This will be 'verb' if the URL was flashcard.html?type=verb
const paramTopic = params.get('topic');
const paramRandomize = params.get('randomize');
const paramStyle = params.get('style');
let currentFlashcardIndex = 0;

// Instant event listeners
document.getElementById('nextButton').addEventListener('click', () => {
    currentFlashcardIndex = Math.min(currentFlashcardIndex + 1,
        flashcards.length - 1);
    displayFlashcard(currentFlashcardIndex);
  });

document.getElementById('previousButton').addEventListener('click', () => {
    currentFlashcardIndex = Math.max(currentFlashcardIndex - 1, 0);
    displayFlashcard(currentFlashcardIndex);
});

document.getElementById('firstButton').addEventListener('click', () => {
    currentFlashcardIndex = 0;
    updateStats(currentFlashcardIndex + 1, flashcards.length);
    displayFlashcard(currentFlashcardIndex);
});

document.getElementById('lastButton').addEventListener('click', () => {
    currentFlashcardIndex = flashcards.length - 1;
    updateStats(currentFlashcardIndex + 1, flashcards.length);
    displayFlashcard(currentFlashcardIndex);
});

const indexButton = document.getElementById('index')
indexButton.onclick = function() {
    location.href = `../index.html`;
}

// Async function to initialize the flashcards
getAllData().then((retrievedFlashcards) => {
    // preload all images
    flashcards = retrievedFlashcards;
    // filter out the flashcards that don't match the style
    if (paramStyle !== "all") {
        flashcards = flashcards.filter(flashcard => flashcard.styles.includes(paramStyle));
    }

    for (const flashcard of flashcards) {
        preloadImage(flashcard.frontImage);
        preloadImage(flashcard.backImage);
    }
    if (paramRandomize === "true") {
        flashcards = flashcards.sort(() => Math.random() - 0.5);
    }
    displayFlashcard(currentFlashcardIndex);
});

async function getAllData() {
    if (paramType !== "all") {
        return await getDataForType(paramType);
    }
    else {
        const languageData = await getStructure("./data/");
        // get all keys of languageData[paramTopic]["sections"]

        const sections = Object.keys(languageData[paramTopic]["sections"]);
        const fetchPromises = sections.map(section => {
            if (section !== "all") {
                return getDataForType(section); // This returns a promise
            }
            else {
                return Promise.resolve([]); // Return an immediately resolved promise with an empty array for consistency
            }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(fetchPromises);

        // Flatten the array of results and concatenate into a single array
        const dat = results.flat(); // Assuming each call to getDataForType returns an array
        return dat;
    }
}

async function getDataForType(type) {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `./data/${paramTopic}/${type}.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}${paramTopic}/${type}.json`;
    }
    try {
        const response = await fetch(fetch_url);
        const data = await response.json();
        return data.flashcards;
    }
    catch (error) {
        console.error('Error:', error);
    }
}

function preloadImage(url) {
    const img = new Image();
    img.src = url;
    img.loading = "eager"; // This is for lazy loading
}

function updateStats(currentIndex, totalCards, text="Cards visited:") {
    const percentage = (currentIndex / totalCards) * 100;
    document.querySelector('.progress-bar').style.width = `${percentage}%`;
    document.getElementById('cardStats').textContent = `${text} ${currentIndex} / ${totalCards}`;
}

function displayFlashcard(index) {
    if (!flashcards.length) return; // Guard clause in case flashcards are empty or not yet loaded
    const flashcard = flashcards[index];
    const flashcardContainer = document.getElementById('flashcardContainer');
    flashcardContainer.innerHTML = `
        <div class="front" id="frontFlash"></div>
        <div class="back" id="backFlash"></div>
    `;
    document.getElementById('frontFlash').style.backgroundImage = `url(${flashcard.frontImage})`;
    document.getElementById('backFlash').style.backgroundImage = `url(${flashcard.backImage})`;
    document.querySelector('.front').style.setProperty('--bubble-content', `"${flashcard.frontContent}"`);

    updateStats(currentFlashcardIndex + 1, flashcards.length);
    document.getElementById('flashcardContainer').classList.remove('flipped');
}
