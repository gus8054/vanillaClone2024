// datetimezone
const yearEl = document.querySelector(".datezone__year");
const monthdayEl = document.querySelector(".datezone__monthday");
const weekdayEl = document.querySelector(".weekday__firstchar");
const timeEl = document.querySelector(".datetimezone__timezone");
const datetimeOptions = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};
function setTimeZone() {
  const datetimeString = new Intl.DateTimeFormat(
    "ko-KR",
    datetimeOptions
  ).format(Date.now());
  const datetimeSplitedArray = datetimeString.split(" ");
  yearEl.textContent = datetimeSplitedArray[0];
  monthdayEl.textContent = `${datetimeSplitedArray[1]}${datetimeSplitedArray[2]}`;
  weekdayEl.textContent = datetimeSplitedArray[3][0];
  timeEl.textContent = `${datetimeSplitedArray[4]}`;
}
setTimeZone();
setInterval(() => {
  setTimeZone();
}, 1000);

//random background images
const randomNum = Math.floor(Math.random() * 9 + 1);
const bodyEl = document.body;
bodyEl.style.backgroundImage = `url("static/background_images/background-image${randomNum}.jpg")`;

// weather
const locationNameEl = document.querySelector(".weather__location");
const weatherEl = document.querySelector(".weather__main");
const weatherContainerEl = document.querySelector(".weather");
const API_KEY = "894938f425351f737312de8a94ae4d6e";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationNameEl.textContent = data.name;
      weatherEl.textContent = `${data.weather[0].main}`;
      weatherContainerEl.classList.remove("weather_loading");
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// login
const loginFormEl = document.querySelector(".login__form");
const displayUser = document.querySelector(".login__display-user");
const todoContainer = document.querySelector(".todo__container");
loginFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  curUser = e.currentTarget.username.value;
  loginFormEl.classList.add("login_hidden");
  displayUser.classList.remove("login_hidden");
  displayUser.querySelector(".login__display-user__username").textContent =
    curUser;
  todoContainer.classList.remove("hidden");
});

// todo
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
