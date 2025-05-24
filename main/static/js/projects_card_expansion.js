document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.projects-grid');

    if (!projectGrid) {
        // console.warn('Project grid not found.');
        return;
    }

    projectGrid.addEventListener('click', function(event) {
        const card = event.target.closest('.project-card');
        if (!card) return;

        // Elements that trigger expansion: image or "Details" button
        const clickedImage = event.target.closest('.project-image');
        const clickedDetailsButton = event.target.closest('.btn-details');

        // Check if the click was on another action button (e.g., GitHub, Demo)
        const actionButton = event.target.closest('.project-links a:not(.btn-details)');
        if (actionButton) {
            // Allow default link behavior and don't toggle expansion
            return;
        }

        if (clickedImage || clickedDetailsButton) {
            event.preventDefault(); // Prevent default for 'Details' <a> tag

            // If there's an already expanded card that isn't this one, close it
            const currentlyExpanded = projectGrid.querySelector('.project-card.expanded');
            if (currentlyExpanded && currentlyExpanded !== card) {
                currentlyExpanded.classList.remove('expanded');
                // Optional: Scroll to top of closing card or grid
            }

            // Toggle the clicked card
            card.classList.toggle('expanded');

            // Optional: Scroll to the card if it expanded and might be off-screen
            if (card.classList.contains('expanded')) {
                setTimeout(() => { // Allow time for expansion before scrolling
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 500); // Match transition duration
            }
        }
    });

    // Close expanded card if clicking outside of it (optional)
    document.addEventListener('click', function(event) {
        const expandedCard = projectGrid.querySelector('.project-card.expanded');
        if (expandedCard && !expandedCard.contains(event.target)) {
            // Click was outside the currently expanded card
            expandedCard.classList.remove('expanded');
        }
    });
});