const Conversor = require("../src/conversor");

describe("Conversor", () => {
  const conv = new Conversor();

  test.each([
    ["celsiusParaFahrenheit", 100, 212],
    ["celsiusParaFahrenheit", 0, 32],
    ["fahrenheitParaCelsius", 212, 100],
    ["fahrenheitParaCelsius", 32, 0],
    ["metrosParaCentimetros", 2, 200],
    ["centimetrosParaMetros", 250, 2.5],
    ["quilosParaGramas", 3, 3000],
    ["gramasParaQuilos", 1500, 1.5],
    ["horasParaMinutos", 2, 120],
    ["minutosParaSegundos", 3, 180],
    ["diasParaHoras", 2, 48],
    ["semanasParaDias", 3, 21],
    ["reaisParaCentavos", 5, 500],
    ["centavosParaReais", 250, 2.5],
    ["kmParaMetros", 2, 2000],
    ["metrosParaKm", 3500, 3.5],
    ["polegadasParaCm", 10, 25.4],
    ["cmParaPolegadas", 25.4, 10],
    ["anosParaMeses", 2, 24],
    ["mesesParaDias", 2, 60],
    ["bytesParaKb", 2048, 2],
    ["kbParaBytes", 2, 2048],
  ])("%s(%p) deve retornar %p", (metodo, entrada, esperado) => {
    expect(conv[metodo](entrada)).toBeCloseTo(esperado, 10);
  });
});
