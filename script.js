// Шаг 1 — разбиваем текст на буквы
const el = document.querySelector('.repel-text');
const text = el.textContent;
el.innerHTML = '';

text.split('\n').forEach((line) => {
  const li = document.createElement('h1');
  el.appendChild(li);
  line.split('').forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    li.appendChild(span);
  });
});
// Шаг 2 — следим за мышью
const mouse = { x: -999, y: -999 };

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Шаг 3 — отталкиваем буквы
const RADIUS = 80; // радиус действия в пикселях
const STRENGTH = 50; // сила отталкивания

function update() {
  document.querySelectorAll('.char').forEach((char) => {
    const rect = char.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - mouse.x;
    const dy = cy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      // курсор близко — отталкиваем
      const force = (RADIUS - dist) / RADIUS;
      const angle = Math.atan2(dy, dx);
      const tx = Math.cos(angle) * force * STRENGTH;
      const ty = Math.sin(angle) * force * STRENGTH;
      char.style.transform = `translate(${tx}px, ${ty}px)`;
    } else {
      // курсор далеко — возвращаем на место
      char.style.transform = 'translate(0, 0)';
    }
  });

  requestAnimationFrame(update);
}

update();
