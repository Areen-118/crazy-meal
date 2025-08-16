
function Order(mealName, mealPrice, mealImage) {
  this.mealName = mealName;
  this.mealPrice = mealPrice;
  this.mealImage = mealImage;
}


const form = document.getElementById("meal-form");
const tableBody = document.querySelector("#ordersTable tbody");
const clearBtn = document.getElementById("clearOrders");


let orders = JSON.parse(localStorage.getItem("orders")) || [];
renderOrders();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("mealName").value;
  const price = document.getElementById("mealPrice").value;
  const image = document.getElementById("mealImage").value;

  const newOrder = new Order(name, price, image);
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  renderOrders();
  form.reset();
});

clearBtn.addEventListener("click", function () {
  localStorage.removeItem("orders");
  orders = [];
  renderOrders();
});

function renderOrders() {
  tableBody.innerHTML = "";
  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.mealName}</td>
      <td>$${order.mealPrice}</td>
      <td><img src="${order.mealImage}" alt="${order.mealName}" width="100"/></td>
    `;
    tableBody.appendChild(row);
  });
}
