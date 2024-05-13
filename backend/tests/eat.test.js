const request = require('supertest');
const app = require('../app');
const axios = require('axios');
const AmadeusServices = require('../services/amadeusServices');

jest.mock('axios');
jest.mock('../services/amadeusServices');

describe('POST /api/eat', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return restaurants or bars when called with valid parameters', async () => {
    const fakeResponseData = {
      data: [
        {
          type: 'location',
          subType: 'POINT_OF_INTEREST',
          id: 'F91BB2CD8D',
          self: { href: 'https://test.api.amadeus.com/v1/reference-data/locations/pois/F91BB2CD8D', methods: ['GET'] },
          geoCode: { latitude: 48.87541, longitude: 2.36001 },
          name: 'Café A',
          category: 'NIGHTLIFE',
          rank: 10,
          tags: ['restaurant', 'bar', 'nightlife', 'pub', 'tourguide', 'sightseeing', 'activities', 'attraction']
        },
        // Add other fake data objects here following the same structure
      ]
    };

    const fakeAccessToken = '0v8bOSkQhrsWQqIdI6rmV5CYObXJ';
    const fakeLocation = 'paris';
    const fakeCategory = 'NIGHTLIFE';
    const fakeRadius = 10;

    axios.get.mockResolvedValueOnce({ data: [{ lat: 48.8566, lon: 2.3522 }] });
    AmadeusServices.prototype.tokenAccessAmadeus.mockResolvedValueOnce(fakeAccessToken);
    AmadeusServices.prototype.tokenApisCall.mockResolvedValueOnce({ data: fakeResponseData });

    const response = await request(app)
      .post('/api/eat')
      .send({ location: fakeLocation, category: fakeCategory, radius: fakeRadius });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeResponseData);
  });

  it('should return 500 error when there is an error in fetching restaurants or bars', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fake error'));

    const response = await request(app)
      .post('/api/eat')
      .send({});

    expect(response.status).toBe(500);
    expect(response.text).toBe('Erreur lors de la récupération des restaurants ou les bars');
  });
});
