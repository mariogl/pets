import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "..";
import connectDB from "../../database";
import User from "../../database/models/User";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  await connectDB(mongoURL);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given the endpoint POST /users/register", () => {
  describe("When it receives a request with username 'mariogl' and password 'mariogl'", () => {
    test("Then it should response with status 201 and a message 'User created'", async () => {
      const message = "User created";
      const { body } = await request(app)
        .post("/users/register")
        .send({ name: "Marius", username: "mariogl", password: "mariogl" })
        .expect(201);

      expect(body).toHaveProperty("message", message);
    });
  });

  describe("When it receives a request without password", () => {
    test("Then it should respond with status 400 and a message 'Wrong data'", async () => {
      const message = "Wrong data";
      const { body } = await request(app)
        .post("/users/register")
        .send({ name: "Marius", username: "mariogl" })
        .expect(400);

      expect(body).toHaveProperty("error", message);
    });
  });
});

describe("Given a POST /users/login endpoint", () => {
  describe("When it receives a request with username 'mariogl' and password 'mariogl'", () => {
    test("Then it should respond with status 200 and a token", async () => {
      await request(app)
        .post("/users/login")
        .send({ username: "mariogl", password: "mariogl" })
        .expect(200);
    });
  });
});
