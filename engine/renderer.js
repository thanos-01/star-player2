export const Renderer = {
  canvas: null,
  ctx: null,
  width: 0,
  height: 0,
  dpr: 1,

  attach(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },

  resize() {
    if (!this.canvas) return;
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(this.canvas.clientWidth * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(this.canvas.clientHeight * this.dpr));
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
  },

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  render(backgroundScene, activeScene, time) {
    if (!this.ctx) return;
    this.clear();
    if (backgroundScene && typeof backgroundScene.draw === 'function') {
      backgroundScene.draw(this.ctx, this.width, this.height, time);
    }
    if (activeScene && typeof activeScene.draw === 'function') {
      activeScene.draw(this.ctx, this.width, this.height, time);
    }
  },
};
