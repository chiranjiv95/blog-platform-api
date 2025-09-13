const signupDoc = {
  "/api/users/signup": {
    post: {
      tags: ["Users"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email", "password"],
              properties: {
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john@example.com" },
                password: { type: "string", example: "password123" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
        },
        400: { description: "User already exists" },
        500: { description: "Server error" },
      },
    },
  },
};

const loginDoc = {
  "/api/users/login": {
    post: {
      tags: ["Users"],
      summary: "Login user and get JWT",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", example: "john@example.com" },
                password: { type: "string", example: "password123" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Login successful" },
                  token: { type: "string", example: "JWT_TOKEN_HERE" },
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "64f9c8d8b1c0a5e123456789",
                      },
                      name: { type: "string", example: "John Doe" },
                      email: { type: "string", example: "john@example.com" },
                      role: { type: "string", example: "user" },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: "Invalid email or password" },
        500: { description: "Server error" },
      },
    },
  },
};

module.exports = { signupDoc, loginDoc };
