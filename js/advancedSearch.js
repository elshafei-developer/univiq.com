"use strict";
let btnFindUnivAverage = document.querySelector("#btnFindUnivAverage");
let btnFindUnivFilter = document.querySelector("#btnFindUnivFilter");
let tbody = document.querySelector("tbody");
let countResult = document.querySelector("#countResult");
let universityFilter = document.querySelector("#universityFilter");
let collegeFilter = document.querySelector("#collegeFilter");
let yearFilter = document.querySelector("#yearFilter");
let yearAverage = document.querySelector("#year");
let cityFilter = document.querySelector("#cityFilter");

// Object Cities Iraq
const cities = {
  baghdad: [
    "جامعة بغداد",
    "الجامعة المستنصرية",
    "الجامعة التكنولوجية",
    "الجامعة العراقية",
    "جامعة النهرين",
    "جامعة ابن سينا للعلوم الطبية والصيدلانية",
    "جامعة تكنولوجيا المعلومات الاتصالات",
    "جامعة الكرخ للعلوم",
    "الجامعة التقنية الوسطى",
  ],
  basra: [
    "جامعة البصرة",
    "جامعة البصرة للنفط والغاز",
    "الجامعة التقنية الجنوبية",
  ],
  najaf: [
    "جامعة الكوفة",
    "جامعة جابر بن حيان الطبية",
    "جامعة الفرات الاوسط التقنية ",
  ],
  salahuddin: ["جامعة تكريت", "جامعة سامراء", "الجامعة التقنية الشمالية"],
  diwaniyah: ["جامعة القادسية", "جامعة الفرات الاوسط التقنية "],
  anbar: ["جامعة الانبار", "جامعة الفلوجة", "الجامعة التقنية الوسطى"],
  babylon: [
    "جامعة بابل",
    "جامعة القاسم الخضراء",
    "جامعة الفرات الاوسط التقنية ",
  ],
  diyala: ["جامعة ديالى", "الجامعة التقنية الوسطى"],
  karbala: ["جامعة كربلاء", "جامعة الفرات الاوسط التقنية "],
  dhiqar: ["جامعة ذي قار", "جامعة سومر", "الجامعة التقنية الجنوبية"],
  kirkuk: ["جامعة كركوك", "الجامعة التقنية الشمالية"],
  wasit: ["جامعة واسط", "الجامعة التقنية الوسطى"],
  maysan: ["جامعة ميسان", "الجامعة التقنية الجنوبية"],
  muthanna: ["جامعة المثنى", "جامعة الفرات الاوسط التقنية "],
  ninawa: [
    "جامعة الموصل",
    "جامعة نينوى",
    "جامعة تلعفر",
    "جامعة الحمدانية",
    "الجامعة التقنية الشمالية",
  ],
};

// Start
let year = document.querySelector("#year").value;
addUniversity(filterYear(year)).then(addCollege);

btnFindUnivAverage.addEventListener("click", ShowResultByAverage);
btnFindUnivFilter.addEventListener("click", ShowResultByFilter);

yearFilter.addEventListener("change", changeYear);
yearAverage.addEventListener("change", changeYear);
cityFilter.addEventListener("change", changeCities);

// ONLY Functions ONLY Functions
// Fetch All Data
async function getData(link) {
  try {
    let getData = await fetch(link);
    let getJSON = await getData.json();
    return getJSON;
  } catch {
    return new Error("Not Found Data");
  }
}

function filterYear(year) {
  return getData(`./DB/DB${year}.json`);
}

async function ShowResultByAverage() {
  let year = document.querySelector("#year").value;
  let citiesSelect = document.querySelector("#cityAverage option:checked");
  filterYear(year)
    .then((cities) => {
      return filterCities(cities, citiesSelect);
    })
    .then((branch) => {
      return filterBranchAndGender(branch, "branch", "branch");
    })
    .then((gender) => {
      return filterBranchAndGender(gender, "gender", "gender");
    })
    .then((average) => {
      return filterAverage(average);
    })
    .then((final) => {
      return appendResult(final, citiesSelect);
    });
}

async function ShowResultByFilter() {
  let year = document.querySelector("#yearFilter").value;
  let citiesSelect = document.querySelector("#cityFilter option:checked");
  filterYear(year)
    .then((cities) => {
      return filterCities(cities, citiesSelect);
    })
    .then((theData) => {
      return filterUniversityAndCollege(theData, "universityFilter", 0);
    })
    .then((theData) => {
      return filterUniversityAndCollege(theData, "collegeFilter", 1);
    })
    .then((branch) => {
      return filterBranchAndGender(branch, "branchFilter", "branch");
    })
    .then((gender) => {
      return filterBranchAndGender(gender, "genderFilter", "gender");
    })
    .then((final) => {
      return appendResult(final, citiesSelect);
    });
}

