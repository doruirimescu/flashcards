var currentLanguage = "";
var languageData = [];

async function getLanguageData() {
    var fetch_url = "";
    if (IS_HOSTED_LOCALLY === true) {
        fetch_url = `./public/data/structure.json`;
    }
    else {
        fetch_url = `${GITHUB_FETCH_URL}structure.json`;
    }
    const response = await fetch(fetch_url);
    const data = await response.json();
    return data;
}

function populateLanguageSelection() {
    const selectElement = document.getElementById('language-select');
    // Retrieve the selected language from localStorage if it exists
    currentLanguage = localStorage.getItem('selectedLanguage') || Object.keys(languageData)[0];

    for (var key in languageData){
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectElement.appendChild(option);
      }

    selectElement.value = currentLanguage; // Set the current language as selected
}

function updateCategoryButtons() {
    const selectedLanguage = languageData[currentLanguage];
    const container = document.getElementById('category-buttons');
    container.innerHTML = ''; // Clear existing buttons

    if (selectedLanguage) {
        selectedLanguage.sections.forEach(section => {
            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = section.charAt(0).toUpperCase() + section.slice(1); // Capitalize first letter
            button.onclick = function() {
                location.href = `public/flashcard.html?type=${section}`;
            };
            container.appendChild(button);
        });
    }
}

async function init()
{
    languageData = await getLanguageData();
    localStorage.setItem('languageData', JSON.stringify(languageData));
    populateLanguageSelection();
    updateCategoryButtons();

    // Call this function after populating the language selection and whenever the language changes
    document.getElementById('language-select').addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        updateCategoryButtons(); // Update buttons based on the newly selected language
    });
}

init();
