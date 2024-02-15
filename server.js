const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path= require('path');
const app = express();
const port = 3001;
IS_RUNNING_ON_LOCAL = true;

// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.get('/public/flashcards', (req, res) => {
  try {
    const type = req.query.type;
    /* if type is verbs, load flashcard-verbs.yaml */
    const fileContents = fs.readFileSync(path.join(__dirname, `/public/data/${type}.json`), 'utf8');
    const data = yaml.load(fileContents);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
