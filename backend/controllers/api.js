const axios = require("axios");
const Amadeus = require('amadeus');
const config = require('../config/config.js');
// Créez une instance Amadeus avec les identifiants en dur
const amadeus = new Amadeus({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
});

exports.getApiSleep = async (req, res, next) => {
    try {
        console.log("la requete est dnen : ", req.body.destination);
        // Vos identifiants Amadeus
        const clientID      = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret  = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus
        // Récupérer les données envoyées dans le corps de la requête POST
        const cityCode      = req.body.destination;

        if (!cityCode) {
            return res.status(400).send('Le code de la ville est manquant dans la requête.');
        }
        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;
        // Utiliser le jeton d'accès pour authentifier la requête vers l'API Amadeus pour rechercher des hôtels
        const url         = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`;
        const response    = await axios.get(url, {
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

exports.getApiSleep2 = async (req, res, next) => {
    try {
        // Vos identifiants Amadeus
        const clientID = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus

        // Récupérer les données envoyées dans le corps de la requête POST
        const location = req.body.location;

        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // get latitude and longtitude from address
        const urlLong = `https://geocode.maps.co/search?q=${location}&api_key=65f85c1008e38545180841bag1e79bd`;
        await axios.get(urlLong)
            .then(async response => {
                const latitude  =  response.data[0].lat
                const longitude =  response.data[0].lon
                // Logique pour récupérer et renvoyer les restaurants ou les bars disponibles
                const responsee = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${latitude}&longitude=${longitude}&radius=5&radiusUnit=KM&hotelSource=ALL`,{
                headers: {
                    'Accept': '/',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        // Renvoyer les données récupérées en tant que réponse
        if (responsee.status === 200) {
            console.log(responsee.data); // Affiche la réponse de l'API dans la console
            res.json(responsee.data);
        } else {
            console.error(`Erreur lors de la récupération des hébergements: ${responsee.statusText}`);
            res.status(responsee.status).send('Erreur lors de la récupération des hébergements');
        }
    })
} catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des hébergements'); // En cas d'erreur, renvoyer une réponse d'erreur
}
};

exports.getApiHotelValidate = async (req, res, next) => {
    try {
        console.log("la requete est dnen : ", req.body.destination);

        //Mes variables
        const idHotel      = (req.body.idHotel) ? req.body.idHotel : 'MCLONGHM';
        const nbAdult      = (req.body.nbAdult) ? req.body.nbAdult : 1;
        const checkIn      = (req.body.checkIn) ? req.body.checkIn : '';
        const checkOut     = (req.body.checkOut) ? req.body.checkOut : '';
        const qttRoom      = (req.body.qttRoom) ? req.body.qttRoom : 1;



        // Vos identifiants Amadeus
        const clientID      = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret  = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus
        // Obtenir le jeton d'accès
        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;
        // Utiliser le jeton d'accès pour authentifier la requête vers l'API Amadeus pour rechercher des hôtels
        //const url           = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${idHotel}&adults=${nbAdult}&checkInDate=${checkIn}&checkOutDate=${checkOut}&roomQuantity=${qttRoom}&paymentPolicy=NONE&bestRateOnly=true`;
        const url             = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=MCLONGHM&adults=1&checkInDate=2024-03-26&checkOutDate=2024-03-27&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`;
        const response    = await axios.get(url, {
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
        const { originLocationCode, destinationLocationCode, returnDate, departureDate, adults } = req.body;

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
exports.getApiEatDrinks = async (req, res, next) => {
    try {
        const location = req.body.location
        const clientID = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus

        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // get latitude and longtitude from address
        const url = `https://geocode.maps.co/search?q=${location}&api_key=65f85c1008e38545180841bag1e79bd`
        
        await axios.get(url)
            .then(async response => {
                
                const categories = req.body.category
                const latitude = response.data[0].lat
                const longitude =response.data[0].lon
                const radius = req.body.radius
                
                // Logique pour récupérer et renvoyer les restaurants ou les bars disponibles
                const responsee = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois?categories=${categories}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,{
                
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                // Renvoyer les données récupérées en tant que réponse
                if (responsee.status === 200) {
                    console.log(responsee.data); // Affiche la réponse de l'API dans la console
                    res.json(responsee.data);
                } else {
                    console.error(`Erreur lors de la récupération des hébergements: ${responsee.statusText}`);
                    res.status(responsee.status).send('Erreur lors de la récupération des hébergements');
                }
            })

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des restaurants'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};

// Endpoint pour la fonctionnalité "drink"
exports.getApiDrink = async (req, res, next) => {
    try {

        const clientID = '6Y4vUsa5Ljk4F6Rfpi6jaaURyZNuE8m4'; // Remplacez par votre client ID Amadeus
        const clientSecret = 'tXszT7d9Ur5Xlp4A'; // Remplacez par votre client secret Amadeus

        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // Extraire le jeton d'accès de la réponse
        const accessToken = tokenResponse.data.access_token;

        // get latitude and longtitude from address
        const url = `https://geocode.maps.co/search?q=${location}&api_key=65f85c1008e38545180841bag1e79bd`
        
        
        await axios.get(url)
            .then(async response => {
                const categories = ["BARS","NIGHTLIFE"]
                const latitude = response.data[0].lat
                const longitude =response.data[0].lon
                const radius = req.body.radius
                // Logique pour récupérer et renvoyer les restaurants disponibles
                const responsee = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/pois?categories=${categories}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,{
                  
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                if (responsee.status === 200) {
                    console.log(responsee.data); // Affiche la réponse de l'API dans la console
                    res.json(responsee.data);
                } else {
                    console.error(`Erreur lors de la récupération des hébergements: ${responsee.statusText}`);
                    res.status(responsee.status).send('Erreur lors de la récupération des hébergements');
                }
            })
        

        // Renvoyer les données récupérées en tant que réponse
        //res.json(responsee.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des bars'); // En cas d'erreur, renvoyer une réponse d'erreur
    }
};
