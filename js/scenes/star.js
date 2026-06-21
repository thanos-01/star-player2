export const StarScene = {
  name: 'Campo de estrelas',
  init() {
    // nada a preparar — fundo fixo no CSS
  },
  update(dt) {
    // sem atualizações necessárias
  },
  draw(ctx, w, h, time) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e6eef8';
    ctx.font = '18px system-ui, sans-serif';
    ctx.fillText(this.name, 20, 28);
  }
};
