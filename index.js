// predfined variables
let ft_id = '';
let file_id = '';

// load the functions from train.js
const { uploadFile, createFineTune, getStatus, listFineTunes } = require('./train.js');

while(true) {
    console.log('OPEN AI TRAINER\n--------------')
    // if .env file is missing, exit the program and restart
    if (!fs.existsSync('.env')) {
        console.log('Please create a .env file and restart the program.')
        process.exit();
    } else {
        // if .env file is present, load the environment variables
        const dotenv = require('dotenv');
        dotenv.config();
        // see if there is another json file other than package.json
        const files = fs.readdirSync('.');
        const jsonFiles = files.filter(file => {
            return file.endsWith('.json') && file !== 'package.json';
        });
        if(jsonFiles.length === 0) {
            console.log('Please add your discord json file and restart the program.')
            process.exit();
        } else {
            console.log('1. Prepare Training Data');
            console.log('2. Upload Training Data');
            console.log('3. Create Fine Tune');
            console.log('4. Check Status');
            console.log('5. List Fine Tunes');
            console.log('6. Exit');
            // ask the user to select an option
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            readline.question('Select an option: ', (option) => {
                switch(option) {
                    case '1':
                        // convert trainingData.json to data.jsonl
                        break;
                    case '2':
                        // upload data.jsonl to open ai
                        break;
                    case '3':
                        // create fine tune
                        break;
                    case '4':
                        // check status
                        break;
                    case '5':
                        // list fine tunes
                        break;
                    case '6':
                        // exit the program
                        process.exit();
                        break;
                    default:
                        // if the user enters an invalid option, ask them to try again
                            console.log('Invalid option. Please try again.');
                            break;
                }
            });
        }
    }

}
