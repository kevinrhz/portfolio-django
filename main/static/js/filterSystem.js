function initializeFilterSystem(options) {
    const filterButtonsContainer = document.querySelector(options.buttonContainerSelector);
    if (!filterButtonsContainer) {
        // console.warn('Filter system: Button container not found for selector:', options.buttonContainerSelector);
        return;
    }

    const filterButtons = filterButtonsContainer.querySelectorAll(options.buttonSelector);
    if (filterButtons.length === 0) {
        // console.warn('Filter system: No filter buttons found with selector:', options.buttonSelector);
        return;
    }

    function updateView(activeFilter) {
        filterButtons.forEach(btn => {
            const filterKey = btn.dataset.filter; // Using data-filter consistently
            btn.classList.toggle('active', filterKey === activeFilter);
        });

        if (options.sectionMap) { // For Skills page (section-based hiding)
            const sections = options.sectionMap;
            let commonShouldBeVisible = false;

            if (activeFilter === 'all' || (options.showCommonWith && options.showCommonWith.includes(activeFilter))) {
                commonShouldBeVisible = true;
            }

            const sweSection = document.getElementById(sections.swe);
            const dsmlSection = document.getElementById(sections.dsml);

            if (sweSection) sweSection.hidden = !(activeFilter === 'all' || activeFilter === 'swe');
            if (dsmlSection) dsmlSection.hidden = !(activeFilter === 'all' || activeFilter === 'dsml');
            
            const commonSection = document.getElementById(options.commonSectionId);
            if (commonSection) commonSection.hidden = !commonShouldBeVisible;

        } else if (options.itemSelector && options.contentContainerSelector) { // For Projects page (item-based hiding)
            const contentItemsContainer = document.querySelector(options.contentContainerSelector);
            if (contentItemsContainer) {
                const contentItems = contentItemsContainer.querySelectorAll(options.itemSelector);
                contentItems.forEach(item => {
                    const itemCategoriesString = item.dataset.category || "";
                    const itemCategories = itemCategoriesString.split(' ').filter(cat => cat.length > 0);
                    
                    if (activeFilter === 'all' || itemCategories.includes(activeFilter)) {
                        item.style.display = ''; // Or 'flex' if items are flex items
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (typeof closeCurrentlyExpandedProject === 'function') {
                closeCurrentlyExpandedProject(); // Close expanded project card before filtering
            }
            updateView(button.dataset.filter);
        });
    });

    if (options.defaultFilter) {
        updateView(options.defaultFilter);
    } else {
        const firstButton = filterButtonsContainer.querySelector(options.buttonSelector);
        if (firstButton) updateView(firstButton.dataset.filter || 'all');
    }
}

// This function needs to be defined by the page that uses card expansion (projects page)
// and made available if filterSystem is to call it.
// function closeCurrentlyExpandedProject() { ... }