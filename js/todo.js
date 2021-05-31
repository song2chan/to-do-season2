const toDoContents = document.querySelector(".to-do__contents"),
toDoInput = document.querySelector(".to-do__writer input"),
toDoInputBtn = document.querySelector(".to-do__send-btn"),
toDoListBox = document.querySelector(".to-do__list");

var toDoArray = [];
var animating = false;

function writeToDo(toDoText) {
  const oneListElement = document.createElement("li");
  const toDoSpan = document.createElement("span");
  const delBtn = document.createElement("button");
  const delBtnInnerIcon = `<i class="far fa-check-square"></i>`;
  
  delBtn.innerHTML = delBtnInnerIcon;
  delBtn.addEventListener("click", function() {
    deleteToDo(delBtn);
  })

  toDoSpan.innerText = toDoText;
  oneListElement.appendChild(toDoSpan);
  oneListElement.appendChild(delBtn);
  
  toDoContents.appendChild(oneListElement);

  const newToDoObj = {
    text: toDoText
  };

  toDoArray.push(newToDoObj);
}

function deleteToDo(targetBtn) {
  if(animating == false) {
    animating = true;
    setTimeout(() => {
      animating = false;
    }, 1000);

    toDoArray.pop();

    deleteToDoAnim(targetBtn.parentNode);
  
    setTimeout(boxReSizing ,1000);
    setTimeout(() => {
      targetBtn.parentNode.remove();
    }, 1000);
  }
}

function handleSubmit() {
  // prevent page reload
  event.preventDefault();

  // input value로 writeToDo 함수 실행, 그리고 input value 초기화
  const curValue = toDoInput.value;
  if(curValue !== "") {
    setTimeout(writeToDo(curValue) ,3000);
    setTimeout(boxReSizing ,1000);
    toDoInput.value ="";
  }
}

function boxReSizing() {
  const sizing =  + (toDoArray.length - 1 > 0 ? toDoArray.length - 1 : 0) * 32 +"px";

  toDoListBox.animate([
    { height: sizing }
  ], 
  {
    duration: 1000,
    easing: "ease-in-out",
    fill: "forwards"
  });
}

function deleteToDoAnim(target) {
  target.style.backgroundColor =  "white";
  target.style.opacity = "0";
}

function init() {
  toDoInputBtn.addEventListener("click", handleSubmit);
  console.log(listBoxHeight);
}

init();