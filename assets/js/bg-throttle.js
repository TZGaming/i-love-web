(function () {
  // Throttle background scroll to a fixed FPS to avoid high CPU/GPU on high-refresh displays
  const FPS = 60;
  const INTERVAL = 1000 / FPS;

  const mushroom = document.querySelector('.mushroom');
  const flower = document.querySelector('.flower');
  if (!mushroom && !flower) return;

  // Respect user's reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Disable any remaining CSS animations
  if (mushroom) mushroom.style.animation = 'none';
  if (flower) flower.style.animation = 'none';

  // Speeds derived from original CSS keyframes:
  // mushroom: 0 -> 2500px in 100s => 25 px/s
  // flower: x 0 -> 10000px in 600s => ~16.6667 px/s
  // flower: y 0 -> 5000px in 600s => ~8.3333 px/s
  const MUSH_Y_PER_S = 2500 / 100; // 25
  const FLOWER_X_PER_S = 10000 / 600; // ≈16.6667
  const FLOWER_Y_PER_S = 5000 / 600;  // ≈8.3333

  let mushY = 0;
  let flowerX = 0;
  let flowerY = 0;

  const MUSH_WRAP_Y = 2500;
  const FLOWER_WRAP_X = 10000;
  const FLOWER_WRAP_Y = 5000;

  let last = performance.now();

  function step(now) {
    // If page hidden, skip heavy updates
    if (document.hidden) {
      last = now;
      requestAnimationFrame(step);
      return;
    }

    const delta = now - last;
    if (delta >= INTERVAL) {
      const seconds = delta / 1000;

      if (mushroom) {
        mushY = (mushY + MUSH_Y_PER_S * seconds) % MUSH_WRAP_Y;
        mushroom.style.backgroundPosition = '0px ' + Math.round(mushY) + 'px';
      }

      if (flower) {
        flowerX = (flowerX + FLOWER_X_PER_S * seconds) % FLOWER_WRAP_X;
        flowerY = (flowerY + FLOWER_Y_PER_S * seconds) % FLOWER_WRAP_Y;
        flower.style.backgroundPosition = Math.round(flowerX) + 'px ' + Math.round(flowerY) + 'px';
      }

      // adjust last to account for leftover time and keep steady pacing
      last = now - (delta % INTERVAL);
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
})();
