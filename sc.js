// script.js
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
