let cart = [];

const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");
const cartSidebar = document.getElementById("cart");
const emptyCartMsg = document.getElementById("empty-cart-msg");

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("hidden");
}

// Close cart when clicking outside
document.addEventListener("click", function(event) {
  if (!event.target.closest(".cart-sidebar") && !event.target.closest(".btn-cart")) {
    if (!cartSidebar.classList.contains("hidden")) {
      cartSidebar.classList.add("hidden");
    }
  }
});

// Add to cart functionality
function addToCart(productName, price) {
  const product = { name: productName, price: price, id: Date.now() };
  cart.push(product);
  updateCart();
  toggleCart();
  showNotification(`${productName} added to cart!`);
}

// Update cart display
function updateCart() {
  cartItems.innerHTML = "";
  
  if (cart.length === 0) {
    emptyCartMsg.style.display = "block";
  } else {
    emptyCartMsg.style.display = "none";
    let total = 0;
    
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${item.name}</strong>
            <div style="font-size: 12px; color: #666;">₹${item.price}</div>
          </div>
          <button onclick="removeFromCart(${index})" style="background: #ff6b6b; color: white; padding: 4px 8px; border: none; border-radius: 2px; cursor: pointer; font-size: 12px;">Remove</button>
        </div>
      `;
      cartItems.appendChild(li);
      total += item.price;
    });
    
    const totalLi = document.createElement("li");
    totalLi.style.cssText = "padding: 12px 0; border-top: 2px solid #e0e0e0; margin-top: 12px; font-weight: 600; font-size: 14px;";
    totalLi.textContent = `Total: ₹${total}`;
    cartItems.appendChild(totalLi);
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #2874f0;
    color: white;
    padding: 12px 16px;
    border-radius: 4px;
    z-index: 999;
    animation: slideInUp 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add styles for notification animation
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Search functionality
searchInput.addEventListener("keyup", function(e) {
  console.log("Searching for:", e.target.value);
});

// Make product cards clickable to add to cart (demo)
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", function() {
    const title = this.querySelector("h3").textContent;
    addToCart(title, 5999);
  });
});

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
