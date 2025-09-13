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

module.exports = { signupDoc };
