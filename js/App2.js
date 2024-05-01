// fetch('https://dictionaryapi.com/api/v3/references/learners/json/apple?key=3006fcd1-03bb-4321-852f-67bc8b236160')
// .then(response => response.json()).then(data => console.log(data));
// let storage = localStorage.getItem('apple')
// console.log('apple',storage);
let historyBtn = document.querySelector("#historyBtn");
let searchBtn = document.querySelector("#searchBtn");
let input = document.querySelector("#inp-Word");
let showFindorNot = document.querySelector("#Find-or-not");
let definationBox = document.querySelector("#wordDef");
let not__found = document.querySelector(".not__found");
let suggestion_box = document.querySelector(".suggestion-box");
let show = document.querySelector(".show");
let history_Section = document.querySelector(".history");
let result = document.querySelector(".result");
// let dltElement = document.querySelector(".imgWrapper")
// console.log(dltElement);

historyBtn.addEventListener("click", function (e) {
  console.log("history btn is working");
  e.preventDefault();

  //   document.querySelector('.hist-text').style.display = 'block'
  if (historyBtn.innerText == "HISTORY") {
    historyBtn.innerText = "SEARCH";
    document.querySelector(".searchbar").style.display = "none";
    document.querySelector(".suggestion-box").style.display = "none";
    document.querySelector(".result").style.display = "none";

    history_Section.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "count") {
        continue;
      }
      let div = document.createElement("div");
      div.setAttribute("class", "newdiv");
      div.innerHTML = `<span>Word: <span class="getdata">${localStorage.key(
        i
      )}</span></span>
    <br><br>
    <p>${localStorage.getItem(localStorage.key(i))}</p>
    <br><br>
    <img class="delete" onclick="deletediv(this)" id = "dlt" width="40px" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png">`;
      // <i class="fa-sharp fa-solid fa-trash"></i>
      // <div class="imgWrapper item"><i class="fa-sharp fa-solid fa-trash fa-xl"></i><img class="delete" onclick="deletediv() id = "dlt" width="40px" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"></div>
      history_Section.appendChild(div);
      history_Section.style.display = "flex";
      div.style.flexWrap = "wrap";
      div.style.border = "2px solid black";
      div.style.borderRadius = "20px";
      div.style.padding = "20px";
      div.style.marginInline = "20px";
    }
  } else if (historyBtn.innerText == "SEARCH") {
    history_Section.style.display = "none";
    document.querySelector(".searchbar").style.display = "block";
    document.querySelector(".suggestion-box").style.display = "block";
    document.querySelector(".result").style.display = "block";
    historyBtn.innerText = "HISTORY";
  }
});

// Delete history element

function deletediv(currentElement) {
  let key = currentElement.parentElement.querySelector(".getdata").innerText;
  currentElement.parentElement.remove();
  console.log(key);
  localStorage.removeItem(key);
  if (localStorage.length == 0) {
    document.querySelector(".history").innerHTML =
      "<div class='empty'><img src='https://cdn-icons-png.flaticon.com/512/1380/1380641.png' alt='image'><span>Your searching history is empty</span></div>";
  }
}

// Searching word

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let word = input.value;
  console.log(word);
  if (word === "") {
    alert("Word is requirerd");
    return;
  }
  getData(word);
});

//Get data
async function getData(word) {
  const response = await fetch(
    `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=3006fcd1-03bb-4321-852f-67bc8b236160`
  );

  const data = await response.json();
  console.log(data);
  // if not found
  if (!data.length) {
    show.innerText = " No result found";
    return;
  }
  // if gives ssuggetion
  if (typeof data[0] === "string") {
    result.style.display = "none";
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean";
    not__found.appendChild(heading);
    data.forEach((element) => {
      let suggetion = document.createElement("span");
      suggetion.classList.add("suggested");
      suggetion.innerText = element;
      suggestion_box.appendChild(suggetion);
    });
    return;
  }
  // found
  suggestion_box.style.display = "none";
  result.style.display = "block";
  show.innerText = word;
  let defination = data[0].shortdef[0];
  localStorage.setItem(`${word}`, data[0].shortdef[0]);
  definationBox.innerText = defination;
}
