"use strict";

let btnScrollTo = document.querySelector(".btn--scroll-to");
let section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
let tabs = document.querySelectorAll(".operations__tab");
let tabsContainer = document.querySelector(".operations__tab-container");
let tabsContent = document.querySelectorAll(".operations__content");
let nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth scrolling
btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

// / Impliment the Navigation bar
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching Strategy
  if (e.target.classList.contains("nav__link")) {

    let id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
})

// Tabbed Component
tabsContainer.addEventListener("click", function (e) {
  let clicked = e.target.closest(".operations__tab");

  // Guard Clause
  if (!clicked) return;

  // Remove classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Active Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu Fade Animation
let handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    let link = e.target;
    let siblings = link.closest(".nav").querySelectorAll(".nav__link");
    let logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
//Passing Argument into Event Handlers
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//  Sticky Navigation
let navHeight = nav.getBoundingClientRect().height; // to get nav height dynamicaly
let header = document.querySelector(".header");
let stickyNav = function (entries) {
  let [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
let headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revel Sections
let allSections = document.querySelectorAll(".section");
let revelSection = function (entries, observer) {
  let [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
let sectionObeserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObeserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading Images
let imgTargets = document.querySelectorAll("img[data-src]");
let loadImg = function (entries, observe) {
  let [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};
let imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Building a slider component
let sliders = function () {
  let slides = document.querySelectorAll(".slide");
  let slider = document.querySelector(".slider");
  let btnLeft = document.querySelector(".slider__btn--left");
  let btnRight = document.querySelector(".slider__btn--right");
  let dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  let maxSlide = slides.length;

  // functions
  let createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  let activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  let goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  // Next Slide
  let nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous Slider
  let prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // init
  let init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Arrow keys for reviews
  document.addEventListener("keydown", function (e) {
    // console.log(e);
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      let { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliders();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let activetab = document.querySelector(".operations__content--active");
document.querySelectorAll(".operations__tab").forEach((el) => {
  el.addEventListener("mouseover", function (e) {
    activetab.style.transition = "all 1s ease-in-out";
    activetab.style.boxShadow = "20px 20px 44px -22px rgb(80 79 79)";
  });
  el.addEventListener("mouseout", function (e) {
    activetab.style.transition = "";
    activetab.style.boxShadow = " none";
  });
});

//////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector(".close-btn");

  menuBtn.addEventListener("click", function () {
    sidebar.style.right = "0";
  });

  closeBtn.addEventListener("click", function () {
    sidebar.style.right = "-250px";
  });
});
