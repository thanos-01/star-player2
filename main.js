import { TimeEngine } from './engine/timeEngine.js';
import { SceneManager } from './engine/sceneManager.js';
import { Renderer } from './engine/renderer.js';
import { Controls } from './ui/controls.js';
import { timelineScenes, backgroundScene } from './scenes/index.js';

const canvas = document.getElementById('animationCanvas');
const initialSceneKey = 'planckTime';

Renderer.attach(canvas);
SceneManager.registerScenes(timelineScenes);
backgroundScene.init?.();

const controls = Controls.attach({
  timeEngine: TimeEngine,
  sceneManager: SceneManager,
  initialSceneKey,
});

let last = performance.now();

function updateActiveScene(time) {
  const activeScene = SceneManager.getActiveScene(time);
  if (activeScene && activeScene !== SceneManager.activeScene) {
    SceneManager.activeScene = activeScene;
    activeScene.init?.();
  }
  return activeScene || SceneManager.activeScene;
}

function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;

  TimeEngine.update(dt);

  const activeScene = updateActiveScene(TimeEngine.state.time);

  if (!activeScene && TimeEngine.state.loop) {
    const firstScene = timelineScenes[0];
    if (firstScene) {
      TimeEngine.state.time = firstScene.start;
      SceneManager.activeScene = firstScene;
      firstScene.init?.();
    }
  }

  backgroundScene.update?.(dt, TimeEngine.state.time);
  activeScene?.update?.(dt, TimeEngine.state.time);

  Renderer.render(backgroundScene, activeScene, TimeEngine.state.time);
  controls.update();

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
