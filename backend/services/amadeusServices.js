const axios = require("axios");
const config = require("../config/config");
class AmadeusServices {
  async tokenAccessAmadeus() {
    const clientID = config.CLIENT_ID; // Remplacez par votre client ID Amadeus
    const clientSecret = config.CLIENT_SECRET; // Remplacez par votre client secret Amadeus
    try {
      const tokenResponse = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      // Extraire le jeton d'accès de la réponse
      const accessToken = tokenResponse.data.access_token;
      return accessToken;
    } catch (error) {
      return sendErrorResponse(res, 500, "Internal server error.");
    }
  }
}

module.exports = AmadeusServices;