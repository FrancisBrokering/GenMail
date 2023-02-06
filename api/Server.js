const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  console.log(generatePrompt(req.body.dataToSendToGPT3));
  console.log(req.body.modelToUse);
  openai
    .createCompletion({
      model: req.body.dataToSendToGPT3.modelToUse,
      prompt: generatePrompt(req.body.dataToSendToGPT3),
      temperature: 0.6,
      max_tokens: 2000,
      n: 3,
    })
    .then((completion) => {
      res.status(200).json({
        result: [
          completion.data.choices[0].text,
          completion.data.choices[1].text,
          completion.data.choices[2].text,
        ],
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

function generatePrompt(dataToSendToGPT3) {
  return dataToSendToGPT3;
}
