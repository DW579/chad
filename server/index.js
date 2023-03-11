const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  async function runCompletion() {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 10,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        prompt: "Explain quantum computing in simple terms",
      });

      return completion;
    }
    catch(error) {
      console.log(error);
    }
  }

  runCompletion()
    .then((data) => {
      res.json({message: data.data.choices[0].text})
    })
    .catch((error) => {
      console.log(error)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});