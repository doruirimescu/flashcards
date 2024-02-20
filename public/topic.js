var structureData = [];
import { getStructure } from "./config.mjs";
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
    const selectedTopic = structureData[param_topic];
    const container = document.getElementById('category-buttons');
    container.innerHTML = ''; // Clear existing buttons

    if (selectedTopic) {
        selectedTopic.sections.forEach(section => {
            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = section.charAt(0).toUpperCase() + section.slice(1); // Capitalize first letter
            button.onclick = function() {
                location.href = `public/flashcard.html?type=${section}&topic=${param_topic}`;
            };
            container.appendChild(button);
        });
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
