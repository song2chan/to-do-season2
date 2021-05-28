const toDoContents = document.querySelector(".to-do__contents"),
toDoInput = document.querySelector(".to-do__writer input"),
toDoInputBtn = document.querySelector(".to-do__send-btn"),
toDoListBox = document.querySelector(".to-do__list");

var toDoArray = [];

function writeToDo(toDoText) {
  const oneListElement = document.createElement("li");
  const toDoSpan = document.createElement("span");
  const delBtn = document.createElement("button");
  const delBtnInnerIcon = `<i class="far fa-check-square"></i>`;
  
  delBtn.innerHTML = delBtnInnerIcon;
  // delBtn.addEventListener("click", function() {
  //   completeToDo(delBtn);
  // })
  delBtn.addEventListener("click", boxReSizing);
  toDoSpan.innerText = toDoText;
  oneListElement.appendChild(toDoSpan);
  oneListElement.appendChild(delBtn);
  
  toDoContents.appendChild(oneListElement);

  const newToDoObj = {
    text: toDoText
  };

  toDoArray.push(newToDoObj);
}

// function completeToDo(targetBtn) {

// }

function handleSubmit(event) {
  // prevent page reload
  event.preventDefault();

  // input value로 writeToDo 함수 실행, 그리고 input value 초기화
  const curValue = toDoInput.value;
  if(curValue !== "") {
    writeToDo(curValue);
    toDoInput.value ="";
  }

  boxReSizing(toDoArray);
}

function boxReSizing() {
  toDoListBox.style.height = toDoArray.length * 100 +"px";
  console.log(toDoListBox.height());
}

function init() {
  toDoInputBtn.addEventListener("click", handleSubmit);
}

init();