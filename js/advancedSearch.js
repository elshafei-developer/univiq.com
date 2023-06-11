"use strict";
// Cities Iraq
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
  dhiQar: ["جامعة ذي قار", "جامعة سومر", "الجامعة التقنية الجنوبية"],
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
// ******************************** \\
// Start
async function getData(link) {
  try {
    let getData = await fetch(link);
    let getJSON = await getData.json();
    return getJSON;
  } catch {
    return "Not Found Data";
  }
}
let btnFindUnivAverage = document.querySelector("#btnFindUnivAverage");
let tbody = document.querySelector("tbody");
let countResult = document.querySelector("#countResult");

btnFindUnivAverage.addEventListener("click", ShowResultByAverage);

async function ShowResultByAverage() {
  let year = document.querySelector("#year").value;
  let citiesSelect = document.querySelector("#cityAverage option:checked");
  await getData(`./DB/DB${year}.json`)
    .then((univ) => {
      return filterCities(univ, citiesSelect);
    })
    .then((branch) => {
      return filterBranch(branch, "branch");
    })
    .then((gender) => {
      return filterBranch(gender, "gender");
    })
    .then((average) => {
      let averageSelect = document.querySelector(`#average`);
      let arrAverage = [];
      console.log(typeof averageSelect.value);
      if (+averageSelect.value > 50 && +averageSelect.value < 106) {
        average.forEach((el) => {
          if (el.average <= +averageSelect.value) {
            arrAverage.push(el);
          }
        });
        return arrAverage;
      } else if (+averageSelect.value == 0) {
        console.log(+averageSelect.value);
        return average;
      } else if (+averageSelect.value < 50 || +averageSelect.value > 105) {
        alert("ادخل معدل صحيح");
        // return average;
      }
    })
    .then((final) => {
      return appendResult(final, citiesSelect);
    });
}

// Function ONLY
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
function filterBranch(branch, theSelect) {
  let branchSelect = document.querySelector(`#${theSelect} option:checked`);
  let arrBranch = [];
  if (branchSelect.value == "all") {
    return branch;
  } else {
    branch.forEach((el) => {
      if (el[theSelect] == branchSelect.value || el[theSelect] == "مختلط") {
        arrBranch.push(el);
      }
    });
    return arrBranch;
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
// filterCities();
// -------------- TEST -----------------  \\
// let univ = new Set();
// async function getAPI() {
//   let getFetch = await fetch("./DB/DB2023.json");
//   return await getFetch.json();
// }
// getAPI()
//   .then((resolve) => {
//     resolve.forEach((el) => {
//       let univSplit = el.university.split("/")[0];
//       univ.add(univSplit);
//     });
//     return univ;
//   })
//   .then((resolve) => {
//     console.log(resolve);
//   });
// -------------- TEST -----------------  \\
