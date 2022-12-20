const fs = require('fs');
// get json file in directory and parse it

const { json } = require('stream/consumers');

// return json object
function getJsonFile() {
    // get the first file ending in .json
    var fs = require('fs');
    var files = fs.readdirSync('./');
    var jsonFile = files.filter(function(file) {
        //ignore package.json
        if (file === 'package.json') {
            return false;
        }
        return file.substr(-5) === '.json';
    })[0];
    // parse the json file
    jsonFile = fs.readFileSync(jsonFile, 'utf8');
    var json = JSON.parse(jsonFile);
    return json;
}

const data = getJsonFile();

// define the sender
const prompter = (process.env.prompter).toLowerCase()
const responder = (process.env.responder).toLowerCase();

// variables to hold prompts that have been sent over multiple messages before a response is recieved
let prompt = '';
let response = ''; // stores responses that are multiple messages long
/* SAMPLE PROMPT
{
    "id": "275124495616835585",
    "type": "Default",
    "timestamp": "2017-01-29T04:46:31.321+00:00",
    "timestampEdited": null,
    "callEndedTimestamp": null,
    "isPinned": false,
    "content": "send me invite to discord room",
    "author": {
      "id": "180861978271547392",
      "name": "user",
      "discriminator": "0069",
      "nickname": "user",
      "color": null,
      "isBot": false,
      "avatarUrl": "https://cdn.discordapp.com/avatars/180861978271547392/e18812bcfe00a393188d53182631aa14.png?size=512"
    },
    "attachments": [],
    "embeds": [],
    "stickers": [],
    "reactions": [],
    "mentions": []
  },
*/

// variable to hold training data
let trainingData = [];

json.messages.forEach(message => {
    

    // if the message is sent by the prompter
    if (message.author.name.toLowerCase() === prompter) {
        // if the last message was a response, and this message is a response then add the previous prompt and response to the training data
        if (response !== '') {
            trainingData.push({
                prompt: prompt,
                response: response
            });
            // reset the prompt and response
            prompt = '';
            response = '';
        } else {
            // if the last message was a prompt, and this message is a prompt then add the previous prompt
            prompt = prompt !== '' ? prompt + ' ' + message.content : message.content;
        }


    } else if (message.author.name.toLowerCase() === responder) {
        // if the last message was a prompt, and this message is a response then add the previous prompt and response to the training data
        response = response !== '' ? response + ' ' + message.content : message.content;

    }

});

// write the training data to a json file in root directory

fs.writeFile('trainingData.json', JSON.stringify(trainingData), function(err) {
    if (err) {
        console.log(err);
    }
}

