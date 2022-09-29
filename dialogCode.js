const modal = document.querySelector('#modal');
const openModal = document.querySelector('#open-button');
const closeModal = document.querySelector('#close-button');

openModal.onclick = function () {
  modal.style.display = "block";
}

closeModal.onclick = function () {
  modal.style.display = "none";
}