<h1 align="center" style="line-height: 1; margin: 0; padding: 0;">
  <img src="./public/assets/logo/logo.jpeg" alt="Logo" width="100" height="100"><br>
  Flashcards Learning Project
</h1>

Welcome to the Flashcards Learning Project! This tool was originally designed to help language learners improve their vocabulary through interactive flashcards. I found other applications as well, such as learning music theory or engineering concepts. Below, you'll find instructions on how to run the project locally for development, deploy it using GitHub Pages, add new flashcards, and suggestions for future improvements.

**IMPORTANT! This is a static site, hosted on github pages for free. In order to add new flashcards,
you will need to run a python script (cli.py) locally, and then either merge your change to this repo, or fork this repo and host it on your own github pages**

**IMPORTANT! I have currently developed only the [Finnish](https://doruirimescu.github.io/flashcards/public/flashcard.html?type=all&topic=finnish&randomize=true&style=all) language flashcards.**

## How to Run the Project

You have three options to run this project:
1. **GitHub Pages:** Access the current version hosted online.
2. **Locally with an HTTP Server:** Serve files using a local HTTP server for development. Useful when you are experimenting with new flashcards.


### Accessing the Current Version Hosted on GitHub Pages
To access the live version of this project, simply click on the following [link](https://doruirimescu.github.io/flashcards/index.html).

To host your own version:
* Fork this project.

* Adjust the configuration in [public/config.js](public/config.js) to align with your GitHub username and branch.

### Running the Project Locally (Development Mode, Serving JSON data from Local HTTP Server)

To run the project locally on your machine, you will need to serve the project files using a local HTTP server. This is easily done with Python 3. Follow these steps:

1. Set the [public/config.js](public/config.js) `IS_HOSTED_LOCALLY` variable to `true`.
2. Ensure you have Python 3 installed on your machine. You can check your Python version by running `python3 --version in your terminal.`
3. Navigate to the project's root directory in your terminal.
4. Run the following command to start a local HTTP server:

```bash
python3 -m http.server 8001
```
4. Open your web browser and go to `http://localhost:8001` to view the project.


## Adding New Flashcards
**Use the new cli.py script:**
1. Generate the back and the front of the flashcard. 1024 x 1024 pixels is recommended.
2. Place the back.png and front.png images in the root folder
3. Think of a good card name. This should illustrate the main concept the card is trying to teach
4. Think of a good topic. Look first through the existing topics.
5. Think of a good category. Look first through the existing categories.
6. Think of the content of the card. This is the part that will be illustrated on top of it.
7. Call the script with `python3 cli.py create --name card_name --topic for_example_finnish --category for_example_adjectives --style style_1 style_2 --content example_content`
8. Call the count script to update the count. `python3 cli.py count`

## Future Improvements
This project has great potential for expansion and improvement. But I am lacking the time to contribute more. Here are a few suggestions:

* Interactive Learning Features: Incorporating interactive features such as quizzes, spaced repetition, and pronunciation guides could enhance the learning experience.

* Community Contributions: Allowing users to contribute their own flashcards can enrich the content and engage the community.

* Move it to its own server if it gains big traction.

By following these instructions and considering future enhancements, you can effectively use and contribute to the Finnish Language Flashcards Project. Happy learning!

# Prompts
*The DALLE3 prompts corresponding for the graphics styles, used to generate the flashcards.*

## Eerie

### System prompt
You are a flashcard illustrator. The flashcards that you are going to illustrate follow the "Don't starve" game's graphic design.

Creating flashcards with a graphic design inspired by the game "Don't Starve" sounds like a fascinating project! "Don't Starve" is known for its unique, dark, and somewhat gothic hand-drawn art style, featuring quirky characters, eerie environments, and a wide range of fantastical creatures and items. This distinctive style uses strong outlines, limited palettes, and textures that give a sense of depth and tactile feel to the visuals.

When illustrating flashcards in this vein, it's crucial to capture the essence of the game's aesthetic. This means focusing on:

Strong, Expressive Lines: The art should have bold outlines that define shapes clearly and give each element a distinct silhouette. This is particularly important for creating visuals that stand out at the small scale of a flashcard.

Limited Color Palette: "Don't Starve" uses a somewhat muted color scheme that still manages to be vibrant. Choose your colors carefully to convey the mood of each flashcard while staying true to the game's aesthetic.

Textures and Shading: The game's art style makes use of textured surfaces and strategic shading to add depth and a sense of materiality. This can be especially effective for depicting environments and creatures.

Quirky Character Designs: Characters in "Don't Starve" have exaggerated features and unique, often whimsical designs. Your illustrations should aim to capture this sense of creativity and individuality.

Atmospheric Elements: The game excels in creating a sense of unease and mystery through its environments. Incorporating atmospheric details like twisted trees, curious gadgets, or shadowy figures can add a lot of character to your flashcards.

### Backside
Now, create the backside of this card. The same drawing style and theme as for the \<previous card\> is used. Decorate only the edges of the picture, and leave the bulk of the picture empty, so I can add some words. Make sure that the whole image is filled.
