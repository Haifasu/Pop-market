// Checkout functionality: On clicking "Place Order"
document.getElementById("place-order-button").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // Calculate the total cost of the cart
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Display the acknowledgment with the total cost
    alert(`Thank you for your order! Your total cost is ${total.toFixed(2)} SAR.`);

    // Store the cart data in localStorage for the evaluation page
    localStorage.setItem("cartForEvaluation", JSON.stringify(cart));

    // Transfer to the evaluation page
    window.location.href = "EvaluationPage.html";  // Redirect to the EvaluationPage.html
});

// Check if cart data exists in localStorage
window.addEventListener('load', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-body');
    let subtotal = 0;

    // Clear the table before adding new rows
    cartItemsContainer.innerHTML = '';

    // Loop through the cart and create table rows
    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="order-img"></td>
            <td>
                <h3 class="table-title">${item.name}</h3>
                <p class="table-quantity">x ${item.quantity}</p>
            </td>
            <td><span class="table-price">${itemTotal.toFixed(2)} SAR</span></td>
        `;
        
        cartItemsContainer.appendChild(row);
    });

    // Update the subtotal and total values
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} SAR`;
    document.getElementById('total').textContent = `${subtotal.toFixed(2)} SAR`;
});
