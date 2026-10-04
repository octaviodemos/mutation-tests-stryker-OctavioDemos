class Conversor {

    celsiusParaFahrenheit(c) {
        return (c * 9/5) + 32;
    }

    fahrenheitParaCelsius(f) {
        return (f - 32) * 5/9;
    }

    metrosParaCentimetros(m) {
        return m * 100;
    }

    centimetrosParaMetros(cm) {
        return cm / 100;
    }

    quilosParaGramas(kg) {
        return kg * 1000;
    }

    gramasParaQuilos(g) {
        return g / 1000;
    }

    horasParaMinutos(h) {
        return h * 60;
    }

    minutosParaSegundos(m) {
        return m * 60;
    }

    diasParaHoras(d) {
        return d * 24;
    }

    semanasParaDias(s) {
        return s * 7;
    }

    reaisParaCentavos(r) {
        return r * 100;
    }

    centavosParaReais(c) {
        return c / 100;
    }

    kmParaMetros(km) {
        return km * 1000;
    }

    metrosParaKm(m) {
        return m / 1000;
    }

    polegadasParaCm(pol) {
        return pol * 2.54;
    }

    cmParaPolegadas(cm) {
        return cm / 2.54;
    }

    anosParaMeses(anos) {
        return anos * 12;
    }

    mesesParaDias(meses) {
        return meses * 30;
    }

    bytesParaKb(bytes) {
        return bytes / 1024;
    }

    kbParaBytes(kb) {
        return kb * 1024;
    }
}

module.exports = Conversor;