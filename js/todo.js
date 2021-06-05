import { lt10Moments } from './clock.js';
import { setTime } from './clock.js';

const toDoContents = document.querySelector(".to-do__contents"),
toDoInput = document.querySelector(".to-do__writer input"),
toDoInputBtn = document.querySelector(".to-do__send-btn"),
toDoListBox = document.querySelector(".to-do__list");

const TODOS_LS = "toDoData";

var toDoArray = [];
var animating = false;

function saveToDos(ary) {
  localStorage.setItem(TODOS_LS, JSON.stringify(ary));
}

// list에 들어갈 요소들을 만들어서 li로 넣어줌
function writeToDo(toDoText, parsedToDos) {
  const oneListElement = document.createElement("li");
  const toDoSpan = document.createElement("span");
  const clock = document.createElement("span");
  const delBtn = document.createElement("button");
  const delBtnInnerIcon = `<i class="far fa-check-square"></i>`;
  const elementId = toDoArray.length;

  delBtn.className = elementId;
  delBtn.innerHTML = delBtnInnerIcon;
  delBtn.addEventListener("click", function() {
    deleteToDo(delBtn);
  })
  
  if(parsedToDos == "") {
    setTime(clock);
  } else {
    parsedToDos.forEach(function(toDo) {
      if(toDo.id == elementId) {
        clock.innerText = toDo.time;
      }
    })
  }
  clock.className = "clock";
  
  toDoSpan.innerText = toDoText;
  oneListElement.appendChild(toDoSpan);
  oneListElement.appendChild(clock);
  oneListElement.appendChild(delBtn);

  const newToDoObj = {
    text: toDoText,
    id: elementId,
    time: clock.innerText
  };

  toDoArray.push(newToDoObj);
  saveToDos(toDoArray);
  
  setTimeout(() => {
    toDoContents.appendChild(oneListElement);
  }, 1500);
}

function deleteToDo(targetBtn) {
  const animatingTime = 1000;
  // animate 중에는 작동하지 않도록 함. (오류방지)
  if(animating == false) {
    animating = true;
    setTimeout(() => {
      animating = false;
    }, animatingTime);

    targetBtn.parentNode.style.backgroundColor =  "white";
    targetBtn.parentNode.style.opacity = "0";
  
    setTimeout(deleteToDoData.bind(null, targetBtn), animatingTime);
  }
}

function deleteToDoData(targetBtn) {
  const targetIdx = targetBtn.className * 1;
  var newToDoArray = [];

  toDoArray.forEach(function(target) {
    if (toDoArray[targetIdx] !== target) {
      if(targetIdx < target.id) {
        document.getElementsByClassName(target.id)[0].className = target.id -1;
        target.id -= 1; 
      }
      newToDoArray.push(target);
    } else {
      targetBtn.parentNode.remove(); 
    }   
  })

  saveToDos(newToDoArray);
  toDoArray = newToDoArray;

  boxReSizing();
}

function handleSubmit() {
  // prevent page reload
  event.preventDefault();

  // input value로 writeToDo 함수 실행, 그리고 input value 초기화
  const curValue = toDoInput.value;
  if(curValue !== "") {
    writeToDo(curValue, "");
  
    setTimeout(boxReSizing ,1000);
    toDoInput.value ="";
  }
}

function boxReSizing() {
  const baseHeight = getComputedStyle(toDoListBox).getPropertyValue("--baseHeight");

  const sizing =  parseInt(baseHeight, 10) + (toDoArray.length - 1 > 0 ? toDoArray.length - 1 : 0) * 32 + "px";

  toDoListBox.animate([
    { height: sizing }
  ], 
  {
    duration: 1000,
    easing: "ease-in-out",
    fill: "forwards"
  });
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
   if (loadedToDos !== null) {
     const parsedToDos = JSON.parse(loadedToDos);
     parsedToDos.forEach(function(toDo) {
       writeToDo(toDo.text, parsedToDos);
     })
     boxReSizing();
   }
 }

function init() {
  toDoInputBtn.addEventListener("click", handleSubmit);

  loadToDos();
}

init();