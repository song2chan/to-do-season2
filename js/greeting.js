const nameContent = document.querySelector(".name__content"),
nameInput = document.querySelector(".name__input");

const USERNAME_LS = "userName";

function saveUserName() {
  localStorage.setItem(USERNAME_LS, nameContent.innerText);
}

function updateContent() {
  nameContent.innerText = nameInput.value;
  console.log(nameInput.value);
}

function inputInit() {
  nameInput.focus();
  nameInput.addEventListener("input", updateContent);
  nameInput.addEventListener("submit", saveUserName);
}

function init() {
  inputInit();
}

init();