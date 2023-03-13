const express = require("express");
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/post_chatgpt", (req, res) => {
  const object_1 = req.body.object1;
  const object_2 = req.body.object2;
  const style = req.body.style;
  const form_message = "You are a designer that is creative, ability to simplify complex ideas, and have an artistic talent. You have been tasked by a client to create a simple 20 word prompt to generate a high resolution image with DALL·E 2 for a computer desktop. The image features a " + object_1 + " and a " + object_2 + ". Include the exact phrase, " + style + " style. Do not include the phrase DALL·E 2 in the prompt. Only include 1 verb or adjective. Return only the prompt."

  // Call Chat GPT API to create a prompt from form message
  async function chatGPTPromptCreation() {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        // temperature: 0,
        max_tokens: 100,
        // top_p: 1,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,
        prompt: form_message
      });

      return completion;
    }
    catch(error) {
      console.log(error);
    }
  }

  chatGPTPromptCreation()
    .then((data) => {
      const gpt_response = data.data.choices[0].text.replace('/"', '');

      res.json({form_message: form_message, gpt_response: gpt_response})
    })
    .catch((error) => {
      console.log(error)
    })

  
})

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