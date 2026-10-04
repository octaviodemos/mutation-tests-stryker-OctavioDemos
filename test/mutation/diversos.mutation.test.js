const { isAnagram } = require("../../src/anagram");
const Banco = require("../../src/banco");

describe("anagram - testes para matar mutantes", () => {
  test("deve ordenar os caracteres antes de comparar", () => {
    expect(isAnagram("abc", "cba")).toBe(true);
    expect(isAnagram("Listen", "Silent")).toBe(true);
  });
});

describe("Banco - testes para matar mutantes", () => {
  test("deve iniciar com historico vazio", () => {
    const conta = new Banco("Ana", 100);
    expect(conta.obterHistorico()).toEqual([]);
  });

  test("deve permitir sacar exatamente o saldo", () => {
    const conta = new Banco("Ana", 100);
    expect(conta.sacar(100)).toBe(0);
  });
});
