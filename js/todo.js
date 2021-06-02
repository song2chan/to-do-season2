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
function writeToDo(toDoText) {
  const oneListElement = document.createElement("li");
  const toDoSpan = document.createElement("span");
  const delBtn = document.createElement("button");
  const delBtnInnerIcon = `<i class="far fa-check-square"></i>`;
  const elementId = toDoArray.length;

  delBtn.className = elementId;
  delBtn.innerHTML = delBtnInnerIcon;
  delBtn.addEventListener("click", function() {
    deleteToDo(delBtn);
  })

  toDoSpan.innerText = toDoText;
  oneListElement.appendChild(toDoSpan);
  oneListElement.appendChild(delBtn);

  const newToDoObj = {
    text: toDoText,
    id: elementId
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

    const targetIdx = targetBtn.className * 1;
    var newToDoArray = [];

    targetBtn.parentNode.style.backgroundColor =  "white";
    targetBtn.parentNode.style.opacity = "0";
  
    setTimeout(boxReSizing ,animatingTime);
    setTimeout(() => {
      targetBtn.parentNode.remove();
    }, animatingTime);

    // targetBtn의 className으로 toDoArray에서 target 객체를 찾은 뒤 삭제
    // target이 아닌 객체 중 target의 id값보다 큰 객체들은 id를 -1씩 해주는데 그 전에 해당하는 className의
    // 버튼들도 -1씩 해줌. 이러면 지운 공백이 메워지니까, 그런 뒤 해당 객체들을 새로운 배열에 저장
    // 새로운 배열은 foreach문이 끝난 후 LS에 setItem 및 toDoArray에 덮어씌워줌.
    toDoArray.forEach(function(target) {
      if (toDoArray[targetIdx] !== target) {
        if(targetIdx < target.id) {
          document.getElementsByClassName(target.id).className = target.id -1;
          target.id -= 1; 
        }
        newToDoArray.push(target);  
      } else {
        targetBtn.parentNode.remove(); 
      }   
    })

    saveToDos(newToDoArray);
    toDoArray = newToDoArray;
  }
}

function handleSubmit() {
  // prevent page reload
  event.preventDefault();

  // input value로 writeToDo 함수 실행, 그리고 input value 초기화
  const curValue = toDoInput.value;
  if(curValue !== "") {
    writeToDo(curValue);
  
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
       writeToDo(toDo.text);
     })
     boxReSizing();
   }
 }

function init() {
  toDoInputBtn.addEventListener("click", handleSubmit);

  loadToDos();
}

init();