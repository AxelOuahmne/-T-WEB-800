const axios = require("axios");
const config = require('../config/config');
const clientID = config.CLIENT_ID;
const clientSecret = config.CLIENT_SECRET;

// Endpoint pour la fonctionnalité "sleep"
exports.getApiSleep = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les hébergements disponibles
                const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Obtenez la date actuelle au format YYYYMMDD

        const url = `https://api.foursquare.com/v3/places/search?query=Place%20de%20stalingrad%2C%20Paris%2C%2075019&sort=DISTANCE`;

        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': clientSecret
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

// Endpoint pour la fonctionnalité "travel"
exports.getApiTravel = async (req, res, next) => {
    try {
        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',`grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }});

        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // Utiliser le jeton d'accès pour authentifier la requête vers l'API Amadeus
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PAR&destinationLocationCode=TLV&departureDate=2024-05-02&adults=1&nonStop=true`;

        const response = await axios.get(url, {
            headers: {
                'Accept': '*/*',
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
