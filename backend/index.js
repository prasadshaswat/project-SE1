const express = require('express');
const cors = require('cors');
const { db } = require('./db/db'); // Ensure db is exported correctly in db.js
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').forEach((file) => {
    if (file.endsWith('.js')) { // Only load JavaScript files
        const route = require(`./routes/${file}`);
        app.use('/api/v1', route);
    }
});

const server = async () => {
    await db(); // Ensure db is awaited if it's async
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

server();
