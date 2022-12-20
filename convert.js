const fs = require('fs');

// Read the input JSON file
const inputFile = 'trainingData.json';
const inputData = fs.readFileSync(inputFile, 'utf8');

// Parse the input data as an array of JSON objects
const objects = JSON.parse(inputData);

// Create a new file to store the JSONL output
const outputFile = 'data.jsonl';
fs.writeFileSync(outputFile, '');

// Write each object to a new line in the output file
objects.forEach(object => {
  fs.appendFileSync(outputFile, JSON.stringify(object) + '\n');
});