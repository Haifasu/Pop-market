// Utility functions
const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

// Render cart
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.querySelector("#cart tbody");
    cartItemsContainer.innerHTML = ""; // Clear the cart

    let total = 0;

    cart.forEach((item, index) => {
        const updatedPrice = item.price * item.quantity; // Dynamically calculate the price
        const subtotal = updatedPrice; // Subtotal equals the dynamically calculated price
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" class="remove-item" data-index="${index}"><i class="fas fa-times-circle" style="color:black"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td class="product-name">${item.name}</td>
            <td class="item-price" data-index="${index}">${updatedPrice.toFixed(2)} SAR</td>
            <td><input type="number" class="quantity-input" data-index="${index}" value="${item.quantity}" min="1"></td>
            <td class="item-subtotal" data-index="${index}">${subtotal.toFixed(2)} SAR</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update totals in the Cart Totals section
    updateCartTotals(total);

    attachEventListeners(); // Attach event listeners again
}

// Update totals in the Cart Totals section
function updateCartTotals(total) {
    document.querySelector("#cart-add .subtotal table tr:nth-child(1) td:last-child").textContent = `${total.toFixed(2)} SAR`;
    document.querySelector("#cart-add .subtotal table tr:nth-child(3) td:last-child").textContent = `${total.toFixed(2)} SAR`;
}

// Update quantity and recalculate price dynamically
function updateQuantity(index, quantity) {
    const cart = getCart();

    if (cart[index] && quantity > 0) {
        cart[index].quantity = quantity; // Update quantity
        saveCart(cart); // Save to localStorage

        // Update dynamic price and subtotal for the specific item
        const updatedPrice = cart[index].price * cart[index].quantity;
        const itemSubtotal = updatedPrice; // Subtotal is the same as the updated price

        // Update price and subtotal in the DOM
        document.querySelector(`.item-price[data-index="${index}"]`).textContent = `${updatedPrice.toFixed(2)} SAR`;
        document.querySelector(`.item-subtotal[data-index="${index}"]`).textContent = `${itemSubtotal.toFixed(2)} SAR`;

        // Recalculate the total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        updateCartTotals(total); // Update total in the Cart Totals section
    }
}

// Remove an item from the cart
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1); // Remove the item
    saveCart(cart); // Save updated cart
    renderCart(); // Re-render the cart
}

// Clear the entire cart
function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("cart"); // Clear cart data
        renderCart(); // Re-render the empty cart
    }
}

// Attach event listeners
function attachEventListeners() {
    // Quantity change event
    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            const quantity = parseInt(e.target.value, 10);
            if (quantity > 0) updateQuantity(index, quantity);
        });
    });

    // Remove item event
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const index = button.dataset.index;
            removeItem(index);
        });
    });

    // Clear cart event
    const clearCartButton = document.getElementById("clear-cart-button");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }
}

// Proceed to checkout
document.getElementById("checkout-button").addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Transfer cart data to localStorage for evaluation
    localStorage.setItem("cartForEvaluation", JSON.stringify(cart));

    // Alert total cost
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thank you for your purchase! Your total cost is ${total.toFixed(2)} SAR.`);

    // Redirect to evaluation page
    window.location.href = "EvaluationPage.html";
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
