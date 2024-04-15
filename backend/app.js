const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config(); // environment variable
const amadeus = require('amadeus'); // Assurez-vous d'avoir importé le module Amadeus si ce n'est pas déjà fait
const userRoutes = require('./routes/user');
const apiRoutes  = require('./routes/api'); // Assurez-vous que vous utilisez également apiRoutes

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
app.use('/api', apiRoutes); // Assurez-vous que vous utilisez également apiRoutes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


module.exports = app;
