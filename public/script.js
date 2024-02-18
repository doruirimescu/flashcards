let flashcards=[];
const params = new URLSearchParams(window.location.search);
const param_type = params.get('type'); // This will be 'verb' if the URL was flashcard.html?type=verb
let currentFlashcardIndex = 0;

var languageData = null;
var currentLanguage = null;

if (localStorage.getItem('selectedLanguage')) {
    currentLanguage = localStorage.getItem('selectedLanguage')
}
else{
    location.replace('index.html');
}

if (localStorage.getItem('languageData')) {
    languageData = localStorage.getItem('languageData')
    languageData = JSON.parse(languageData);
}
else{
    location.replace('index.html');
}

if (languageData == null || currentLanguage == null) {
    location.replace('/index.html');
}

async function getAllData() {
    if (param_type != "all"){
        flashcards = await getDataForType(param_type);
        displayFlashcard(currentFlashcardIndex);
    }
    else {
        sections = languageData[currentLanguage]["sections"];
        for (const section of sections) {
            if (section !== "all") {
                const sectionFlashcards = await getDataForType(section);
                flashcards = flashcards.concat(sectionFlashcards);
            }
        }
        displayFlashcard(currentFlashcardIndex);
    }
}

getAllData();

async function getDataForType(type) {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `./data/${currentLanguage}/${type}.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}${currentLanguage}/${type}.json`;
    }
    try {
        const response = await fetch(fetch_url);
        const data = await response.json();
        return data.flashcards;
    }
    catch (error) {
        console.error('Error:', error);
        location.replace('/index.html');
    }
}

function updateStats(currentIndex, totalCards) {
    const percentage = (currentIndex / totalCards) * 100;
    document.querySelector('.progress-bar').style.width = `${percentage}%`;
    document.getElementById('cardStats').textContent = `Cards visited: ${currentIndex} / ${totalCards}`;
}

function displayFlashcard(index) {
    if (!flashcards.length) return; // Guard clause in case flashcards are empty or not yet loaded
    const flashcard = flashcards[index];
    preloadImage(flashcard.frontImage);
    preloadImage(flashcard.backImage);
    const flashcardContainer = document.getElementById('flashcardContainer');
    flashcardContainer.innerHTML = `
        <div class="front" id="frontFlash"></div>

        <div class="back" id="backFlash">
            <div class="back-content">
                <div class="flashcard-title">
                    ${flashcard.title}
                </div>
                <div class="flashcard-sentence">
                    <h2>${flashcard.sentence}</h2>
                </div>
                <div class="flashcard-list">
                    ${flashcard.listContent.length > 0 ? `<ul>${flashcard.listContent.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
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

function preloadImage(url) {
    const img = new Image();
    img.src = url;
    img.loading = "lazy"; // This is for lazy loading
}

document.getElementById('nextButton').addEventListener('click', () => {
    currentFlashcardIndex = (currentFlashcardIndex + 1);
    if (currentFlashcardIndex >= flashcards.length)
    {
        currentFlashcardIndex = flashcards.length - 1;
    }
    displayFlashcard(currentFlashcardIndex);
  });

document.getElementById('previousButton').addEventListener('click', () => {
    currentFlashcardIndex = (currentFlashcardIndex - 1) % flashcards.length;
    if (currentFlashcardIndex < 0)
    {
        currentFlashcardIndex = 0;
    }
    displayFlashcard(currentFlashcardIndex);
});

document.getElementById('firstButton').addEventListener('click', () => {
    currentFlashcardIndex = 0;
    updateStats(currentFlashcardIndex + 1, flashcards.length);
    displayFlashcard(currentFlashcardIndex);
});

document.getElementById('lastButton').addEventListener('click', () => {
    currentFlashcardIndex = flashcards.length-1;
    updateStats(currentFlashcardIndex + 1, flashcards.length);
    displayFlashcard(currentFlashcardIndex);
});
