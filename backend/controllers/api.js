const axios = require("axios");

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


// Endpoint pour la fonctionnalité "sleep"
exports.getApiSleep = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les hébergements disponibles
        const response = await axios.get('URL_API_POUR_HÉBERGEMENTS');

        // Renvoyer les données récupérées en tant que réponse
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des hébergements'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};

// Endpoint pour la fonctionnalité "travel"
exports.getApiTravel = async (req, res, next) => {
    try {
        // Logique pour récupérer et renvoyer les options de transport disponibles
        const response = await axios.get('URL_API_POUR_TRANSPORTS');

        // Renvoyer les données récupérées en tant que réponse
        res.json(response.data);
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
