const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { Configuration, OpenAIApi } = require('openai');
const app = express();

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    openai.createCompletion({
        model: "text-davinci-002",
        prompt: "write an email to my boss saying I'm not going to work today",
        temperature: 0.6,
        max_tokens: 2000,
    }).then((completion) => {
        res.status(200).json({ result: completion.data.choices[0].text });
    }).catch((error) => { console.log(error) })
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});