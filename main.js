let dataDev = document.querySelector(".data");
let dataDevSpan = document.querySelector(".data span");
let search_input = document.querySelector(".search-input");
let input_username = document.querySelector(".input-username");
let valid_btn = document.querySelector(".validate");

let data;
let flag = false;

async function getRepos(userName) {
  try {
    let respose = await fetch(`https://api.github.com/users/${userName}/repos`);
    data = await respose.json();

    showData(data);
    flag = true;
  } catch (e) {
    flag = false;
    setMessage("UserName Not Found 🙅‍♂️");
  }
}

setMessage("Type userName And Search");

valid_btn.onclick = function (e) {
  getRepos(input_username.value);
};

function setMessage(msg) {
  dataDev.innerHTML = "";
  let span = document.createElement("span");
  span.innerHTML = msg;
  dataDev.appendChild(span);
}


function showData(data) {
  setMessage("");
  if (data.length == 0) {
    setMessage("No Repos Founded For This User");
  } else {
    data.forEach((element) => {
      createRepo(element);
    });
  }
}

search_input.onkeyup = function () {
  if (flag) {
    setMessage("");
    let filterData = searchAll(search_input.value);
    if (filterData.length == 0) {
      setMessage("No Search Results");
    } else {
      showData(searchAll(search_input.value));
    }
  }
};

function searchAll(search_value) {
  let filteredData = data.filter((element) => {
    const regex = new RegExp(search_value, "gi");
    return element.name.match(regex);
  });
  return filteredData;
}


function createRepo(data) {
  let repo = document.createElement("div");
  let p = document.createElement("p");
  let btn_stars = document.createElement("button");
  let btn_view = document.createElement("button");

  repo.className = "repo";
  btn_stars.className = "stars-btn";
  btn_view.className = "view-btn";
  p.innerHTML = data.name;
  btn_stars.innerHTML = data.stargazers_count + " Stars";
  btn_view.innerHTML = "View";
  btn_view.target = "_blank";

  btn_view.onclick = function () {
    window.open(data.html_url, "_blank").focus();
  };
  repo.appendChild(p);
  repo.appendChild(btn_stars);
  repo.appendChild(btn_view);
  dataDev.appendChild(repo);
}
