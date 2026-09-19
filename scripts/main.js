// start setting box
let icon = document.querySelector(".icon");
icon.onclick = () => {
  // document.querySelector(".fa-gear").classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
  document.querySelector(".icon").classList.toggle("close-icon");
};
let closeX = document.querySelector(".close-x");
closeX.onclick = () => {
  document.querySelector(".setting-box").classList.toggle("open");
  document.querySelector(".icon").classList.toggle("close-icon");
};