"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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
let btnScrollTo = document.querySelector(".btn--scroll-to");
let seciton1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // let s1coords = seciton1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("current  X/Y scroll : ", window.pageXOffset, window.pageYOffset);
  // console.log(
  //   "Client height/Width :",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  seciton1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Events : Three ways to add events

// mouseenter
let h1 = document.querySelector("h1");

let alertH1 = (e) => {
  alert("Great! You are reading the heading");
  // h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1);

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 3000);

// h1.onmouseenter = alertH1;

// In html
// <h1 onclick="alertH1()"></h1>
