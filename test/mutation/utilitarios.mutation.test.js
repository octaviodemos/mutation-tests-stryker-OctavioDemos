const Utilitarios = require("../../src/utilitarios");

describe("Utilitarios - testes para matar mutantes", () => {
  let util;

  beforeEach(() => {
    util = new Utilitarios();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("gerarNumeroAleatorio deve multiplicar o aleatorio pelo maximo", () => {
    // Arrange
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    // Act / Assert
    expect(util.gerarNumeroAleatorio(10)).toBe(5);
    expect(util.gerarNumeroAleatorio()).toBe(50);
  });

  test("ehNumero deve retornar false para tipos que nao sao number", () => {
    expect(util.ehNumero("10")).toBe(false);
    expect(util.ehNumero(null)).toBe(false);
    expect(util.ehNumero(0)).toBe(true);
  });

  test("ehPalindromo deve retornar false para textos que nao sao palindromos", () => {
    expect(util.ehPalindromo("abc")).toBe(false);
    expect(util.ehPalindromo("Socorram-me, subi no onibus em Marrocos")).toBe(true);
    expect(util.ehPalindromo("ab_ba")).toBe(true);
    expect(util.ehPalindromo("a_b")).toBe(false);
  });
});
