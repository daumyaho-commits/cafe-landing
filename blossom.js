(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  canvas.className = "blossom-canvas";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  var COUNT = w < 600 ? 25 : 50;
  var petals = [];

  function makePetal(initial) {
    return {
      x: Math.random() * w,
      y: initial ? Math.random() * h : -20,
      size: 6 + Math.random() * 8,
      speed: 0.6 + Math.random() * 1.0,
      drift: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      alpha: 0.55 + Math.random() * 0.4
    };
  }

  for (var i = 0; i < COUNT; i++) petals.push(makePetal(true));

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.alpha;
    var s = p.size;
    var g = ctx.createLinearGradient(0, -s, 0, s);
    g.addColorStop(0, "#ffe3ec");
    g.addColorStop(1, "#f9a8c0");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s, -s * 0.6, s * 0.8, s * 0.7, 0, s);
    ctx.bezierCurveTo(-s * 0.8, s * 0.7, -s, -s * 0.6, 0, -s);
    ctx.fill();
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.phase += 0.02;
      p.y += p.speed;
      p.x += Math.sin(p.phase) * p.drift;
      p.angle += p.spin;
      if (p.y > h + 20 || p.x < -30 || p.x > w + 30) petals[i] = makePetal(false);
      else drawPetal(p);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
