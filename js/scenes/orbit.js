export const OrbitScene = {
  name: 'Órbita do sistema',
  init() {
    this.planets = [
      { name: 'Mercúrio', color: '#f8d779', size: 4, orbitRadius: 70, speed: 1.8, angle: Math.random()*Math.PI*2 },
      { name: 'Vênus', color: '#f4b18c', size: 5, orbitRadius: 110, speed: 1.2, angle: Math.random()*Math.PI*2 },
      { name: 'Terra', color: '#6ec1ff', size: 6, orbitRadius: 160, speed: 0.9, angle: Math.random()*Math.PI*2 },
    ];
  },
  update(dt) {
    this.planets.forEach(p => { p.angle += p.speed * dt; });
  },
  draw(ctx, w, h, time) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#04060a';
    ctx.fillRect(0, 0, w, h);
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h / 2);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.fillStyle = '#ffd95a';
    ctx.arc(0, 0, 12, 0, Math.PI*2);
    ctx.fill();
    this.planets.forEach(p => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.arc(0, 0, p.orbitRadius, 0, Math.PI*2);
      ctx.stroke();
      const x = Math.cos(p.angle) * p.orbitRadius;
      const y = Math.sin(p.angle) * p.orbitRadius;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(x, y, p.size, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
    ctx.fillStyle = '#e6eef8';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(this.name, 20, 28);
  }
};
