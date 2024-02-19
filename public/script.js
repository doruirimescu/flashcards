import { IS_HOSTED_LOCALLY, GITHUB_FETCH_URL, getStructure } from "./config.mjs";
let flashcards=[];
const params = new URLSearchParams(window.location.search);
const param_type = params.get('type'); // This will be 'verb' if the URL was flashcard.html?type=verb
const param_topic = params.get('topic');
let currentFlashcardIndex = 0;


async function getAllData() { // Assuming param_type and param_topic are parameters of this function
    if (param_type !== "all") {
        return await getDataForType(param_type);
    } else {
        const languageData = await getStructure("./data/");
        const sections = languageData[param_topic]["sections"];
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


async function init(){
    const progressBarColor = window.getComputedStyle(document.querySelector('.progress-bar')).getPropertyValue('background-color');
    document.querySelector('.progress-bar').style.backgroundColor = "red";

    flashcards = await getAllData();
    // preload all images
    for (const flashcard of flashcards) {
        preloadImage(flashcard.frontImage);
        preloadImage(flashcard.backImage);

        // update progress bar
        updateStats(flashcards.indexOf(flashcard) + 1, flashcards.length, "Preloading images");
    }
    document.querySelector('.progress-bar').style.backgroundColor = progressBarColor;

    displayFlashcard(currentFlashcardIndex);
}
init();

async function getDataForType(type) {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `./data/${param_topic}/${type}.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}${param_topic}/${type}.json`;
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

function preloadImage(url) {
    const img = new Image();
    img.src = url;
    img.loading = "eager"; // This is for lazy loading
}

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

// Set the
const indexButton = document.getElementById('index')
indexButton.onclick = function() {
    location.href = `../index.html?topic=${param_topic}`;
}
