document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); 
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek); 

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = startOfWeek.toLocaleDateString('en-US', options);

    document.getElementById('current-week-date').innerText = ` ${formattedDate}`;
});

// Show more offers when "Show More" button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.querySelector(".loadMoreBtn"); 
    const moreOffers = document.querySelector(".hidden-offers"); 

    loadMoreBtn.addEventListener("click", function () {
        if (moreOffers.style.display === "none" || moreOffers.style.display === "") {
            moreOffers.style.display = "flex"; // Show the offers
            loadMoreBtn.textContent = "View Less"; 
        } else {
            moreOffers.style.display = "none"; // Hide the offers
            loadMoreBtn.textContent = "View More"; 
        }
    });
});

function toggleReviews(event) {
    event.stopPropagation(); // Prevent event from bubbling up

    // Find the closest tooltip for the clicked down-arrow
    const offer = event.target.closest('.offer');
    const tooltip = offer.querySelector('.review-tooltip');
    const allTooltips = document.querySelectorAll('.review-tooltip');

    // Hide all tooltips first
    allTooltips.forEach((tooltip) => {
        tooltip.style.display = 'none';
    });

    // Toggle visibility of the selected tooltip
    const isVisible = tooltip.style.display === 'block';
    if (isVisible) {
        tooltip.style.display = 'none'; // Hide if already visible
    } else {
        tooltip.style.display = 'block'; // Show the tooltip
    }
}

// Hide the tooltip when the mouse moves outside the down arrow or tooltip
document.addEventListener('mousemove', function (event) {
    const activeTooltip = document.querySelector('.review-tooltip[style*="display: block"]'); // Find the active tooltip
    const downArrows = document.querySelectorAll('.down-arrow'); // All down arrows

    if (activeTooltip) {
        let isHovered = false;

        // Check if the mouse is on any down arrow or the active tooltip
        downArrows.forEach(downArrow => {
            if (downArrow.contains(event.target) || activeTooltip.contains(event.target)) {
                isHovered = true; // Mouse is within the tooltip or the down arrow
            }
        });

        if (!isHovered) {
            activeTooltip.style.display = 'none'; // Hide the active tooltip
        }
    }
})


    // Check if the mouse is outside the down arrow and tooltip
    if (downArrow && tooltip) {
            tooltip.style.display = 'none'; // Hide the tooltip
        }
    
// Hide the tooltip when clicking outside
document.addEventListener('click', function (event) {
    const allTooltips = document.querySelectorAll('.review-tooltip');
    allTooltips.forEach((tooltip) => {
        tooltip.style.display = 'none';
    });
});
function showTooltip(review) {
    // Find the tooltip inside the hovered review
    var tooltip = review.querySelector('.Allreviews-tooltip');
    
    // Set display to block (show the tooltip)
    tooltip.style.display = 'block';
}

function hideTooltip(review) {
    // Find the tooltip inside the hovered review
    var tooltip = review.querySelector('.Allreviews-tooltip');
    
    // Set display to none (hide the tooltip)
    tooltip.style.display = 'none';
}





