const fs = require('fs');
require('dotenv').config();

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
console.log(process.env.prompter, process.env.responder)

// define the sender
const prompter = (process.env.prompter).toLowerCase()
const responder = (process.env.responder).toLowerCase();

// variables to hold prompts that have been sent over multiple messages before a response is recieved
let prompt = '';
let response = ''; // stores responses that are multiple messages long

// variable to hold training data
let trainingData = [];
let count = 0;
data.messages.forEach(message => {
    count++
    console.clear()
    console.log(count)
    // people sometimes press enter and leave a blank message, lets ignore those
    if (message.content == '') {
        // skip this message
        return;
    }

    // people sometimes send gifs, lets ignore every url that isnt "tenor" "giphy" "discord" or "imgur"
    if (message.content.includes('http')) {
        // see if the url is from tenor, giphy, discord, or imgur
        if (!message.content.includes('tenor') && !message.content.includes('giphy') && !message.content.includes('discord') && !message.content.includes('imgur')) {
            // skip this message
            return;
        }
    }
    
    // if the message is sent by the prompter
    if (message.author.name.toLowerCase() == prompter) {
        // if the last message was a response, and this message is a response then add the previous prompt and response to the training data
        prompt = message.content;
    } else if (message.author.name.toLowerCase() == responder) {
        // if the prompt is empty, then skip this message
        if (prompt == '') {
            return; 
        }

        // if the last message was a prompt, and this message is a response then add the previous prompt and response to the training data
        if (prompt != '') {
            // add the prompt and response to the training data
            trainingData.push({
                prompt: prompt,
                completion: message.content
            });
            // console.log({
            //     input: prompt,
            //     completion: message.content
            // })
            // reset the prompt and response
            prompt = '';
            response = '';
        } else {
            response = message.content;
        }
    }

});

// write the training data to a json file in root directory

fs.writeFile('trainingData.json', JSON.stringify(trainingData), function(err) {
    if (err) {
        console.log(err);
    }
});

