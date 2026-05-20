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

  // Speeds derived from original CSS keyframes:
  // mushroom: 25 px/s
  // flower: x ≈16.6667 px/s, y ≈8.3333 px/s
  const MUSH_Y_PER_S = 2500 / 100; // 25
  const FLOWER_X_PER_S = 10000 / 600; // ≈16.6667
  const FLOWER_Y_PER_S = 5000 / 600;  // ≈8.3333

  let mushY = 0;
  let flowerX = 0;
  let flowerY = 0;

  // SEAMLESS WRAPPING: Dit moet exact gelijk zijn aan (of een veelvoud van) je background-size!
  const MUSH_WRAP_Y = 200;   // Matcht met background-size: 200px 200px;
  const FLOWER_WRAP_X = 150; // Matcht met background-size: 150px 150px;
  const FLOWER_WRAP_Y = 150; // Matcht met background-size: 150px 150px;

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
        // Gebruik de modulo (%) operator met de grootte van de afbeelding (200)
        mushY = (mushY + MUSH_Y_PER_S * seconds) % MUSH_WRAP_Y;
        mushroom.style.backgroundPosition = '0px ' + Math.round(mushY) + 'px';
      }

      if (flower) {
        // Gebruik de modulo (%) operator met de grootte van de afbeelding (150)
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