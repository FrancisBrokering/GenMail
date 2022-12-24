const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const app = express();

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header');
    next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("body is", req.body)
    openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(JSON.parse(req.body).email),
        // prompt: "write an email to satoki",
        temperature: 0.6,
        max_tokens: 2000,
    }).then((completion) => {
        res.status(200).json({ result: completion.data.choices[0].text });
    }).catch((error) => { console.log(error) })
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

function generatePrompt(email) {
    console.log("body is", email)
    return email;
    //     const capitalizedAnimal = email[0].toUpperCase() + email.slice(1).toLowerCase();
    //     return `Suggest three names for an animal that is a superhero.

    //   Animal: Cat
    //   Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    //   Animal: Dog
    //   Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    //   Animal: ${capitalizedAnimal}
    //   Names:`;
}