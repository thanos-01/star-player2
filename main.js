import { StarScene } from './js/scenes/star.js';
import { OrbitScene } from './js/scenes/orbit.js';

// Seleciona o canvas e prepara o contexto
const canvas = document.getElementById('estrelas');
const ctx = canvas.getContext('2d');

// Dimensões (em CSS pixels) e pixel ratio para boa qualidade em telas HiDPI
let width = 0;
let height = 0;
let dpr = window.devicePixelRatio || 1;

function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  width = canvas.clientWidth;
  height = canvas.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ===== Scene registry + manual selection (cenas separadas em arquivos) ===== */
const SceneRegistry = {
  star: StarScene,
  orbit: OrbitScene,
};

let currentSceneKey = 'star';
let currentScene = SceneRegistry[currentSceneKey];
let running = true; // play/pause

function setActiveScene(key) {
  const scene = SceneRegistry[key];
  if (!scene) return;
  currentSceneKey = key;
  currentScene = scene;
  if (typeof currentScene.init === 'function') currentScene.init();
}

// não inicializa cena automaticamente — aguardamos escolha do usuário
let started = false;
// garante que o canvas fique oculto até a escolha (CSS já aplica, aqui reforçamos)
canvas.style.visibility = 'hidden';

// modal e botões do modal (aparecem ao carregar a página)
const modalEl = document.getElementById('sceneModal');
const modalSceneButtons = modalEl ? Array.from(modalEl.querySelectorAll('.scene-choice')) : [];

function startWithScene(key) {
  // ativa botão de controles correspondente
  sceneButtons.forEach(x => x.classList.remove('active'));
  const ctrlBtn = sceneButtons.find(b => b.dataset.scene === key);
  if (ctrlBtn) ctrlBtn.classList.add('active');

  setActiveScene(key);
  started = true;
  if (modalEl) modalEl.style.display = 'none';
  canvas.style.visibility = 'visible';
  // evita um dt grande no próximo frame
  last = performance.now();
}

modalSceneButtons.forEach(b => {
  b.addEventListener('click', () => {
    startWithScene(b.dataset.scene);
  });
});

/* ===== Controles (botões e teclado) ===== */
const btnPlay = document.getElementById('btnPlay');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const btnLoop = document.getElementById('btnLoop');
const btnReset = document.getElementById('btnReset');
const sceneButtons = Array.from(document.querySelectorAll('.scene-btn'));
const controlsEl = document.querySelector('.controls');
// botões de velocidade (timeScale)
const speedButtons = Array.from(document.querySelectorAll('.velocidade'));
let timeScale = 1;
const activeSpeedBtn = speedButtons.find(b => b.classList.contains('active'));
if (activeSpeedBtn) timeScale = Number(activeSpeedBtn.dataset.speed) || 1;

speedButtons.forEach(b => {
  b.addEventListener('click', () => {
    speedButtons.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const s = Number(b.dataset.speed) || 1;
    timeScale = s;
  });
});

// ícones de play/pause
iconPlay.style.display = running ? 'none' : 'block';
iconPause.style.display = running ? 'block' : 'none';

btnPlay.addEventListener('click', () => {
  running = !running;
  iconPlay.style.display = running ? 'none' : 'block';
  iconPause.style.display = running ? 'block' : 'none';
});

// btnLoop apenas alterna estado visual (não há timeline automático agora)
btnLoop.addEventListener('click', () => {
  btnLoop.classList.toggle('active');
});

// btnReset reinicia a cena atual (chama init se existir)
btnReset.addEventListener('click', () => {
  if (currentScene && typeof currentScene.init === 'function') currentScene.init();
});

sceneButtons.forEach((b) => {
  b.addEventListener('click', () => {
    sceneButtons.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const key = b.dataset.scene;
    if (!started) {
      startWithScene(key);
    } else {
      setActiveScene(key);
    }
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'b') {
    const visible = controlsEl.style.display !== 'none';
    controlsEl.style.display = visible ? 'none' : 'flex';
    return;
  }
  if (/^[1-9]$/.test(key)) {
    const idx = Number(key) - 1;
    const btn = sceneButtons[idx];
    if (btn) {
      if (!started) startWithScene(btn.dataset.scene);
      else btn.click();
    }
  }
});

/* ===== Loop principal (requestAnimationFrame) ===== */
let last = performance.now();
function frame(now) {
  if (!started) {
    requestAnimationFrame(frame);
    return;
  }
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  if (running && currentScene && typeof currentScene.update === 'function') {
    const scaledDt = dt * timeScale;
    currentScene.update(scaledDt);
  }

  if (currentScene && typeof currentScene.draw === 'function') {
    currentScene.draw(ctx, width, height, now / 1000);
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);