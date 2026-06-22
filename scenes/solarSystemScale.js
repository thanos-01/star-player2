export default {
  key: 'solarSystemScale',
  name: 'Escala do Sistema Solar',
  start: 30,
  end: 70,

  init() {
    this.planets = [
      { name: 'Mercúrio', radius: 5, orbit: 70, speed: 1.8, angle: 0 },
      { name: 'Vênus', radius: 8, orbit: 110, speed: 1.2, angle: Math.PI * 0.5 },
      { name: 'Terra', radius: 10, orbit: 160, speed: 0.9, angle: Math.PI },
      { name: 'Marte', radius: 8, orbit: 210, speed: 0.6, angle: Math.PI * 1.5 },
    ];
  },

  update(dt) {
    this.planets.forEach((planet) => {
      planet.angle += planet.speed * dt;
    });
  },

  draw(ctx, w, h, time) {
    ctx.fillStyle = '#02030a';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    this.planets.forEach((planet) => {
      ctx.beginPath();
      ctx.arc(cx, cy, planet.orbit, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.fillStyle = '#ffd95a';
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();

    this.planets.forEach((planet) => {
      const x = cx + Math.cos(planet.angle) * planet.orbit;
      const y = cy + Math.sin(planet.angle) * planet.orbit;
      ctx.fillStyle = '#9ad1ff';
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#e6eef8';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(this.name, 20, 28);
    ctx.fillText(`t = ${time.toFixed(1)} s`, 20, 48);
  },
};
