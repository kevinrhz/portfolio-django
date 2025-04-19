const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

// Set up canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold our star objects
const stars = [];
const starCount = 150; // Adjust for density

// Initialize stars with base positions and a parallax factor.
function initStars() {
  stars.length = 0; // Clear any existing stars
  for (let i = 0; i < starCount; i++) {
    stars.push({
      // Base positions will be used as the star’s “fixed” location in space.
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      // Star radius with a gentle glow
      radius: Math.random() * 1.5 + 0.5,
      color: getRandomStarColor(),
      // Starting opacity for twinkling variation
      opacity: Math.random() * 0.8 + 0.2,
      // How fast the star’s opacity changes (twinkling speed)
      opacityChange: Math.random() * 0.005 + 0.002,
      // Random parallax factor determines how much the star moves relative to scroll.
      // Lower values simulate more distant stars.
      parallaxFactor: Math.random() * 0.2 + 0.1
    });
  }
}

// Returns one of your chosen star colors.
function getRandomStarColor() {
  const colors = ['#FFFFFF', '#FF4500', '#D32F2F']; // White, Fiery Orange, Fiery Red
  return colors[Math.floor(Math.random() * colors.length)];
}

// Draw and update each star every frame.
function drawStars() {
  // Clear the canvas for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through each star and draw it with its glow effect.
  stars.forEach(star => {
    // Update opacity for twinkle effect.
    star.opacity += star.opacityChange;
    if (star.opacity > 1 || star.opacity < 0.2) {
      star.opacityChange = -star.opacityChange;
    }

    // Get the current vertical scroll offset.
    const scrollY = window.scrollY;

    /* 
      Compute the star's final Y position. Stars appear to move opposite the scroll,
      but only by a fraction of the scroll value (their parallaxFactor). This creates
      a depth illusion.
    */
    let finalY = star.baseY - scrollY * star.parallaxFactor;
    // Use modulo to wrap stars so the canvas is always filled.
    finalY = ((finalY % canvas.height) + canvas.height) % canvas.height;
    // The X position remains unchanged (feel free to add horizontal parallax if desired)
    const finalX = star.baseX;

    // Save the context state.
    ctx.save();
    ctx.globalAlpha = star.opacity;

    // Create a radial gradient to mimic a glowing star.
    const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, star.radius);
    gradient.addColorStop(0, star.color);
    gradient.addColorStop(0.7, star.color);
    gradient.addColorStop(1, 'transparent');

    // Draw the star as a circle filled with the gradient.
    ctx.beginPath();
    ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Restore the context state.
    ctx.restore();
  });
}

// Continuously update and render the star field.
function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}

// Handle screen resizing.
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

// Initialize the stars and start the animation loop.
initStars();
animateStars();
