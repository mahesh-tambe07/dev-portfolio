window.addEventListener('DOMContentLoaded', () => {
  const nightSky = document.getElementById('nightSky');
  const canvas = document.getElementById('connectionCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];


  //// Resize canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    // Recalculate star positions on resize
    stars = Array.from(document.querySelectorAll('.star')).map(star => ({
      x: parseFloat(star.style.left) / 100 * window.innerWidth,
      y: parseFloat(star.style.top) / 100 * window.innerHeight
    }));
  });

  resizeCanvas();

  //

  // Create stars
  for (let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    nightSky.appendChild(star);

    stars.push({
      x: parseFloat(star.style.left) / 100 * window.innerWidth,
      y: parseFloat(star.style.top) / 100 * window.innerHeight
    });
  }

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  
  window.onscroll = () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  };
  


  // Mouse move: draw connection lines to nearby stars
  document.addEventListener('mousemove', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
      const dx = star.x - e.clientX;
      const dy = star.y - e.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = 'rgba(43, 192, 212, 0.98)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  });
});

