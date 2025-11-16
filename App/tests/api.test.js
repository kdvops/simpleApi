import request from "supertest";
import app from "../src/server.js";
import pool from "../src/db.js";

jest.mock("../src/db.js");

describe("API MySQL Tests", () => {

  test("GET /api/usuarios debería devolver una lista", async () => {

    const mockData = [
      { id: 1, nombre: "Kelvin", email: "kelvin@kdvops.com" },
      { id: 2, nombre: "Maria", email: "maria@mail.com" }
    ];

    pool.query.mockResolvedValue([mockData]); // mock query

    const res = await request(app).get("/api/usuarios");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].nombre).toBe("Kelvin");
  });


  test("GET /api/usuarios/1 devuelve un usuario", async () => {

    const mockUser = [
      { id: 1, nombre: "Kelvin", email: "kelvin@kdvops.com" }
    ];

    pool.query.mockResolvedValue([mockUser]);

    const res = await request(app).get("/api/usuarios/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("kelvin@kdvops.com");
  });


  test("GET /api/usuarios/99 retorna 404", async () => {

    pool.query.mockResolvedValue([[]]); // Sin resultados

    const res = await request(app).get("/api/usuarios/99");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Usuario no encontrado");
  });

});
