const request = require('supertest');
const app = require('../app');
const axios = require('axios');
const AmadeusServices = require('../services/amadeusServices');

jest.mock('axios');
jest.mock('../services/amadeusServices');

describe('POST /api/travel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return flight offers when called with valid parameters', async () => {
    const fakeResponseData = {
      data: [
        {
          "type": "flight-offer",
          "id": "1",
          "source": "GDS",
          "instantTicketingRequired": expect.any(Boolean),
          "nonHomogeneous": expect.any(Boolean),
          "oneWay": expect.any(Boolean),
          "lastTicketingDate": expect.any(String),
          "lastTicketingDateTime": expect.any(String),
          "numberOfBookableSeats": expect.any(Number),
          "itineraries": [
            {
              "duration": expect.any(String),
              "segments": [
                {
                  "departure": {
                    "iataCode": expect.any(String),
                    "terminal": expect.any(String),
                    "at": expect.any(String)
                  },
                  "arrival": {
                    "iataCode": expect.any(String),
                    "terminal": expect.any(String),
                    "at": expect.any(String)
                  },
                  "carrierCode": expect.any(String),
                  "number": expect.any(String),
                  "aircraft": {
                    "code": expect.any(String)
                  },
                  "operating": {
                    "carrierCode": expect.any(String)
                  },
                  "duration": expect.any(String),
                  "id": expect.any(String),
                  "numberOfStops": expect.any(Number),
                  "blacklistedInEU": expect.any(Boolean)
                }
              ]
            }
          ],
          "price": {
            "currency": expect.any(String),
            "total": expect.any(String),
            "base": expect.any(String),
            "fees": [
              {
                "amount": expect.any(String),
                "type": expect.any(String)
              },
              {
                "amount": expect.any(String),
                "type": expect.any(String)
              }
            ],
            "grandTotal": expect.any(String)
          },
          "pricingOptions": {
            "fareType": [
              expect.any(String)
            ],
            "includedCheckedBagsOnly": expect.any(Boolean)
          },
          "validatingAirlineCodes": [
            expect.any(String)
          ],
          "travelerPricings": [
            {
              "travelerId": expect.any(String),
              "fareOption": expect.any(String),
              "travelerType": expect.any(String),
              "price": {
                "currency": expect.any(String),
                "total": expect.any(String),
                "base": expect.any(String)
              },
              "fareDetailsBySegment": [
                {
                  "segmentId": expect.any(String),
                  "cabin": expect.any(String),
                  "fareBasis": expect.any(String),
                  "brandedFare": expect.any(String),
                  "brandedFareLabel": expect.any(String),
                  "class": expect.any(String),
                  "includedCheckedBags": {
                    "quantity": expect.any(Number)
                  },
                  "amenities": [
                    {
                      "description": expect.any(String),
                      "isChargeable": expect.any(Boolean),
                      "amenityType": expect.any(String),
                      "amenityProvider": {
                        "name": expect.any(String)
                      }
                    },
                  ]
                },
              ]
            }
          ]
        }
      ]
    };

    const fakeAccessToken = '0v8bOSkQhrsWQqIdI6rmV5CYObXJ';
    const fakeOriginLocationCode = 'JFK';
    const fakeDestinationLocationCode = 'LAX';
    const fakeReturnDate = '2024-05-20';
    const fakeDepartureDate = '2024-05-15';
    const fakeAdults = 1;

    axios.get.mockResolvedValueOnce({ data: fakeResponseData });
    AmadeusServices.prototype.tokenAccessAmadeus.mockResolvedValueOnce(fakeAccessToken);
    AmadeusServices.prototype.tokenApisCall.mockResolvedValueOnce({ data: fakeResponseData });


    const response = await request(app)
      .post('/api/travel')
      .send({
        originLocationCode: fakeOriginLocationCode,
        destinationLocationCode: fakeDestinationLocationCode,
        returnDate: fakeReturnDate,
        departureDate: fakeDepartureDate,
        adults: fakeAdults
      });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0); // Check if data array is not empty
      
      const firstOffer = response.body.data[0]; // Get the first flight offer
      expect(firstOffer.type).toBe("flight-offer"); // Check type
      expect(firstOffer.id).toBe("1"); // Check id
      
  });

  it('should return 500 error when there is an error in fetching flight offers', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fake error'));

    const response = await request(app)
      .post('/api/travel')
      .send({});

    expect(response.status).toBe(500);
    expect(response.text).toBe('Erreur lors de la récupération des options de transport');
  });
});
