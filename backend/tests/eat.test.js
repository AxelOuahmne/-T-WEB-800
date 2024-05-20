const puppeteer = require('puppeteer');
const axios = require('axios');
const AmadeusServices = require('../services/amadeusServices');
const app = require('../app');
const http = require('http');

jest.mock('axios');
jest.mock('../services/amadeusServices');

let server;
let browser;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe('E2E test for /api/eat', () => {
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await browser.close();
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
        }
      ]
    };

    const fakeAccessToken = '0v8bOSkQhrsWQqIdI6rmV5CYObXJ';
    const fakeLocation = 'paris';
    const fakeCategory = 'NIGHTLIFE';
    const fakeRadius = 10;

    axios.get.mockResolvedValueOnce({ data: [{ lat: 48.8566, lon: 2.3522 }] });
    AmadeusServices.prototype.tokenAccessAmadeus.mockResolvedValueOnce(fakeAccessToken);
    AmadeusServices.prototype.tokenApisCall.mockResolvedValueOnce({ data: fakeResponseData });

    const testUrl = `http://localhost:${server.address().port}/api/eat`;

    try {
      await page.goto(testUrl);

      const requestData = {
        location: fakeLocation,
        category: fakeCategory,
        radius: fakeRadius
      };

      const response = await page.evaluate(async (requestData) => {
        try {
          const response = await fetch('/api/eat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });
          const data = await response.json();
          return { status: response.status, body: data };
        } catch (error) {
          console.error('Error occurred during request:', error);
          throw error;
        }
      }, requestData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fakeResponseData);
    } catch (error) {
      console.error('Error occurred during test:', error);
      throw error;
    }
  });

  it('should return 500 error when there is an error in fetching restaurants or bars', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fake error'));

    const testUrl = `http://localhost:${server.address().port}/api/eat`;

    try {
      await page.goto(testUrl);

      const response = await page.evaluate(async () => {
        try {
          const response = await fetch('/api/eat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          });
          const text = await response.text();
          return { status: response.status, text: text };
        } catch (error) {
          console.error('Error occurred during request:', error);
          throw error;
        }
      });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de la récupération des restaurants ou les bars');
    } catch (error) {
      console.error('Error occurred during test:', error);
      throw error;
    }
  });
});
