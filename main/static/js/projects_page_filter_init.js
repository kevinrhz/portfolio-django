document.addEventListener('DOMContentLoaded', () => {
    initializeFilterSystem({
        buttonContainerSelector: '.project-filters',
        buttonSelector: '.view-toggle-btn',
        itemSelector: '.project-card.filter-item',
        contentContainerSelector: '.projects-grid.filterable-content',
        defaultFilter: 'all'
    });

    // Note: The projects_card_expansion.js will handle its own DOMContentLoaded
    // or you can call an initialization function from it here if you prefer.
    // For simplicity, separate DOMContentLoaded listeners are fine.
});