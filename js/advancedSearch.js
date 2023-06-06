"use strict";

let btnFindUniv = document.querySelector("#btnFindUniv");
let universityView = document.querySelector("#university");
let departmentView = document.querySelector("#department");
let collegeView = document.querySelector("#college");
let averageView = document.querySelector("#average");
let tbody = document.querySelector("tbody");
let setUniversity = new Set();
let setCollege = new Set();
let setDepartment = new Set();
let setAverage = new Set();

// create Option when onload page
const createOption = function (link) {
  return new Promise((resolve, reject) => {
    let DB = new XMLHttpRequest();
    DB.open("GET", link);
    DB.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        var UnivIQ_Obj = JSON.parse(this.responseText);
        resolve(UnivIQ_Obj);
      }
    };
    DB.send();
  });
};

createOption("./DB/DB2023.json")
  // create Options University and College and Department
  .then((UnivIQ_Obj) => {
    UnivIQ_Obj.forEach((el) => {
      let splitUniversity = el.university.split("/");
      setUniversity.add(splitUniversity[0]);
      setCollege.add(splitUniversity[1]);
      setDepartment.add(splitUniversity[2]);
      setAverage.add(el.average);
    });
    return UnivIQ_Obj;
  })
  // Add Options to HTML
  .then((resolve) => {
    addOption(universityView, setUniversity);
    addOption(collegeView, setCollege);
    addOption(departmentView, setDepartment);
    addOption(averageView, setAverage);
    return resolve;
  })

  // Show Result
  .then((UnivIQ_Obj) => {
    btnFindUniv.addEventListener("click", function () {
      let universityChecked = document.querySelector(
        "#university option:checked"
      );
      tbody.textContent = "";
      UnivIQ_Obj.forEach((el) => {
        let splitUniversity = el.university.split("/");
        if (splitUniversity[0] == universityChecked.value) {
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          td1.textContent = splitUniversity[0];
          let br1 = document.createElement("br");
          td1.appendChild(br1);
          td1.append("المحافظة");
          tr.appendChild(td1);
          tbody.appendChild(tr);

          // let tr = document.createElement("tr");
          let td2 = document.createElement("td");
          td2.textContent = splitUniversity[1];
          let br2 = document.createElement("br");
          td2.appendChild(br2);
          td2.append(el.average);
          tr.appendChild(td2);
          tbody.appendChild(tr);

          let td3 = document.createElement("td");
          td3.textContent = el.branch;
          let br3 = document.createElement("br");
          td3.appendChild(br3);
          td3.append(el.gender);
          tr.appendChild(td3);
          tbody.appendChild(tr);
        }
      });
    });
  });

//START FUNCTIONS ONLY
// -------------------
// -------------------

// Function add Option
const addOption = function (selectView, setOption) {
  for (let i = 0; i < setOption.size; i++) {
    let option = document.createElement("option");
    option.textContent = [...setOption][i];
    selectView.appendChild(option);
  }
};
// Split University and College and Department
// const split = function (
//   UnivIQ_Obj,
//   setUniversity,
//   setCollege,
//   setDepartment,
//   setAverage
// ) {
//   UnivIQ_Obj.forEach((el) => {
//     let splitUniversity = el.university.split("/");
//     setUniversity.add(splitUniversity[0]);
//     setCollege.add(splitUniversity[1]);
//     setDepartment.add(splitUniversity[2]);
//     setAverage.add(el.average);
//   });
// };

// -------------------
// -------------------
//END FUNCTIONS ONLY

// const citiesIraq = [
//   "Baghdad",
//   "Basra",
//   "Mosul",
//   "Erbil",
//   "Sulaymaniyah",
//   "DhiQar",
//   "Karbala",
//   "Najaf",
//   "Anbar",
//   "Diwaniyah",
//   "Wasit",
//   "Maysan",
//   "Ninawa",
//   "Salahuddin",
//   "Kirkuk",
//   "Diyala",
//   "Qadisiyah",
//   "Samawah",
// ];
