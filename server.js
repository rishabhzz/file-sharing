const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');

const app = express();
const port = 3000;

// Middleware for file uploads
app.use(fileUpload());

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store connected users
const connectedUsers = [];

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the list of connected users
app.get('/users', (req, res) => {
    const users = connectedUsers.map(user => user.username);
    res.json(users);
});

// Handle file uploads
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { username, targetUser } = req.body;
    const file = req.files.file;
    const filePath = path.join(__dirname, 'shared', file.name);

    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');

        // Notify the selected user about the shared file
        const user = connectedUsers.find((u) => u.username === targetUser);
        if (user) {
            user.response.write(`You received a file: ${file.name}`);
        }
    });
});

// Handle user connections
app.get('/connect/:username', (req, res) => {
    const username = req.params.username;

    // Create a connection object and store it in the array
    const user = { username, response: res };
    connectedUsers.push(user);

    // Notify the connected user
    res.write('Connected to the file sharing service.');

    // Handle disconnect
    res.on('close', () => {
        const index = connectedUsers.findIndex((u) => u.username === username);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on http://${os.hostname()}:${port}`);
});
