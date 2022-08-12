import { Response, Request } from "express";
import { notFoundError } from "./errors";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response object", () => {
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

    test("Then it should call the response method status with 404", () => {
      const status = 404;

      notFoundError(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response method json with a 'Endpoint not found' error", () => {
      const errorResponse = {
        error: "Endpoint not found",
      };

      notFoundError(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});
