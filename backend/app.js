const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config(); // environment variable

const userRoutes = require('./routes/user');

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à la base de données MongoDB'))
    .catch(err => {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1); // Arrête l'application en cas d'échec de la connexion à la base de données
    });

const app = express();    

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;
