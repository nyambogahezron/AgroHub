const fs = require('fs');
const path = require('path');

// Path to your JSON file
const jsonFilePath = path.join(__dirname, 'data.json');

// Function to read and parse JSON file
const populateData = () => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            console.log('Data from JSON file:', jsonData);
            // Process the data as needed
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
        }
    });
};

// Call the function to populate data
populateData();