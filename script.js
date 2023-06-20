function videoLoaded() {
  // Hide the placeholder image
  document.querySelector(".video-placeholder").style.display = "none";

  // Bring the video to the front
  document.querySelector(".hero-background-video").style.zIndex = "-1";
}

document.addEventListener("DOMContentLoaded", function () {
  var video = document.querySelector(".hero-background-video");

  // Check if video is already loaded
  if (video.readyState >= 3) {
    // HAVE_FUTURE_DATA (3) or HAVE_ENOUGH_DATA (4)
    videoLoaded();
  }
});

document
  .getElementById("closeModalButton")
  .addEventListener("click", closeModal);

document
  .getElementById("imageModal")
  .addEventListener("click", function (event) {
    if (event.target.id === "imageModal") {
      closeModal();
    }
  });

function openModalWithImage(imageSrc) {
  var modal = document.getElementById("imageModal");
  document.getElementById("modalImage").src = imageSrc;
  modal.classList.remove("hidden");
  setTimeout(function () {
    modal.classList.remove("opacity-0");
  }, 10);
}

function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.classList.add("opacity-0");
  setTimeout(function () {
    modal.classList.add("hidden");
  }, 300);
}
const mobileMenu = document.getElementById("mobile-menu");

const menuIcon = document.getElementById("menu-icon");
// const mobileMenuButton = document.getElementById("mobile-menu-button");
const header = document.querySelector(".header");

const navIcon = document.getElementById("nav-icon3");

header.addEventListener("click", function (event) {
  if (navIcon.classList.contains("open")) {
    navIcon.classList.toggle("open");
    mobileMenu.classList.remove("open");
  }
});

const slider = document.querySelector(".slider");
const container = document.querySelector(".before-after-container");

let dragging = false;
let sliderWidth = 0;

let isAnimationStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isAnimationStarted) {
      isAnimationStarted = true;
      // Animate the slider to 50%
      let sliderWidth = 0;
      const animationInterval = setInterval(() => {
        sliderWidth += 0.5;
        if (sliderWidth >= 70) {
          // stop at 50%
          clearInterval(animationInterval);
        } else {
          slider.style.width = `${sliderWidth}%`;
        }
      }, 20);
    }
  });
});

observer.observe(container);

// Mouse events for dragging
container.addEventListener("mousedown", (e) => {
  e.preventDefault();
  dragging = true;
});

window.addEventListener("mouseup", () => {
  dragging = false;
});

container.addEventListener("mousemove", (e) => {
  if (dragging) {
    let xPos = e.pageX - container.offsetLeft;
    let size = container.offsetWidth;
    let newWidth = (xPos / size) * 100;
    if (newWidth >= 0 && newWidth <= 100) {
      // set limits
      slider.style.width = `${newWidth}%`;
    }
  }
});

const scrubber = document.querySelector(".scrubber");

scrubber.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    dragging = true;
  },
  { passive: false }
);

// window.addEventListener("touchend", () => {
//   dragging = false;
// });

scrubber.addEventListener(
  "touchmove",
  (e) => {
    if (dragging) {
      let xPos = e.touches[0].clientX - container.offsetLeft;
      let size = container.offsetWidth;
      let newWidth = (xPos / size) * 100;
      if (newWidth >= 0 && newWidth <= 100) {
        slider.style.width = `${newWidth}%`;
      }
    }
  },
  { passive: false }
);

function toggleMenu() {
  navIcon.classList.toggle("open");

  if (navIcon.classList.contains("open")) {
    mobileMenu.classList.add("open");
  } else {
    mobileMenu.classList.remove("open");
  }
}
