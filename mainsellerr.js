document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the products array from localStorage (if any)
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // If there are products, create and display them
    if (products.length > 0) {
        // Loop through each product and create HTML for each one
        products.forEach(function(product) {
            // Create product card
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // Set the product content inside the card
            productCard.innerHTML = `
                <img src="${product.imageUrl || 'default_image.jpg'}" alt="${product.name} Image" onError="this.onerror=null;this.src='default_image.jpg';">
                <div class="details">
                    <h4>${product.name}</h4>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                </div>
                <div class="price-quantity">
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Quantity:</strong> ${product.quantity}</p>
                </div>
            `;

            // Append the product card to the product list container
            document.querySelector(".product-list-container").appendChild(productCard);
        });
    } else {
        // If no products exist in localStorage, show a message
        let message = document.createElement("p");
        message.textContent = "No products available. Add some products to see them here.";
        document.querySelector(".product-list-container").appendChild(message);
    }
});
