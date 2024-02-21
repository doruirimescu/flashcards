import { getStructure } from "./config.mjs";
var structureData = [];
var should_randomize = false;
const params = new URLSearchParams(window.location.search);
let param_topic = params.get('topic');

function populateCategorySelection() {
    const selectElement = document.getElementById('topic-select');

    if (!param_topic) {
        param_topic = Object.keys(structureData)[0];
    }

    for (var key in structureData){
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectElement.appendChild(option);
      }

    selectElement.value = param_topic; // Set the current language as selected
}

function updateCategoryButtons() {
    const selectElement = document.getElementById('category-select');
    document.querySelector('label[for="category-select"]').textContent = 'Category:';
    document.getElementById("category-select").hidden = false;
    document.getElementById('start-button').hidden = false;
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }
    const selectedTopic = structureData[param_topic];

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
            location.href = `public/flashcard.html?type=${selectElement.value}&topic=${param_topic}&randomize=${should_randomize}`;
        };
        // if selectedTopic is empty, disable start button
        if (selectedTopic.sections.length == 0) {
            startButton.hidden = true;
            document.querySelector('label[for="category-select"]').textContent = 'No content available';
            document.getElementById("category-select").hidden = true;
        }
        console.log(selectedTopic.sections.length)
    }
    else {
    }

}

getStructure("./public/data/").then((data) => {
    structureData = data;
    populateCategorySelection();
    updateCategoryButtons();

    document.getElementById('topic-select').addEventListener('change', function() {
        param_topic = this.value;
        updateCategoryButtons(); // Update buttons based on the newly selected language
    });
});


const randomizeCheckbox = document.getElementById('randomize-checkbox');
should_randomize = randomizeCheckbox.checked;
// Add an event listener to the checkbox for the 'change' event
randomizeCheckbox.addEventListener('change', function() {
    // Update is_randomize based on whether the checkbox is checked
    should_randomize = this.checked;
    console.log(should_randomize);
});
