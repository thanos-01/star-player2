export default {
  key: 'starsBackground',
  name: 'Fundo de Estrelas',
  start: 0,
  end: Infinity,

  init() {
    this.stars = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.6 + 0.2,
    }));
  },

  update(dt) {
    // Fundo estático, mas poderia animar brilho
  },

  draw(ctx, w, h) {
    ctx.fillStyle = '#02020b';
    ctx.fillRect(0, 0, w, h);

    this.stars.forEach(star => {
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x * w, star.y * h, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(this.name, 20, 28);
  },
};
