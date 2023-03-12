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
  async function chatGPTPromptCreation() {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        // temperature: 0,
        max_tokens: 100,
        // top_p: 1,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,
        prompt: "Create me a short prompt for DALL·E 2 to create an image about a forest full of trees, and a person under a tree reading a book. This image will be used to sell books for the local book store in Redmond, wa. It should be pixel art.",
      });

      return completion;
    }
    catch(error) {
      console.log(error);
    }
  }

  async function dallEImageCreation(prompt) {
    try {
      const create_image = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      });

      return create_image;
    }
    catch(error) {
      console.log(error);
    }
  }

  chatGPTPromptCreation()
    .then((data) => {
      dallEImageCreation(data.data.choices[0].text)
        .then((data) => {
          console.log(data.data)
          res.json({message: "image created"})
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});