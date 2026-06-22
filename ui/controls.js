export const Controls = {
  elements: {},
  attach({ timeEngine, sceneManager, initialSceneKey }) {
    const btnPlay = document.getElementById('btnPlay');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');
    const btnLoop = document.getElementById('btnLoop');
    const btnReset = document.getElementById('btnReset');
    const speedButtons = Array.from(document.querySelectorAll('.velocidade'));
    const sceneButtons = Array.from(document.querySelectorAll('.scene-btn'));
    const timeLabel = document.getElementById('timeLabel');
    const sceneLabel = document.getElementById('sceneLabel');

    const updatePlayState = () => {
      iconPlay.style.display = timeEngine.state.playing ? 'none' : 'block';
      iconPause.style.display = timeEngine.state.playing ? 'block' : 'none';
      btnPlay.setAttribute('aria-pressed', String(timeEngine.state.playing));
    };

    const setActiveSceneButton = (sceneKey) => {
      sceneButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.scene === sceneKey);
      });
    };

    const updateLabels = () => {
      if (timeLabel) {
        timeLabel.textContent = `t = ${timeEngine.state.time.toFixed(2)} s`;
      }
      if (sceneLabel) {
        sceneLabel.textContent = sceneManager.activeScene?.name || 'Nenhuma cena ativa';
      }
    };

    const setSpeed = (speed) => {
      timeEngine.setSpeed(speed);
      speedButtons.forEach((button) => {
        button.classList.toggle(button.dataset.speed === String(speed), button.dataset.speed !== undefined);
      });
    };

    const setScene = (sceneKey) => {
      const scene = sceneManager.scenes.find((item) => item.key === sceneKey);
      if (!scene) return;
      timeEngine.state.time = scene.start;
      sceneManager.startScene(sceneKey);
      setActiveSceneButton(sceneKey);
      updateLabels();
    };

    btnPlay?.addEventListener('click', () => {
      timeEngine.togglePlay();
      updatePlayState();
    });

    btnLoop?.addEventListener('click', () => {
      timeEngine.state.loop = !timeEngine.state.loop;
      btnLoop?.classList.toggle('active', timeEngine.state.loop);
    });

    btnReset?.addEventListener('click', () => {
      timeEngine.reset();
      sceneManager.startScene(initialSceneKey);
      updatePlayState();
      updateLabels();
    });

    speedButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const speed = Number(button.dataset.speed) || 1;
        setSpeed(speed);
      });
    });

    sceneButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const sceneKey = button.dataset.scene;
        setScene(sceneKey);
      });
    });

    if (initialSceneKey) {
      setScene(initialSceneKey);
    }

    updatePlayState();
    updateLabels();

    this.elements = {
      btnPlay,
      iconPlay,
      iconPause,
      btnLoop,
      btnReset,
      speedButtons,
      sceneButtons,
      timeLabel,
      sceneLabel,
    };

    return {
      update: updateLabels,
    };
  },
};
