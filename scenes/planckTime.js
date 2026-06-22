export default {
  key: 'planckTime',
  name: 'Escala do Tempo de Planck',
  start: 0,
  end: 30,

  init() {
    this.text = 'Tempo de Planck: 5.39 × 10⁻⁴⁴ s';
    this.progress = 0;
  },

  update(dt, time) {
    this.progress = Math.min(1, time / (this.end - this.start));
  },

  draw(ctx, w, h, time) {
    ctx.fillStyle = '#02030a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.18;

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#7fb5ff';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * this.progress, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '24px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.name, cx, cy - 24);
    ctx.font = '16px system-ui, sans-serif';
    ctx.fillText(this.text, cx, cy + 10);

    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`Tempo da animação: ${time.toFixed(2)} s`, cx, h - 24);
  },
};
