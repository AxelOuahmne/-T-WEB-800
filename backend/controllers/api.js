const axios = require("axios");
const Amadeus = require('amadeus');
const config = require('../config/config.js');
// Créez une instance Amadeus avec les identifiants en dur
const amadeus = new Amadeus({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
});

// Endpoint pour la fonctionnalité "sleep"
exports.getApiSleep = async (req, res, next) => {
    try {
        // Vos identifiants Amadeus
        const clientID = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus

        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // Utiliser le jeton d'accès pour authentifier la requête vers l'API Amadeus pour rechercher des hôtels
        const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });


        if (response.status === 200) {
            console.log(response.data); // Affiche la réponse de l'API dans la console
            res.json(response.data);
        } else {
            console.error(`Erreur lors de la récupération des hébergements: ${response.statusText}`);
            res.status(response.status).send('Erreur lors de la récupération des hébergements');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des hébergements'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};

// Endpoint pour la fonctionnalité "enjoy"
exports.getApiEnjoy = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les événements ou activités disponibles
        const response = await axios.get('URL_API_POUR_ACTIVITÉS');

        // Renvoyer les données récupérées en tant que réponse
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des activités'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};


// Fonction pour gérer les requêtes de saisie semi-automatique d'aéroports
exports.getApiAirport = async (req, res, next) => {
    try {

        // Vos identifiants Amadeus
        const clientID = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus


        const response = await amadeus.referenceData.locations.get({
            keyword: req.query.term,
            subType: 'AIRPORT,CITY'
        });
        res.json(response.data);
        console.log(response.data.iataCode);
    } catch (error) {
        console.error("Erreur lors de la recherche d'aéroports:", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la recherche d'aéroports." });
    }
};

// Endpoint pour la fonctionnalité "travel"
exports.getApiTravel = async (req, res, next) => {
    try {
        // Récupérer les paramètres de la requête
        const { originLocationCode, destinationLocationCode, returnDate,departureDate, adults } = req.body;

        // Utiliser les identifiants depuis config.js
        const { CLIENT_ID, CLIENT_SECRET } = config;

        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
            `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // Construire l'URL avec les paramètres dynamiques
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`;

        // Effectuer la requête GET avec l'URL dynamique
        const response = await axios.get(url, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 200) {
            console.log(response.data);
            res.json(response.data);
        } else {
            console.error(`Erreur lors de la récupération des options de vols: ${response.statusText}`);
            res.status(response.status).send('Erreur lors de la récupération des options de vols');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des options de transport'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};

// Endpoint pour la fonctionnalité "eat"
exports.getApiEat = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les restaurants disponibles
        const response = await axios.get('URL_API_POUR_RESTAURANTS');

        // Renvoyer les données récupérées en tant que réponse
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des restaurants'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};

// Endpoint pour la fonctionnalité "drink"
exports.getApiDrink = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les bars disponibles
        const response = await axios.get('URL_API_POUR_BARS');

        // Renvoyer les données récupérées en tant que réponse
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des bars'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};
