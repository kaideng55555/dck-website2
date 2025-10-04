// Neon spray cursor (purple)
const cvs = document.getElementById('spray');
const ctx = cvs.getContext('2d');
let parts = [];
function size(){ cvs.width = innerWidth; cvs.height = innerHeight; }
size(); addEventListener('resize', size);
addEventListener('mousemove', (e) => {
  for (let i = 0; i < 14; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = Math.random() * 2.2;
    parts.push({ x:e.clientX, y:e.clientY, vx:Math.cos(a)*s, vy:Math.sin(a)*s, life:1, r:2 + Math.random()*5 });
  }
});
function loop(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  for (const p of parts){
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#9a00ff';
    ctx.fillStyle = `rgba(154,0,255,${p.life*0.6})`;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    ctx.restore();
    p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.02;
  }
  parts = parts.filter(p => p.life > 0);
  requestAnimationFrame(loop);
}
loop();
