# Testes de Mutação com Stryker Mutator

Trabalho de testes de mutação feito sobre o **primeiro trabalho de testes unitários**
([prova01-unit-test-OctavioDemos](https://github.com/octaviodemos/prova01-unit-test-OctavioDemos)),
usando a ferramenta [Stryker Mutator](https://stryker-mutator.io/) com o Jest como test runner.

## O que é teste de mutação?

O Stryker gera **mutantes**: cópias do código-fonte com pequenas alterações
(troca `>` por `>=`, `true` por `false`, remove chamadas de métodos, esvazia strings etc.).
Depois roda a suíte de testes contra cada mutante:

- **Killed (morto)**: algum teste falhou, ou seja, os testes detectaram a alteração. ✅
- **Survived (sobrevivente)**: todos os testes passaram mesmo com o código alterado. Os testes têm uma lacuna. ❌
- **No coverage**: nenhum teste executa aquele trecho de código. ❌

O **mutation score** (`mortos / total`) mede a qualidade real dos testes, indo além da
cobertura de linhas.

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) >= 20.

```bash
npm install
npm test            # testes unitários (Jest)
npm run coverage    # testes unitários com cobertura
npm run mutation    # testes de mutação (Stryker)
```

O relatório HTML do Stryker é gerado em `reports/mutation/mutation.html`.
A configuração está em [`stryker.config.json`](stryker.config.json); o build quebra se o
score ficar abaixo de 80%.

## Resultados

### Antes: só os testes do primeiro trabalho

| Arquivo          | Score  | Mortos | Sobreviventes | Sem cobertura |
|------------------|-------:|-------:|--------------:|--------------:|
| anagram.js       |  84,62 |     11 |             2 |             0 |
| banco.js         |  96,08 |     49 |             2 |             0 |
| calculator.js    | 100,00 |      9 |             0 |             0 |
| carro.js         |  90,00 |      9 |             1 |             0 |
| cnh.js           | 100,00 |      6 |             0 |             0 |
| contaBancaria.js |  85,51 |    118 |            16 |             4 |
| conversor.js     |   0,00 |      0 |             0 |            44 |
| lista.js         | 100,00 |     13 |             0 |             0 |
| pessoa.js        | 100,00 |      4 |             0 |             0 |
| textoUtils.js    |  78,95 |     60 |            11 |             5 |
| userService.js   | 100,00 |      7 |             0 |             0 |
| utilitarios.js   |  90,24 |     74 |             8 |             0 |
| **Total**        | **79,47** | **360** |       **40** |        **53** |

### Depois: com os novos testes

| Arquivo          | Score  | Mortos | Sobreviventes | Sem cobertura |
|------------------|-------:|-------:|--------------:|--------------:|
| anagram.js       |  84,62 |     11 |             2 |             0 |
| banco.js         | 100,00 |     51 |             0 |             0 |
| calculator.js    | 100,00 |      9 |             0 |             0 |
| carro.js         |  90,00 |      9 |             1 |             0 |
| cnh.js           | 100,00 |      6 |             0 |             0 |
| contaBancaria.js |  97,83 |    135 |             2 |             1 |
| conversor.js     | 100,00 |     44 |             0 |             0 |
| lista.js         | 100,00 |     13 |             0 |             0 |
| pessoa.js        | 100,00 |      4 |             0 |             0 |
| textoUtils.js    |  97,37 |     74 |             2 |             0 |
| userService.js   | 100,00 |      7 |             0 |             0 |
| utilitarios.js   |  98,78 |     81 |             1 |             0 |
| **Total**        | **98,01** | **444** |        **8** |         **1** |

A saída completa da execução final está em [`docs/stryker-final-output.txt`](docs/stryker-final-output.txt).

## Testes adicionados

Os testes novos ficam em [`test/mutation/`](test/mutation) e em [`test/conversor.test.js`](test/conversor.test.js).
Cada um foi escrito para matar mutantes específicos que sobreviveram:

| Mutante sobrevivente (exemplo) | Lacuna no teste original | Teste adicionado |
|---|---|---|
| `valor > saldoDisponivel` → `>=` | Não testava o valor-limite exato | Saque de exatamente `saldo + limite` |
| `return this.conta.status === "ativa"` → `true` | Só testava conta ativa | `estaAtiva()` com conta bloqueada |
| `novoLimite < 0` → `<= 0` | Não testava limite zero | `ajustarLimite(0)` deve aceitar |
| `this.conta.saldo < 0` → `<= 0` | Não testava saldo zero | `saldoNegativo()` com saldo 0, positivo e negativo |
| `["ativa","bloqueada","encerrada"]` → `""` | `validarConta` não testava todos os status | Valida cada status e cada campo inválido isoladamente |
| `contarOcorrencias` sem cobertura | Teste original estava **vazio** | Testa contagem e substring vazia |
| `tamanho < 0` → `<= 0` / mensagem de erro → `""` | Não testava tamanho 0 nem a mensagem | `truncar("abc", 0)` e `toThrow("mensagem")` |
| `/^[a-zA-ZÀ-ÿ]+$/` → `/[a-zA-ZÀ-ÿ]+$/` | Não testava número no início | `somenteLetras("123abc")` |
| `Math.random() * max` → `/ max` | Só verificava o intervalo | Mock de `Math.random` com valor fixo |
| `ehPalindromo` → `return true` | Só testava palíndromos | Casos que **não** são palíndromos |
| `this.transacoes = []` → `["Stryker was here"]` | Histórico inicial não verificado | Histórico deve começar vazio |
| `conversor.js` inteiro sem cobertura | Nenhum teste | Teste parametrizado (`test.each`) para os 22 métodos |

## Mutantes equivalentes (sobreviventes restantes)

Os 9 mutantes que sobraram são **equivalentes**: a alteração não muda o comportamento
observável do código, então nenhum teste consegue matá-los.

| Local | Mutação | Por que é equivalente |
|---|---|---|
| `anagram.js:6` | `.join("")` → `.join("Stryker was here!")` | A mesma transformação é aplicada às duas strings comparadas, então o resultado da comparação não muda. |
| `anagram.js:6` | `toLowerCase()` → `toUpperCase()` | As duas strings são normalizadas para a mesma caixa, então a comparação continua case-insensitive. |
| `carro.js:10` | `distancia > 0` → `>= 0` | Somar `0` à quilometragem não altera nada. |
| `contaBancaria.js:98` | `if (!this.podeSacar(valor))` → `if (false)` | `sacar()` repete a mesma validação e retorna `false`, que é tratado na linha 101. |
| `contaBancaria.js:101` | `if (!sucessoSaque)` → `if (false)` / `return true` | Como `podeSacar` já validou, `sacar()` nunca falha nesse ponto (código redundante/inalcançável). |
| `textoUtils.js:58` | remove `.trim()` | O `.filter(Boolean)` já remove as strings vazias das pontas. |
| `textoUtils.js:58` | `/\s+/` → `/\s/` | Os vazios extras gerados também são removidos pelo `.filter(Boolean)`. |
| `utilitarios.js:97` | `toLowerCase()` → `toUpperCase()` | O texto é comparado com ele mesmo invertido; a caixa usada não importa. |

> Os mutantes de `contaBancaria.js:98/101` mostram **código redundante** em `transferir()`.
> Uma possível refatoração seria remover a checagem duplicada, o que eliminaria esses mutantes.

## Estrutura

```
src/                    código-fonte (mesmo do primeiro trabalho)
test/                   testes unitários originais + conversor.test.js
test/mutation/          testes criados para matar mutantes sobreviventes
stryker.config.json     configuração do Stryker
docs/                   saída da execução final do Stryker
.github/workflows/      CI: roda Jest e Stryker a cada push
```
