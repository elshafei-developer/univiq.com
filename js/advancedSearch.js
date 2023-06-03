let btnFindUniv = document.querySelector("#btnFindUniv");
let universityView = document.querySelector("#university");
let tbody = document.querySelector("tbody");
let setUniversity = new Set();
let setCollege = new Set();
let setPart = new Set();

var count = 0;

// Function Show Result
// AJAX
let DB = new XMLHttpRequest();
DB.open("GET", "./DB/DB2023.json");
DB.send();
DB.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var UnivIQ_Obj = JSON.parse(this.responseText);
    UnivIQ_Obj.forEach((el) => {
      let splitUniversity = el.university.split("/");
      setUniversity.add(splitUniversity[0]);
      setCollege.add(splitUniversity[1]);
      setPart.add(splitUniversity[2]);
    });

    // Add Option University to HTML
    universityView.textContent = "";
    for (let i = 0; i < setUniversity.size; i++) {
      let option = document.createElement("option");
      option.textContent = [...setUniversity][i];
      universityView.appendChild(option);
      count++;
    }
    // Show Result
    btnFindUniv.addEventListener("click", function () {
      let universityChecked = document.querySelector(
        "#university option:checked"
      );
      console.log(universityChecked.value);
    });
  }
};
