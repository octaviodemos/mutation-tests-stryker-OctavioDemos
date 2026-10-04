const TextoUtils = require("../../src/textoUtils");

describe("TextoUtils - testes para matar mutantes", () => {
  let utils;

  beforeEach(() => {
    utils = new TextoUtils();
  });

  test("capitalizar deve preservar espacos duplos (palavras vazias)", () => {
    expect(utils.capitalizar("olá  MUNDO")).toBe("Olá  Mundo");
  });

  test("contarOcorrencias deve contar substrings e retornar 0 para substring vazia", () => {
    expect(utils.contarOcorrencias("banana", "an")).toBe(2);
    expect(utils.contarOcorrencias("banana", "x")).toBe(0);
    expect(utils.contarOcorrencias("banana", "")).toBe(0);
  });

  test("paraSlug deve remover espacos das pontas e agrupar espacos internos", () => {
    expect(utils.paraSlug("  Olá   Mundo  ")).toBe("ola-mundo");
  });

  test("truncar deve manter texto com tamanho exatamente igual ao limite", () => {
    expect(utils.truncar("abc", 3)).toBe("abc");
  });

  test("truncar deve aceitar tamanho zero", () => {
    expect(utils.truncar("abc", 0)).toBe("...");
  });

  test("truncar deve lancar erro com mensagem especifica", () => {
    expect(() => utils.truncar("abc", -1)).toThrow("O tamanho não pode ser negativo");
  });

  test("contarPalavras deve retornar 0 para texto vazio ou so com espacos", () => {
    expect(utils.contarPalavras("")).toBe(0);
    expect(utils.contarPalavras("   ")).toBe(0);
    expect(utils.contarPalavras("uma")).toBe(1);
  });

  test("somenteLetras deve exigir letras do inicio ao fim", () => {
    expect(utils.somenteLetras("123abc")).toBe(false);
    expect(utils.somenteLetras("abc123")).toBe(false);
    expect(utils.somenteLetras("Ação")).toBe(true);
  });

  test("substituirTudo deve lancar erro com mensagem especifica", () => {
    expect(() => utils.substituirTudo("abc", "", "x")).toThrow("O alvo não pode ser vazio");
  });
});
