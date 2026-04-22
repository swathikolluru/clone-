const productsData = [
  { id: 1, name: "iPhone 14", price: 70000, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Samsung S23", price: 60000, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Laptop", price: 50000, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Headphones", price: 2000, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Smart Watch", price: 3000, image: "https://via.placeholder.com/150" },
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search");

function displayProducts(data) {
  productsContainer.innerHTML = "";

  data.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = productsData.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = productsData.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

displayProducts(productsData);
