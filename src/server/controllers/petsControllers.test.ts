import { Request, Response } from "express";
import { createPet, getPets } from "./petsControllers";
import Pet from "../../database/models/Pet";

describe("Given a getPets controller", () => {
  describe("When it receives a response", () => {
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    test("Then it should call the response method status with 200", async () => {
      const status = 200;
      Pet.find = jest.fn();

      await getPets(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    describe("And Pet.find() returns a list with Nano and Lorenzo", () => {
      test("Then it should call the response method json with Nano and Lorenzo", async () => {
        const pets = [
          {
            name: "Lorenzo",
            age: 14,
            chip: "sdfsdf",
          },
          {
            name: "Nano",
            age: 13,
            chip: "sdfsdf",
          },
        ];
        Pet.find = jest.fn().mockResolvedValue(pets);

        await getPets(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ pets });
      });
    });
  });
});

describe("Given a createPet controller", () => {
  describe("When it receives a response object", () => {
    const arturito = {
      name: "Arturito",
    };
    const req = {
      body: arturito,
    } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = () => {};

    Pet.create = jest.fn().mockResolvedValue(arturito);

    test("Then it should call the response method status with 201", async () => {
      const status = 201;

      await createPet(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response json method with Arturito", async () => {
      await createPet(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ pet: arturito });
    });
  });
});
