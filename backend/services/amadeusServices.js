const axios = require("axios");
const config = require("../config/config");

class AmadeusServices {
  async tokenAccessAmadeus() {
    const clientID = config.CLIENT_ID;
    const clientSecret = config.CLIENT_SECRET;

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

      return tokenResponse.data.access_token;
    } catch (error) {
      console.error("Error in tokenAccessAmadeus:", error.message);
      throw new Error("Failed to obtain access token from Amadeus");
    }
  }

  async tokenApisCall(Endpoint, message, accessToken) {
    try {
      console.log()
      const response = await axios.get(Endpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`${message}: ${response.statusText}`);
        throw new Error(`${message}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error in tokenApisCall:", error.message);
      throw new Error("Failed to call Amadeus API");
    }
  }
}

module.exports = AmadeusServices;
