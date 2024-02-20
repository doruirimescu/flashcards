<h1 align="center" style="line-height: 1; margin: 0; padding: 0;">
  <img src="./public/assets/logo/logo.jpeg" alt="Logo" width="100" height="100"><br>
  Flashcards Learning Project
</h1>

Welcome to the Flashcards Learning Project! This tool was originally designed to help language learners improve their vocabulary through interactive flashcards. I found other applications as well, such as learning music theory or engineering concepts. Below, you'll find instructions on how to run the project locally for development, deploy it using GitHub Pages, add new flashcards, and suggestions for future improvements.

**IMPORTANT! I have currently developed only the [Finnish](https://doruirimescu.github.io/language-flashcards/public/flashcard.html?type=all&topic=finnish) language flashcards.**

## How to Run the Project

You have three options to run this project:
1. **GitHub Pages:** Access the current version hosted online.
2. **Locally with an HTTP Server:** Serve files using a local HTTP server for development. Useful when you are experimenting with new flashcards.


### Accessing the Current Version Hosted on GitHub Pages
To access the live version of this project, simply click on the following [link](https://doruirimescu.github.io/language-flashcards/index.html).

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


## Adding New Topic
To add a new topic to the project, you need to modify the corresponding structure JSON file and create two folders:
1. Add your topic and sections in `structure.json` [file](./public/data/structure.json). Familiarize yourself with the contents of this file.
2. Create a new folder for the back sides of the cards [here](./public/assets/back/). Make sure to name the folder with the exact same name you have used in the `structure.json` file.
3. Create a new folder for the front sides of the cards [here](./public/assets/front/) Make sure to name the folder with the exact same name you have used in the `structure.json` file.

## Adding a new category
1. Create a JSON [file]((./public/data/) with the name of the category. Ensure it is the same as the one that you have entered in `structure.json`.
2. Populate the file (look at the Finnish examples).

## Adding New Flashcards
To add new flashcards to the project, you need to modify the corresponding JSON file and add images for the front and back of the flashcards. Here are the steps:

1. Open the JSON file that corresponds to the category of flashcards you want to add to (e.g., adjectives.json for adjective flashcards).

2. Add a new entry for your flashcard with the Finnish word, its English translation, and filenames for the front and back images.

3. Place the front image in the `data/<language>/front` directory an the back image in the `data/<language>/back` directory.
4. Ensure your images are correctly named to match the filenames specified in the JASON entry.

I have used chatGPT to generate the images.


## Future Improvements
This project has great potential for expansion and improvement. But I am lacking the time to contribute more. Here are a few suggestions:

* Responsive Design for Different Devices: Improving the project's responsiveness would ensure that it's easily accessible on various devices, including smartphones, tablets, and desktop computers.

* Interactive Learning Features: Incorporating interactive features such as quizzes, spaced repetition, and pronunciation guides could enhance the learning experience.

* Community Contributions: Allowing users to contribute their own flashcards can enrich the content and engage the community.

By following these instructions and considering future enhancements, you can effectively use and contribute to the Finnish Language Flashcards Project. Happy learning!
