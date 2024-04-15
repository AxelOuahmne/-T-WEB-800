const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  basePath: '/', // Base path for all endpoints
  info: {
    title: "APIs",
    version: "1.0.0",
    description: "API Description",
  },
  servers:[
    {
        url:"http://localhost:3000"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./routes/api.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
console.log(swaggerSpec)
module.exports = swaggerSpec;
