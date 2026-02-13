import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, {
    resultado: "Nombre procesado: JUAN",
    longitud: 4
  });
}); // ✅ cierre que faltaba

test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});

test("politica minima de calidad: formato y mayusculas", () => {
  const req = { query: { nombre: "LiaM" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(typeof res.body.resultado === "string");

  const prefijo = "Nombre procesado: ";
  assert.ok(res.body.resultado.startsWith(prefijo));

  const nombreProcesado = res.body.resultado.slice(prefijo.length);
  assert.equal(nombreProcesado, nombreProcesado.toUpperCase());

  if ("longitud" in res.body) {
    assert.ok(Number.isInteger(res.body.longitud));
  }
});

test('procesar simula falla cuando nombre === "error"', () => {
  const req = { query: { nombre: "error" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: "Falla simulada" });
});

