import { getStructure, getCount } from "./config.mjs";
var structureData = [];

var count = null;

var paramTopic = null;
var paramCategory = null;
let paramStyle = null;
var shouldRandomize = false;

const ELEMENT_TOPIC_LABEL = document.querySelector('label[for="topic-select"]');
const ELEMENT_CATEGORY_LABEL = document.querySelector('label[for="category-select"]');
const ELEMENT_STYLE_LABEL = document.querySelector('label[for="style-select"]');


function initializeContent()
{
    ELEMENT_TOPIC_LABEL.textContent = 'Topic:';
    document.getElementById('topic-select').hidden = false;

    ELEMENT_CATEGORY_LABEL.textContent = 'Category:';
    document.getElementById("category-select").hidden = false;

    ELEMENT_STYLE_LABEL.textContent = 'Graphic Style:';
    document.getElementById("style-select").hidden = false;

    document.querySelector('label[for="randomize-checkbox"]').hidden = false;
    document.getElementById("randomize-checkbox").hidden = false;

    const startButton = document.getElementById('start-button');
    startButton.hidden = false;

    const infoIcons = document.getElementsByClassName('info-icon');
    for (const infoIcon of infoIcons) {
        infoIcon.style.display = 'inline-block';
    }
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

    const infoIcons = document.getElementsByClassName('info-icon');
    for (const infoIcon of infoIcons) {
        infoIcon.style.display = 'none';
    }
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
    updateCount();
});

// whenever category is changed, update the style selection
document.getElementById('category-select').addEventListener('change', function() {
    paramCategory = this.value;
    populateStyleSelection();
    updateCount();
});

// whenever style is changed, update the style selection
document.getElementById('style-select').addEventListener('change', function() {
    paramStyle = this.value;
    updateCount();
});

getCount("./public/data/").then((data) => {
    count = data;
});

getStructure("./public/data/").then((data) => {
    structureData = data;
    initializeContent();
    populateTopicSelection();
    populateCategorySelection();
    populateStyleSelection();
    // wait for count to be loaded

    while (count === null) {
        setTimeout(() => {}, 10);
    }

    updateCount();
});


function updateCount(){
    if (paramCategory === null) {
        return;
    }

    const topic_selector = document.getElementById('topic-select');
    for (var i = 0; i < topic_selector.length; i++) {
        var cur_topic = topic_selector.options[i].value;
        cur_topic = cur_topic.split(' ')[0];
        try {
            count[cur_topic]["total"];
        }
        catch (e) {
            continue;
        }
        const total = count[cur_topic]["total"];
        topic_selector.options[i].text = `${cur_topic} (${total})`;

    }
    // Get the current topic and category
    const topic = document.getElementById('topic-select').value;
    const category = document.getElementById('category-select').value;

    var all_categories = Object.keys(count[topic]["categories"]);
    const category_selector = document.getElementById('category-select');
    for (const category of all_categories) {
        const category_total = count[topic]["categories"][category]["total"];
        for (var i = 0; i < category_selector.length; i++) {
            if (category_selector.options[i].value === category) {
                category_selector.options[i].text = `${category} (${category_total})`;
                break;
            }
        }
    }


    var all_styles = Object.keys(count[topic]["categories"][category]["styles"]);
    const style_selector = document.getElementById('style-select');
    for (const style of all_styles) {
        const style_total = count[topic]["categories"][category]["styles"][style];
        for (var i = 0; i < style_selector.length; i++) {
            if (style_selector.options[i].value === style) {
                style_selector.options[i].text = `${style} (${style_total})`;
                break;
            }
        }
    }
}

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
