const request = require('request');

// Replace YOUR_API_KEY with your actual API key
const API_KEY = process.env.OPENAI_API_KEY;

// Replace MODEL_NAME with the name of the model you want to use
const MODEL_NAME = process.env.MODEL_NAME;

// Load the JSON file containing the prompts and expected output pairs
const trainingData = require('./training-data.json');

// Send the training data to the model
const options = {
  url: `https://api.openai.com/v1/models/${MODEL_NAME}/train`,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  },
  json: {
    "data": trainingData
  }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(body);
});
