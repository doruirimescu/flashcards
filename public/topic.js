import { getStructure } from "./config.mjs";
var structureData = [];
var shouldRandomize = false;
const params = new URLSearchParams(window.location.search);
let paramTopic = params.get('topic');

function populateCategorySelection() {
    const selectElement = document.getElementById('topic-select');

    if (!paramTopic) {
        paramTopic = Object.keys(structureData)[0];
    }

    for (var key in structureData){
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectElement.appendChild(option);
      }

    selectElement.value = paramTopic; // Set the current language as selected
}

function updateCategoryButtons() {
    const selectElement = document.getElementById('category-select');
    document.querySelector('label[for="category-select"]').textContent = 'Category:';
    document.getElementById("category-select").hidden = false;
    document.getElementById('start-button').hidden = false;
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }
    const selectedTopic = structureData[paramTopic];

    if (selectedTopic) {
        selectedTopic.sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section; // Capitalize first letter
            selectElement.appendChild(option);
        });
        selectElement.value = selectedTopic.sections[0]; // Set the first section as selected

        // set start button
        const startButton = document.getElementById('start-button');
        startButton.onclick = function() {
            location.href = `public/flashcard.html?type=${selectElement.value}&topic=${paramTopic}&randomize=${shouldRandomize}`;
        };
        // if selectedTopic is empty, disable start button
        if (selectedTopic.sections.length == 0) {
            startButton.hidden = true;
            document.querySelector('label[for="category-select"]').textContent = 'No content available';
            document.getElementById("category-select").hidden = true;
        }
    }
    else {
    }

}

getStructure("./public/data/").then((data) => {
    structureData = data;
    populateCategorySelection();
    updateCategoryButtons();

    document.getElementById('topic-select').addEventListener('change', function() {
        paramTopic = this.value;
        updateCategoryButtons(); // Update buttons based on the newly selected language
    });
});


const randomizeCheckbox = document.getElementById('randomize-checkbox');
shouldRandomize = randomizeCheckbox.checked;
// Add an event listener to the checkbox for the 'change' event
randomizeCheckbox.addEventListener('change', function() {
    // Update is_randomize based on whether the checkbox is checked
    shouldRandomize = this.checked;
    console.log(shouldRandomize);
});