function changeYear(event) {
  let year = event.target.value;
  addUniversity(filterYear(year)).then(addCollege);
}

async function changeCities(event) {
  let citiesSelect = event.target;
  let data = await filterYear(year);
  let setData = filterCities(data, citiesSelect);
  addUniversity(setData).then(addCollege);
}

async function addUniversity(data) {
  let allOption = document.querySelectorAll("#universityFilter option");
  if (allOption.length > 1) {
    universityFilter.textContent = "";
    let option = document.createElement("option");
    option.textContent = "كل الجامعات";
    option.setAttribute("value", "all");
    universityFilter.appendChild(option);
  }
  let getDataOption = await data;
  let setOptionUniv = new Set();
  getDataOption.forEach((el) => {
    setOptionUniv.add(el.university.split("/")[0]);
  });
  setOptionUniv.forEach((el) => {
    let option = document.createElement("option");
    option.textContent = el;
    universityFilter.appendChild(option);
  });
  return data;
}

function addCollege(data) {
  let allOption = document.querySelectorAll("#collegeFilter option");
  if (allOption.length >= 1) {
    collegeFilter.textContent = "";
    let option = document.createElement("option");
    option.textContent = "الكل";
    option.setAttribute("value", "all");
    collegeFilter.appendChild(option);
  }
  let setOptionUniv = new Set();
  data.forEach((el) => {
    setOptionUniv.add(el.university.split("/")[1]);
  });
  setOptionUniv.forEach((el) => {
    let option = document.createElement("option");
    option.textContent = el;
    collegeFilter.appendChild(option);
  });
}

function filterCities(univ, citiesSelect) {
  if (citiesSelect.value === "all") {
    return univ;
  } else {
    let arrUnivCities = [];
    cities[citiesSelect.value].forEach((univSelect) => {
      univ.forEach((univCities) => {
        let univSplit = univCities.university.split("/")[0];
        if (univSelect == univSplit) {
          arrUnivCities.push(univCities);
        }
      });
    });
    return arrUnivCities;
  }
}

function filterUniversityAndCollege(theData, id, index) {
  let arrResult = [];
  let universitySelect = document.querySelector(`#${id} option:checked`).value;
  if (universitySelect == "all") {
    return theData;
  } else {
    theData.forEach((el) => {
      let univSplit = el.university.split("/")[index];
      if (universitySelect.trim() == univSplit.trim()) {
        arrResult.push(el);
      }
    });
    return arrResult;
  }
}

function filterBranchAndGender(branch, id, type) {
  let branchSelect = document.querySelector(`#${id} option:checked`);
  let arrBranch = [];
  if (branchSelect.value == "all") {
    return branch;
  } else {
    branch.forEach((el) => {
      if (el[type] == branchSelect.value || el[type] == "مختلط") {
        arrBranch.push(el);
      }
    });
    return arrBranch;
  }
}
function filterAverage(average) {
  let averageSelect = document.querySelector(`#average`);
  let arrAverage = [];
  if (+averageSelect.value >= 50 && +averageSelect.value < 106) {
    average.forEach((el) => {
      if (el.average <= +averageSelect.value) {
        arrAverage.push(el);
      }
    });
    if (arrAverage.length >= 1) {
      return arrAverage;
    } else {
      alert("لا توجد نتائج لهذه الاختيارات");
      arrAverage.length = 0;
      return arrAverage;
    }
  } else if (+averageSelect.value == 0) {
    return average;
  } else if (+averageSelect.value < 50 || +averageSelect.value > 105) {
    alert("ادخل معدل صحيح");
    arrAverage.length = 0;
    return arrAverage;
  }
}
function appendResult(final, citiesSelect) {
  countResult.textContent = final.length;
  tbody.textContent = "";
  final.forEach((el) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.append(el.university.split("/")[0]);
    let br = document.createElement("br");
    td.appendChild(br);
    td.append(citiesSelect.textContent);
    let td2 = document.createElement("td");
    td2.append(el.university.split("/")[1]);
    let br2 = document.createElement("br");
    td2.appendChild(br2);
    td2.append(el.university.split("/")[2]);
    let td3 = document.createElement("td");
    td3.append(`${el.branch} ${el.gender}`);
    let br3 = document.createElement("br");
    td3.appendChild(br3);
    td3.append(el.average);

    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
}
