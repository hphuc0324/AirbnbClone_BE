const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const { host, name } = require('../configs/config.mongodb');
const dataField = require('./dataField');

const connectString = `${host}/${name}?retryWrites=true&w=majority`;

mongoose
    .connect(connectString)
    .then((_) => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });

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
};

//UPDATE DATA
const updateData = async (data, model, field) => {
    try {
        for (const item of data) {
            await model.updateOne(
                {
                    [field]: item[field],
                },
                {
                    $set: item,
                },
                { upsert: true },
            );
        }

        console.log('Update data successfully');
    } catch (error) {
        console.log(`Error updating data`, error);
    }
};

//DELETE DATA
const deleteData = async (model) => {
    try {
        await model.deleteMany();

        console.log('Delete data successfully');
    } catch (error) {
        console.log(`Error deleting data`, error);
    }
};

//RUN
const run = async () => {
    const mode = process.argv[2];
    const file = process.argv[3];
    const dataModel = dataField[file].data_model;

    console.log('Mode::', mode);

    if (mode === '--delete') {
        await deleteData(dataModel);
    } else {
        const data = await loadData(file);

        if (mode === '--import') {
            await importData(data, dataModel);
        } else if (mode === '--update') {
            const field = dataField[file].main_field;

            await updateData(data, dataModel, field);
        } else {
            console.log('Invalid mode');
        }
    }

    process.exit();
};

run();
