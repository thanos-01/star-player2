export const SceneManager = {
  scenes: [],
  activeScene: null,

  registerScenes(sceneList) {
    this.scenes = Array.isArray(sceneList) ? sceneList : [];
  },

  getActiveScene(time) {
    return this.scenes.find(scene => time >= scene.start && time < scene.end) || null;
  },

  setActiveScene(sceneKey) {
    const scene = this.scenes.find(item => item.key === sceneKey);
    if (!scene) return null;
    this.activeScene = scene;
    if (typeof scene.init === 'function') scene.init();
    return scene;
  },

  startScene(sceneKey) {
    const scene = this.setActiveScene(sceneKey);
    if (scene) {
      this.activeScene = scene;
    }
    return scene;
  },
};
