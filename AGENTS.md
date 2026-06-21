# Instruções para agentes do Star Player 2

## Objetivo
Este é um protótipo de animação para navegador com cenas reutilizáveis de estrelas/planetas. A aplicação usa uma única página HTML com um canvas, fundo em CSS e cenas JavaScript modulares.

## Arquivos principais
- `star_player.html`: estrutura principal, canvas, controles e modal de seleção de cena inicial
- `style.css`: estilos visuais e fundo fixo de estrelas
- `main.js`: inicialização do app, seleção de cena, loop de animação e tratamento dos controles
- `js/scenes/star.js` e `js/scenes/orbit.js`: módulos de cena com as exportações `init()`, `update(dt)` e `draw(ctx, w, h, time)`

## Convenções
- As cenas são módulos separados em `js/scenes/`
- Cada cena deve expor:
  - `init()` para preparação do estado
  - `update(dt)` para avançar a animação com base no delta time
  - `draw(ctx, w, h, time)` para desenhar cada quadro
- O canvas fica oculto até que o usuário escolha a cena inicial
- O fundo de estrelas é desenhado em CSS, não no canvas
- O projeto não utiliza ferramenta de build ou gerenciador de pacotes JavaScript

## Teste local
Use um servidor HTTP local porque importações de módulo podem não funcionar via `file://`:
```bash
cd "/Users/yuri/Desktop/ASTRONOMIA AMARGEN/star-player2"
python3 -m http.server 8000
```
Depois abra `http://localhost:8000/star_player.html`.

## Como ajudar
- Adicione novas cenas em `js/scenes/` seguindo a API existente
- Mantenha a lógica de animação nos módulos de cena e a lógica de interface/controle em `main.js`
- Preserve o padrão de fundo fixo em CSS ao mudar os visuais
- Evite adicionar um sistema de build complexo a menos que o projeto realmente precise

## Referência
- `README.md` contém a visão geral do projeto e os detalhes da arquitetura
