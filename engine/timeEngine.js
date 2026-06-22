export const TimeEngine = {
  state: {
    time: 0,
    speed: 1,
    playing: true,
    loop: false,
  },

  reset() {
    this.state.time = 0;
    this.state.speed = 1;
    this.state.playing = true;
    this.state.loop = false;
  },

  setSpeed(speed) {
    this.state.speed = Math.max(0, Number(speed) || 1);
  },

  play() {
    this.state.playing = true;
  },

  pause() {
    this.state.playing = false;
  },

  togglePlay() {
    this.state.playing = !this.state.playing;
  },

  update(deltaSeconds) {
    if (!this.state.playing) return;
    this.state.time += deltaSeconds * this.state.speed;
  },
};
