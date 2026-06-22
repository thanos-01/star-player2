# Star Player 2

> Engine modular de animações científicas em canvas.

## Visão Geral

Este projeto evolui o protótipo original para uma arquitetura de engine modular baseada em canvas.
A engine centraliza o tempo, controla cenas sequenciais e permite pausar, reproduzir e alterar a velocidade.

## Estrutura do projeto

- `index.html` — ponto de entrada da engine
- `style.css` — estilos e layout da interface
- `main.js` — inicialização do engine e loop principal
- `engine/`
  - `timeEngine.js` — gerenciamento global de tempo
  - `sceneManager.js` — seleção de cenas ativas
  - `renderer.js` — renderização de canvas e camadas
- `scenes/`
  - `planckTime.js` — cena de visualização do tempo de Planck
  - `starsBackground.js` — cena de fundo de estrelas
  - `solarSystemScale.js` — cena de escala do Sistema Solar
- `ui/`
  - `controls.js` — lógica de botões e interface

## Como executar

1. Abra o terminal no diretório do projeto.
2. Inicie um servidor local:

```bash
python3 -m http.server 8000
```

3. Abra `http://localhost:8000/index.html` no navegador.

## Funcionalidades

- loop único de animação baseado em `requestAnimationFrame`
- timeline global determinista em `engine/timeEngine.js`
- seleção de cenas por tempo global e por botão
- controles de play/pause, loop e velocidade
- arquitetura orientada a cenas simples e extensível

## Próximos passos

- adicionar exportação MP4 via renderização de frames
- criar novas cenas científicas e educacionais
- separar camadas visuais em múltiplos renderizadores
