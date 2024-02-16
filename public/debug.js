document.addEventListener('DOMContentLoaded', function () {
    const increaseButton = document.getElementById('buttonIncrease');
    const decreaseButton = document.getElementById('buttonDecrease');

    increaseButton.addEventListener('click', function() {
        adjustButtonWidth(1); // Increase width by 10px
    });

    decreaseButton.addEventListener('click', function() {
        adjustButtonWidth(-1); // Decrease width by 10px
    });

    const fontIncreaseButton = document.getElementById('buttonFontIncrease');
    const fontDecreaseButton = document.getElementById('buttonFontDecrease');

    fontIncreaseButton.addEventListener('click', function() {
        adjustButtonFont(1); // Increase width by 10px
    });

    fontDecreaseButton.addEventListener('click', function() {
        adjustButtonFont(-1); // Decrease width by 10px
    });
});

function adjustButtonWidth(changeInVw) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        // Extract the current width from the element's computed style
        let currentWidthVw = parseInt(window.getComputedStyle(button).width) / window.innerWidth * 100;
        // Calculate the new width in vw
        let newWidthVw = currentWidthVw + changeInVw;
        // Apply the new width to the button
        button.style.width = `${newWidthVw}vw`;
        updateWidthDisplay(newWidthVw);
    });
}

function adjustButtonFont(changeInVw) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        // Extract the current width from the element's computed style
        let currentFontSizeVw = parseFloat(window.getComputedStyle(button).fontSize) / window.innerWidth * 100;
        // Calculate the new width in vw
        let newWidthVw = currentFontSizeVw + changeInVw;
        // Apply the new width to the button
        console.log("button font size: ", newWidthVw);
        button.style.fontSize = `${newWidthVw}vw`;
        updateFontDisplay(newWidthVw);
    });
}

function updateWidthDisplay(newWidth) {
    const widthDisplay = document.getElementById('buttonWidthDisplay');
    // Assuming all buttons will have the same width, update the text content of the display element
    widthDisplay.textContent = `Button width: ${newWidth.toFixed(2)}vw`; // Round to 2 decimal places for clarity
}

function updateFontDisplay(newFont) {
    const fontDisplay = document.getElementById('buttonFontDisplay');
    // Assuming all buttons will have the same width, update the text content of the display element
    fontDisplay.textContent = `Button font: ${newFont.toFixed(2)}vw`; // Round to 2 decimal places for clarity
}
