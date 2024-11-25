window.onload = function() {
    // Sorting functionality
    document.getElementById("sort").addEventListener("change", function () {
        const products = Array.from(document.querySelectorAll(".product-item"));
        const sortBy = this.value;

        products.sort((a, b) => {
            const nameA = a.querySelector("p").textContent.trim().toLowerCase();
            const nameB = b.querySelector("p").textContent.trim().toLowerCase();
            const priceA = parseFloat(a.querySelector(".price").textContent.replace(" SAR", ""));
            const priceB = parseFloat(b.querySelector(".price").textContent.replace(" SAR", ""));

            if (sortBy === "a-z") return nameA.localeCompare(nameB);
            if (sortBy === "z-a") return nameB.localeCompare(nameA);
            if (sortBy === "low-to-high") return priceA - priceB;
            if (sortBy === "high-to-low") return priceB - priceA;
        });

        const container = document.querySelector(".product-grid");
        container.innerHTML = "";
        products.forEach(product => container.appendChild(product));
    });

    // Quantity and cart management
    document.querySelectorAll(".product-item").forEach((product) => {
        const increaseBtn = product.querySelector(".increase-qty");
        const decreaseBtn = product.querySelector(".decrease-qty");
        const quantitySpan = product.querySelector(".quantity");
        const addToCartBtn = product.querySelector(".add-to-cart");

        // Ensure elements exist
        if (!increaseBtn || !decreaseBtn || !quantitySpan || !addToCartBtn) {
            console.error("Some required elements are missing in the product-item.");
            return;
        }

        // Increase quantity
        increaseBtn.addEventListener("click", () => {
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        });

        // Decrease quantity with a minimum limit of 1
        decreaseBtn.addEventListener("click", () => {
            const quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) quantitySpan.textContent = quantity - 1;
        });

        // Add product to the cart without a checkbox selection
        addToCartBtn.addEventListener("click", () => {
            // Retrieve existing cart or initialize as empty array
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const productName = product.querySelector("p").textContent.trim();
            const productPrice = parseFloat(product.querySelector(".price").textContent.replace(" SAR", ""));
            const quantity = parseInt(quantitySpan.textContent);
            const productImage = product.querySelector("img").src;

            // Check if the product already exists in the cart
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += quantity; // Update quantity
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: quantity,
                    image: productImage
                });
            }

            // Save updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Redirect to Cart page
    const cartIcon = document.querySelector(".fa-shopping-cart");
    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    } else {
        console.error("Cart icon not found.");
    }
};
