import { getStructure } from "./config.mjs";
var structureData = [];

var paramTopic = null;
var paramCategory = null;
let paramStyle = null;
var shouldRandomize = false;

function initializeContent()
{
    document.querySelector('label[for="category-select"]').textContent = 'Category:';
    document.getElementById("category-select").hidden = false;

    document.querySelector('label[for="style-select"]').textContent = 'Graphic Style:';
    document.getElementById("style-select").hidden = false;

    document.querySelector('label[for="randomize-checkbox"]').hidden = false;
    document.getElementById("randomize-checkbox").hidden = false;

    const startButton = document.getElementById('start-button');
    startButton.hidden = false;
}

function noContent() {
    const startButton = document.getElementById('start-button');
    startButton.hidden = true;

    document.querySelector('label[for="category-select"]').textContent = 'No content available';
    document.getElementById("category-select").hidden = true;

    document.querySelector('label[for="style-select"]').textContent = '';
    document.getElementById("style-select").hidden = true;

    document.querySelector('label[for="randomize-checkbox"]').hidden = true;
    document.getElementById("randomize-checkbox").hidden = true;
}

function populateTopicSelection() {
    const selectElement = document.getElementById('topic-select');
    paramTopic = selectElement.value || Object.keys(structureData)[0];

    // remove children
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }

    for (var key in structureData){
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        selectElement.appendChild(option);
      }

    selectElement.value = paramTopic; // Set the current language as selected
}

function populateCategorySelection() {
    const categoryElement = document.getElementById('category-select');
    while (categoryElement.firstChild) {
        categoryElement.removeChild(categoryElement.firstChild);
    }
    const selectedTopic = structureData[paramTopic];
    const sections = Object.keys(selectedTopic.sections);
    if (sections.length != 0) {
        sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section; // Capitalize first letter
            categoryElement.appendChild(option);
        });
        categoryElement.value = sections[0]; // Set the first section as selected
        // if selectedTopic is empty, disable start button
        paramCategory = sections[0];

    }
    else {
        paramCategory = null;
        noContent();
    }
}

function populateStyleSelection() {
    if (!paramCategory) {
        return;
    }
    const selectedTopic = structureData[paramTopic];
    // we need to look into the values of the sections to see if there are any styles
    const styles = selectedTopic.sections[paramCategory];
    const styleElement = document.getElementById('style-select');

    while (styleElement.firstChild) {
        styleElement.removeChild(styleElement.firstChild);
    }

    styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style;
        option.textContent = style;
        styleElement.appendChild(option);
    });
    paramStyle = styles[0];
}


// whenever topic is changed, update the category selection
document.getElementById('topic-select').addEventListener('change', function() {
    paramTopic = this.value;
    initializeContent();
    populateCategorySelection();
    populateStyleSelection();
});

// whenever category is changed, update the style selection
document.getElementById('category-select').addEventListener('change', function() {
    paramCategory = this.value;
    populateStyleSelection();
});

// whenever style is changed, update the style selection
document.getElementById('style-select').addEventListener('change', function() {
    paramStyle = this.value;
});

getStructure("./public/data/").then((data) => {
    structureData = data;
    initializeContent();
    populateTopicSelection();
    populateCategorySelection();
    populateStyleSelection();
});


const randomizeCheckbox = document.getElementById('randomize-checkbox');
shouldRandomize = randomizeCheckbox.checked;
// Add an event listener to the checkbox for the 'change' event
randomizeCheckbox.addEventListener('change', function() {
    // Update is_randomize based on whether the checkbox is checked
    shouldRandomize = this.checked;
});

// set start button
document.getElementById('start-button').onclick = function() {
    location.href = `public/flashcard.html?type=${paramCategory}&topic=${paramTopic}&randomize=${shouldRandomize}&style=${paramStyle}`;
};

initializeContent();
