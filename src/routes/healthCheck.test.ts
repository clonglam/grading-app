import request from "supertest";
import app from "../index";

describe("Start server", () => {
    test("should returns 200", async () => {
        const res = await request(app).get("/healthcheck");

        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual("hello world!");
    });
});
