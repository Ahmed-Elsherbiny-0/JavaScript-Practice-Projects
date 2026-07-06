"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navs = document.querySelector(".nav__links");

btnScrollTo.onclick = () => {
  const cords = section1.getBoundingClientRect();
  // console.log(cords);
  // window.scrollTo(window.pageXOffset + cords.left,window.pageYOffset + cords.top);
  section1.scrollIntoView({ behavior: "smooth" });
};

navs.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// --- my code
// const operation=document.querySelector('.operations');

// operation.addEventListener('click',(e)=>{
//   if(e.target.classList.contains('btn'))
//   {
//     // console.log(operation.firstElementChild)
//     [...e.target.parentElement.children].forEach(e=>{
//       if (e.classList.contains('operations__tab--active')){
//         let id =e.getAttribute('data-tab');
//         document.querySelector(`.operations__content--${id}`).classList.remove('operations__content--active');
//         e.classList.remove('operations__tab--active')
//       }

//   });
//     const id =e.target.getAttribute('data-tab');
//     e.target.classList.add('operations__tab--active');
//      document.querySelector(`.operations__content--${id}`).classList.add('operations__content--active');
//   }
// })

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const header = document.querySelector(".header");

const obsCallback = function (entries, observer) {
  console.log(entries);
  entries.forEach((e) => {
    if (!e.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0.0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.target.classList.contains("section--hidden")) {
    entry.target.classList.remove("section--hidden");
  }
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((e) => {
  e.classList.add("section--hidden");
  sectionObserver.observe(e);
});

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () =>
    entry.target.classList.remove("lazy-img"),
  );

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.0,
  rootMargin: "100px",
});

const imgTargets = document.querySelectorAll("img[data-src]");

imgTargets.forEach((e) => imgObserver.observe(e));

//slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML(
    "beforeend",
    `<button class='dots__dot' data-slide='${i}'></button>`,
  );
});

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((e) => e.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const nextSlide = function () {
  curSlide = (curSlide + 1) % slides.length;
  goToSlide(curSlide);
  activateDot(curSlide);
};
const prevSlide = function () {
  curSlide = (curSlide - 1 + slides.length) % slides.length;
  goToSlide(curSlide);
  activateDot(curSlide);
};
const goToSlide = function (slide) {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

let curSlide = 0;
goToSlide(0);
activateDot(0);

btnRight.addEventListener("click", nextSlide);
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") nextSlide();
});
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dots__dot")) return;
  const slideNumber = Number(e.target.dataset.slide);
  curSlide = slideNumber;
  activateDot(curSlide);
  goToSlide(curSlide);
});
