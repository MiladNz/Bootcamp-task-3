const btn = document.querySelector(".btn");
const searchSection = document.querySelector(".search");
const bodySection = document.querySelector(".card__body");
const tableBody = document.querySelector(".table__body");
const priceSort = document.querySelector(".sort_price");
const chevronPrice = document.querySelector(".chevron_price");
const dateSort = document.querySelector(".sort_date");
const chevronDate = document.querySelector(".chevron_date");
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

const URL = "http://localhost:3000/transactions";
let allData = [];

//events:

btn.addEventListener("click", loadContent);
priceSort.addEventListener("click", priceBasedSort);
dateSort.addEventListener("click", dateBasedSort);
searchInput.addEventListener("input", filterData);
searchIcon.addEventListener("click", filterData);

//functions:

function loadContent() {
  btn.classList.add("hidden");
  searchSection.style.display = "flex";
  bodySection.style.display = "flex";

  axios
    .get(URL)
    .then((res) => {
      allData = res.data;
      renderData(allData);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderData(data) {
  tableBody.innerHTML = "";
  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.id}</td>
        ${
          item.type === "افزایش اعتبار"
            ? `<td style='color : green'>${item.type}</td>`
            : `<td style='color : red'>${item.type}</td>`
        }
        <td>${new Intl.NumberFormat().format(item.price)}</td>
        <td>${item.refId}</td>
        <td>${new Date(item.date).toLocaleDateString("fa")} ساعت 
        ${new Date(item.date).toLocaleTimeString("fa")}
        </td>
    `;
    tableBody.appendChild(tr);
  });
}

function priceBasedSort() {
  chevronPrice.classList.toggle("up");
  if (chevronPrice.classList.contains("up")) {
    axios
      .get(`${URL}?_sort=price&_order=asc`)
      .then((res) => {
        let ascSortedData = res.data;
        renderData(ascSortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .get(`${URL}?_sort=price&_order=desc`)
      .then((res) => {
        let desSortedData = res.data;
        renderData(desSortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function dateBasedSort() {
  chevronDate.classList.toggle("up");
  if (chevronDate.classList.contains("up")) {
    axios
      .get(`${URL}?_sort=date&_order=asc`)
      .then((res) => {
        let ascSortedData = res.data;
        renderData(ascSortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .get(`${URL}?_sort=date&_order=desc`)
      .then((res) => {
        let desSortedData = res.data;
        renderData(desSortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function filterData() {
  const searchItem = +searchInput.value.trim();
  if (searchItem) {
    axios
      .get(`${URL}?refId_like=${searchItem}`)
      .then((res) => {
        const filteredData = res.data;
        renderData(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    loadContent();
  }
}
