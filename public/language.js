var currentLanguage = "";
var languageData = [];
import { getLanguageData } from "./config.mjs";


function populateLanguageSelection() {
    const selectElement = document.getElementById('language-select');
    // Retrieve the selected language from localStorage if it exists,
    // otherwise use the first language in the list
    if (!localStorage.getItem('selectedLanguage')) {
        localStorage.setItem('selectedLanguage', Object.keys(languageData)[0]);
    }
    currentLanguage = localStorage.getItem('selectedLanguage');

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
                location.href = `public/flashcard.html?type=${section}&topic=${currentLanguage}`;
            };
            container.appendChild(button);
        });
    }
}

async function init()
{
    languageData = await getLanguageData("public");
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
