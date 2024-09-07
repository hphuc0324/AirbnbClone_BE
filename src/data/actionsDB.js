const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const { host, name } = require('../configs/config.mongodb');

const connectString = `${host}/${name}?retryWrites=true&w=majority`;

// mongoose
//     .connect(connectString)
//     .then((_) => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Failed to connect to MongoDB', error);
//     });

//READ FILES
// const icons = JSON.parse(fs.readFileSync('./icon.json'), 'utf-8');

//LOAD DATA
const loadData = async (file) => {
    const filePath = path.join(__dirname, 'files', file);

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        console.log(`Read file ${file} successfully`);
        return data;
    } catch (error) {
        console.log(`Error reading file ${file}`, error);
    }
};

//IMPORT DATA
const importData = async (data, model) => {
    try {
        await model.create(data);

        console.log('Import data successfully');
    } catch (error) {
        console.log(`Error importing data`, error);
    }

    process.exit();
};

//RUN
const run = async () => {
    const mode = process.argv[2];
    const file = process.argv[3];

    console.log('Mode::', mode);

    if (mode === '--delete') {
    } else {
        const data = await loadData(file);

        console.log('Data::', data);
    }
};

run();
