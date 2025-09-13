const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { signupDoc } = require("../docs/userDocs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Platform API",
      version: "1.0.0",
      description:
        "Production-grade Blog Platform API with Authentication, CRUD, and more",
    },
    servers: [{ url: "http://localhost:5000" }],
    paths: {
      ...signupDoc, // Merge modular docs here
    },
  },
  apis: [],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
