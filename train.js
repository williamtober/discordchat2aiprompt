require('dotenv').config();
const request = require('request');
const fs = require('fs');
// import open ai from openai.js
const openai = require('./openai.js');

// const response = openai.createFile(
//     fs.createReadStream("data.jsonl"),
//     "fine-tune"
// ).then((response) => {
//     console.log(response);
// }).catch((error) => {
//     console.error(error);
// });

const uploadFile = async () => {
    return await openai.createFile(
        fs.createReadStream("mydata.jsonl"),
        "fine-tune"
    ).then(response => {
        return response.id
    }).catch((error) => {
        console.error(error);
    });
}

const createFineTune = async (fileId) => {
    return await openai.createFineTune({
        training_file: fileId,
        model: process.env.ENGINE,
    }).then((response) => {
        return response.id;
    }).catch((error) => {
        console.error('error', error.response.data.error);
    });
}

const getStatus = async (fineTuneId) => {
    return await openai.retrieveFineTune(fineTuneId)
    .then((response) => {
        return response.data.status;
    }).catch((error) => {
        console.error('error', error.response.data.error);
    });
}

const listFineTunes = async () => {
    return await openai.listFineTunes()
    .then((response) => {
        return response.data;
    }).catch((error) => {
        console.error('error', error.response.data.error);
    });
}

(async () => {

    await openai.retrieveFineTune("ft-IHlb7ptywjPOs8Mvcb5FI9Em")
    .then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error('error', error.response.data.error);
    });

    await openai.listFineTuneEvents("ft-IHlb7ptywjPOs8Mvcb5FI9Em")
    .then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error('error', error.response.data.error);
    });


    // ! gets the list of fine tune models
    // const response = await openai.listFineTunes()
    // .then((response) => {
    //     console.log(response.data);
    // }).catch((error) => {
    //     console.error('error', error.response.data.error);
    // });

    // const response = await openai.createFineTune({
    //     training_file: "file-MaJCp4Wt6CdcGTMU4A2LPw02",
    //     model: process.env.ENGINE,
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     console.error('error', error.response.data.error);
    // });

})();


// export the functions
module.exports = {
    uploadFile,
    createFineTune,
    getStatus,
    listFineTunes
}



// // Replace MODEL_NAME with the name of the model you want to use
// var MODEL_NAME = process.env.MODEL_NAME;

// // Load the JSON file containing the prompts and expected output pairs, this makes it a js object
// var trainingData = require('./trainingData.json');

// // get the max_token value, or the maximum number of words ever used in a response
// var maxTokens = 0;
// var count = 0;
// trainingData.forEach(set => {
//     // get a count of every space in the set.response
//     console.log(`prompt: ${set.prompt}\noutput: ${set.response}`)
//     const tokenCount = set.response.split(' ').length;
//     count += tokenCount;
//     // if the token count is greater than the current maxTokens, set maxTokens to the tokenCount
//     if (tokenCount > maxTokens) {
//         maxTokens = tokenCount;
//     }

// })

// const cost = (count/1000) * 0.02;
// console.log(`maxTokens: ${maxTokens}, count: ${count}, cost: ${cost}`)


// generate the model data
// let outputData = ``;
// trainingData.map(set => outputData = outputData + `${set.prompt}\n${set.response}\n`)
// console.log(outputData)

// request.post({
//     url: 'https://api.openai.com/v1/models/language/create',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${API_KEY}`
//     },
//     json: {
//       "engine": "davinci",
//       "training_data": outputData,
//       "model_name": MODEL_NAME
//     }
//   }, (error, response, body) => {
//     if (error) {
//       console.error(error);
//     } else {
//         console.log(response)
//         console.log(body)
//       console.log(`Model ID: ${body.id}`);
//     }
// })
