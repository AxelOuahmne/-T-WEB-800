const request = require('supertest');
const app = require('../app');
const amadeus = require('../services/amadeus'); // Assuming this is how you import Amadeus API client

jest.mock('../services/amadeus'); // Mocking the Amadeus API client

describe('GET /api/airport', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return airport or city suggestions when called with valid parameters', async () => {
    const fakeAirportData = {
      data: [
        {
          type: 'location',
          subType: 'AIRPORT',
          name: 'John F. Kennedy International Airport',
          iataCode: 'JFK',
          address: {
            cityName: 'New York City',
            countryName: 'United States',
          },
        },
      ]
    };

    const fakeTerm = 'New York';

    amadeus.referenceData.locations.get.mockResolvedValueOnce({ data: fakeAirportData });

    const response = await request(app)
      .get('/api/airport')
      .query({ term: fakeTerm });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeAirportData);
  });

  it('should return 500 error when there is an error in fetching airport suggestions', async () => {
    const fakeTerm = 'New York';
    const errorMessage = 'Fake error';

    amadeus.referenceData.locations.get.mockRejectedValueOnce(new Error(errorMessage));

    const response = await request(app)
      .get('/api/airport')
      .query({ term: fakeTerm });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Une erreur s\'est produite lors de la recherche d\'aéroports.' });
  });
});
