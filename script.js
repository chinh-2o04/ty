const form = document.getElementById("form");
const dateInput = document.getElementById("date");
const xuInput = document.getElementById("xu");
const tableBody = document.getElementById("tableBody");
const totalXuEl = document.getElementById("totalXu");
const totalTienEl = document.getElementById("totalTien");

let data = JSON.parse(localStorage.getItem("xuData")) || [];

function renderTable() {
  tableBody.innerHTML = "";
  let totalXu = 0;
  let totalTien = 0;

  data.forEach(entry => {
    const xu = entry.xu;
    const tien = Math.round((xu / 1000) * 80);
    const bonus = xu >= 7000 ? 1000 : xu >= 6000 ? 500 : 0;

    totalXu += xu;
    totalTien += tien + bonus;

    const row = `<tr>
      <td>${entry.date}</td>
      <td>${xu}</td>
      <td>${tien}k</td>
      <td>${bonus === 0 ? "" : bonus}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  totalXuEl.textContent = (totalXu / 1000).toFixed(3);
  totalTienEl.textContent = `${totalTien}k`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const xu = parseInt(xuInput.value);

  if (!date || !xu) return;

  // Xoá ngày cũ nếu có
  data = data.filter(d => d.date !== date);

  data.push({ date, xu });
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("xuData", JSON.stringify(data));

  dateInput.value = "";
  xuInput.value = "";

  renderTable();
});

renderTable();
