const ContaBancaria = require("../../src/contaBancaria");

const criarConta = (sobrescrever = {}) => ({
  id: "1",
  titular: "Maria",
  saldo: 100,
  limite: 50,
  status: "ativa",
  atualizadaEm: new Date("2024-01-01T00:00:00.000Z"),
  ...sobrescrever,
});

describe("ContaBancaria - testes para matar mutantes", () => {
  test("estaAtiva deve retornar false quando a conta nao esta ativa", () => {
    // Arrange
    const conta = new ContaBancaria(criarConta({ status: "bloqueada" }));

    // Act
    const ativa = conta.estaAtiva();

    // Assert
    expect(ativa).toBe(false);
  });

  test("sacar deve permitir sacar exatamente o saldo disponivel (saldo + limite)", () => {
    // Arrange
    const conta = new ContaBancaria(criarConta());

    // Act
    const resultado = conta.sacar(150);

    // Assert
    expect(resultado).toBe(true);
    expect(conta.obterSaldo()).toBe(-50);
  });

  test("podeSacar deve validar os limites inferior e superior", () => {
    // Arrange
    const conta = new ContaBancaria(criarConta());

    // Act / Assert
    expect(conta.podeSacar(0)).toBe(false);
    expect(conta.podeSacar(1)).toBe(true);
    expect(conta.podeSacar(150)).toBe(true);
    expect(conta.podeSacar(151)).toBe(false);
  });

  test("ajustarLimite deve aceitar limite zero", () => {
    // Arrange
    const conta = new ContaBancaria(criarConta());

    // Act
    const resultado = conta.ajustarLimite(0);

    // Assert
    expect(resultado).toBe(true);
    expect(conta.obterLimite()).toBe(0);
  });

  test("saldoNegativo deve retornar false para saldo zero ou positivo", () => {
    // Arrange
    const contaZerada = new ContaBancaria(criarConta({ saldo: 0 }));
    const contaPositiva = new ContaBancaria(criarConta({ saldo: 10 }));
    const contaNegativa = new ContaBancaria(criarConta({ saldo: -1 }));

    // Act / Assert
    expect(contaZerada.saldoNegativo()).toBe(false);
    expect(contaPositiva.saldoNegativo()).toBe(false);
    expect(contaNegativa.saldoNegativo()).toBe(true);
  });

  test("transferir nao deve alterar nenhuma conta quando o valor excede o disponivel", () => {
    // Arrange
    const origem = new ContaBancaria(criarConta());
    const destino = new ContaBancaria(criarConta({ id: "2", saldo: 0 }));

    // Act
    const resultado = origem.transferir(151, destino);

    // Assert
    expect(resultado).toBe(false);
    expect(origem.obterSaldo()).toBe(100);
    expect(destino.obterSaldo()).toBe(0);
  });

  test("validarConta deve aceitar todos os status validos e limite zero", () => {
    // Arrange
    const status = ["ativa", "bloqueada", "encerrada"];

    // Act / Assert
    status.forEach((s) => {
      expect(new ContaBancaria(criarConta({ status: s })).validarConta()).toBe(true);
    });
    expect(new ContaBancaria(criarConta({ limite: 0 })).validarConta()).toBe(true);
  });

  test("validarConta deve rejeitar cada campo invalido isoladamente", () => {
    // Arrange
    const invalidas = [
      criarConta({ id: "" }),
      criarConta({ titular: "" }),
      criarConta({ saldo: "100" }),
      criarConta({ limite: -1 }),
      criarConta({ status: "suspensa" }),
    ];

    // Act / Assert
    invalidas.forEach((dados) => {
      expect(new ContaBancaria(dados).validarConta()).toBe(false);
    });
  });
});
