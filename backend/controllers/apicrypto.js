const axios = require("axios");

exports.getCoinMarket = async (req, res, next) => {
    try {


        // Make a request to the CoinGecko API using axios
        response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': '4955a046-6314-45d8-b251-b98adbf2a4bf',
                Accept: 'application/json',
            },
            //https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=100
        });
        //  Send the data as JSON in the response
        res.json(response.data);
    } catch (error) {
        //   Handle errors
        console.error(error);
        res.status(500).json({ error: "Error Récupération cryptocurrency data" });
    }
};

exports.getCoinMarketDetails = async (req, res, next) => {
    try {
        const apiKey = '4955a046-6314-45d8-b251-b98adbf2a4bf';
        const coinId = req.params.coinId;  // Récupérer l'identifiant de la cryptomonnaie depuis les paramètres de la requête
        const apiUrl = ` https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${coinId}`;

            // Faire une requête GET à l'API CoinMarketCap
        const response = await axios.get(apiUrl, {
            headers: {
                'X-CMC_PRO_API_KEY': apiKey,
                Accept: 'application/json',
            }
        });

        // Vérifier si la requête a réussi
        if (response.status === 200) {
            // Envoyer les données de la cryptomonnaie en réponse
            res.json(response.data);
        } else {
            // Gérer un code d'état autre que 200
            res.status(response.status).json({ error: "Erreur lors de la récupération des données de la cryptomonnaie" });
        }
    } catch (error) {
        // Gérer les erreurs
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des données de la cryptomonnaie" });
    }
};


exports.getApi = async (req, res, next) => {
    try {
        // Make a request to the CoinGecko API using axios
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    ids: "bitcoin,ethereum,solana",
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                },
            }
        );

        //  Send the data as JSON in the response
        res.json(response.data);
    } catch (error) {
        //   Handle errors
        console.error(error);
        res.status(500).json({ error: "Error fetching cryptocurrency data" });
    }
};

exports.getApi50 = async (req, res, next) => {
    try {
        const itemsPerPage = 10; // Nombre d'éléments par page
        const totalPages = 2; // Nombre total de pages que vous souhaitez récupérer

        let allData = [];

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            // Faites une requête pour obtenir la liste des 50 meilleures cryptomonnaies
            const topCryptosResponse = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets",
                {
                    params: {
                        vs_currency: "usd",
                        order: "market_cap_desc",
                        per_page: itemsPerPage,
                        page: currentPage,
                        sparkline: false,
                    },
                }
            );

            // Extrait les IDs de la réponse
            const cryptoIds = topCryptosResponse.data.map(crypto => crypto.id);

            // Faites la requête principale en utilisant les IDs obtenus
            const mainResponse = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets",
                {
                    params: {
                        vs_currency: "usd",
                        ids: cryptoIds.join(','), // Joindre les IDs dans une chaîne séparée par des virgules
                        order: "market_cap_desc",
                        per_page: itemsPerPage,
                        page: currentPage,
                        sparkline: false,
                    },
                }
            );

            // Ajoutez les données de la page actuelle à la liste globale
            allData = [...allData, ...mainResponse.data];
        }

        // Envoyez les données en tant que JSON dans la réponse
        res.json(allData);
    } catch (error) {
        // Gérez les erreurs
        console.error(error);
        res.status(500).json({ error: "Error fetching cryptocurrency data" });
    }
};


exports.getHistoryApiparDays = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    const startDate = req.params.startDate; // Cette ligne capture le paramètre de date de début

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    from: startDate,
                    days: 60, // ajustez cette valeur en fonction de vos besoins
                },
            }
        );

        const data = response.data;
        const history = {
            prices: data.prices.map((entry) => entry[1]),
        };

        console.log("Fetched history successfully:", history);

        res.json(history);
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
    }
};

exports.getHistoryApiparHeure = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    //  const startDate = req.params.startDate;
    const api_key = "CG-ktjj2Hs8Q21XTLe1DCud6LGV";

    try {
        // Utilisation de la bonne URL pour obtenir l'historique des prix
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    //  days: 1, // Vous pouvez ajuster cette valeur en fonction de vos besoins
                    interval: "48h",
                    api_key: api_key,
                },
            }
        );

        const data = response.data;

        // Vérification si les données des prix sont disponibles
        if (data.prices && data.prices.length > 0) {
            const history = {
                prices: data.prices.map((entry) => entry[1]),
            };

            console.log("Fetched history successfully:", history);

            res.json(history);
        } else {
            console.error("Prices data not available");
            res.status(500).json({ error: "Prices data not available" });
        }
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
    }
};
exports.getHistoryApiparMinute = async (req, res, next) => {
    const cryptoId = req.params.cryptoId;
    const currency = req.params.currency;
    //  const startDate = req.params.startDate;
    const api_key = "CG-ktjj2Hs8Q21XTLe1DCud6LGV";

    try {
        // Utilisation de la bonne URL pour obtenir l'historique des prix
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
            {
                params: {
                    vs_currency: currency,
                    //  days: 1, // Vous pouvez ajuster cette valeur en fonction de vos besoins
                    interval: "60m",
                    api_key: api_key,
                },
            }
        );

        const data = response.data;

        // Vérification si les données des prix sont disponibles
        if (data.prices && data.prices.length > 0) {
            const history = {
                prices: data.prices.map((entry) => entry[1]),
            };

            console.log("Fetched history successfully:", history);

            res.json(history);
        } else {
            console.error("Prices data not available");
            res.status(500).json({ error: "Prices data not available" });
        }
    } catch (error) {
        console.error("Error fetching price history:", error);
        res.status(500).json({ error: "Error fetching price history" });
    }
};
exports.getApiId = async (req, res) => {
    const cryptoId = req.params.id;

    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    ids: cryptoId,
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                },
            }
        );

        const data = response.data;

        // Extract specific details
        const { name, current_price, high_24h, low_24h, image } = data[0];

        // Send a JSON response with the extracted details
        res.json({
            fullName: name,
            currentPrice: current_price,
            high_24h: high_24h,
            low_24h: low_24h,
            image: image,
        });

        //    res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching cryptocurrency data" });
    }
};
