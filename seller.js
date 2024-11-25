document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("productForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent form submission

        let productName = document.getElementById("Pname").value;
        let category = document.getElementById("Category").value;
        let price = document.getElementById("price").value;
        let quantity = document.getElementById("quantity").value;
        let description = document.getElementById("description").value;
        let imageFile = document.getElementById("Pimg") ? document.getElementById("Pimg").files[0] : null; // Check if image input exists

        let alertMessages = [];

        // Validate product name
        if (!/^[a-zA-Z]/.test(productName)) {
            alertMessages.push("Product name should start with a letter and cannot contain numbers or special characters.");
        }
        // Validate price
        if (isNaN(price) || price <= 0) {
            alertMessages.push("Price should be a valid positive number.");
        }
        // Validate quantity
        if (isNaN(quantity) || quantity <= 0) {
            alertMessages.push("Quantity should be a valid positive number.");
        }
        // Validate description
        if (!description) {
            alertMessages.push("Description cannot be empty.");
        }

        if (alertMessages.length > 0) {
            alert(alertMessages.join("\n"));
            return;
        }

        if (imageFile) {
            let reader = new FileReader();
            reader.onload = function(e) {
                let product = {
                    name: productName,
                    category: category,
                    price: price,
                    quantity: quantity,
                    description: description,
                    imageUrl: e.target.result // Save image as data URL
                };

                saveProduct(product);
            };
            reader.readAsDataURL(imageFile);
        } else {
            let product = {
                name: productName,
                category: category,
                price: price,
                quantity: quantity,
                description: description
            };

            saveProduct(product);
        }
    });
});

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert(`Product successfully added!\n\nDetails:\nName: ${product.name}\nCategory: ${product.category}\nPrice: $${product.price}\nQuantity: ${product.quantity}\nDescription: ${product.description}`);
    window.location.href = "mainseller.html";
}
