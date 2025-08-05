let scene, camera, renderer, particles, container;
let animationId;

function initThreeJS() {
  container = document.getElementById("three-container");
  if (!container) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const particleCount = 500;
  const particlesGeometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.025,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  });

  particles = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particles);

  camera.position.z = 5;

  animate();
}

function animate() {
  animationId = requestAnimationFrame(animate);

  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0005;

  renderer.render(scene, camera);
}

function handleResize() {
  if (container && camera && renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".navbar-mobile");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const successMessage = document.getElementById("success-message");

 
  form.style.display = "none";
  successMessage.classList.remove("hidden");

  setTimeout(() => {
    form.style.display = "block";
    successMessage.classList.add("hidden");
    form.reset();
  }, 3000);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {

      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  initThreeJS();
  window.addEventListener("resize", handleResize);
});

window.addEventListener("beforeunload", function () {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(".card-hover");
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
});
