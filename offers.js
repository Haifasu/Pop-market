// Array of objects to store existing offers
let offers = [
    { id: 1, name: '20% Off , Iphone 15pro-black', image: 'products/Offer1.png', selected: false },
    { id: 2, name: 'Buy 2 Books & Get 1 free', image: 'products/Offer2.png', selected: false },
    { id: 3, name: '15% Off Guitars, including accessories', image: 'products/Offer3.png', selected: false },
    { id: 4, name: '20% Off all books', image: 'products/book5.jpg', selected: false }
];

// Function to display offers with checkboxes
function displayOffers() {
    const offerContainer = document.querySelector('.Pcontainer3 .formFF');
    offerContainer.innerHTML = ''; // Clear existing offers
    
    offers.forEach(offer => {
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offerdiv');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('CheckD');
        checkbox.dataset.id = offer.id;
        checkbox.checked = offer.selected;
        checkbox.addEventListener('change', (e) => {
            const offerId = parseInt(e.target.dataset.id);
            const offerToUpdate = offers.find(o => o.id === offerId);
            if (offerToUpdate) {
                offerToUpdate.selected = e.target.checked;
            }
        });

        const label = document.createElement('label');
        const img = document.createElement('img');
        img.src = offer.image;
        img.width = 40;
        img.height = 35;

        label.appendChild(img);
        label.appendChild(document.createTextNode(` ${offer.name}`));

        offerDiv.appendChild(checkbox);
        offerDiv.appendChild(label);

        offerContainer.appendChild(offerDiv);
    });
}

// Function to delete selected offers
function deleteOffers() {
    const selectedOffers = offers.filter(offer => offer.selected);
    
    if (selectedOffers.length === 0) {
        alert("Please select at least one offer");
        return;
    }
    
    const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
    if (confirmDelete) {
        offers = offers.filter(offer => !offer.selected); // Keep unselected offers only
        displayOffers();
    }
}

// Function to uncheck all selected offers
function cancelSelection() {
    offers.forEach(offer => {
        offer.selected = false; // Set each offer's selected property to false
    });
    displayOffers(); // Update the display to reflect unchecked offers
}

// Event listener for the Delete button
document.querySelector('.clickbutton[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    deleteOffers();
});

// Event listener for the Cancel button
document.querySelector('.clickbutton[type="reset"]').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    cancelSelection(); // Uncheck all selected offers
});

// Function to add a new offer
function addNewOffer() {
    const offerNameInput = document.getElementById('Oname');
    const categoryInput = document.getElementById('Category');
    const priceInput = document.getElementById('price');
    const imageInput = document.getElementById('Oimg');

    let alertMessages = [];

    // Validate offer name: must start with a letter and contain no numbers or symbols at the start
    if (!/^[a-zA-Z]/.test(offerNameInput.value)) {
        alertMessages.push("Offer name should start with a letter and cannot contain numbers or special characters at the start.");
    }

    // Validate price: must be a positive number
    if (isNaN(priceInput.value) || priceInput.value <= 0) {
        alertMessages.push("Price should be a valid positive number.");
    }

    // Check for empty fields
    if (!offerNameInput.value || !categoryInput.value || !priceInput.value || !imageInput.files[0]) {
        alertMessages.push("Please fill in all fields.");
    }

    // Show alert if there are any validation issues
    if (alertMessages.length > 0) {
        alert(alertMessages.join("\n"));
        return;
    }

    // Add the new offer to the offers array
    const newOffer = {
        id: offers.length + 1, // Assign a new unique ID
        name: `${offerNameInput.value} - ${priceInput.value}$ in ${categoryInput.value}`,
        image: URL.createObjectURL(imageInput.files[0]), // Get the image URL
        selected: false
    };
    
    offers.push(newOffer);
    displayOffers(); // Update the offers list with the new offer

    // Reset the form
    offerNameInput.value = '';
    categoryInput.value = '';
    priceInput.value = '';
    imageInput.value = '';
}

// Event listener for the Add Offer button
document.querySelector('.Offersform input[type="submit"]').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    addNewOffer();
});

// Initial display of offers when the page loads
document.addEventListener('DOMContentLoaded', displayOffers);
