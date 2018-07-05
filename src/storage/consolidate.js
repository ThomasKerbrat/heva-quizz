
// ===== Requires ===== //

const path = require('path');
const fs = require('fs');
const config = require('../config.js');



// ===== Config ===== //

const directories = [
    'users',
    'quizzes',
];

const entities = [
    { filePath: 'users/users.json', defaultValue: '[]' },
    { filePath: 'quizzes/quizzes.json', defaultValue: '[]' },
];



// ===== Exports ===== //

module.exports = { consolidate };



// ===== Module ===== //

function consolidate() {
    for (let directory of directories) {
        const dirPath = path.join(config.storagePath, directory);
        let dirExists = true;

        try {
            fs.accessSync(dirPath, fs.constants.F_OK);
        } catch (err) {
            dirExists  = false;
        }

        if (!dirExists) {
            fs.mkdirSync(dirPath, 0o744);
        }
    }

    for (let entity of entities) {
        const filePath = path.join(config.storagePath, entity.filePath);
        let fileExists = true;

        try {
            fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
        } catch (err) {
            fileExists  = false;
        }

        if (!fileExists) {
            fs.writeFileSync(filePath, entity.defaultValue, 'utf-8');
        }
    }
}
