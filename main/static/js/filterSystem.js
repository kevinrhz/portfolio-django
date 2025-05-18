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

    // This function updates the active state of buttons and visibility of content sections
    function updateView(activeFilter) {
        filterButtons.forEach(btn => {
            // Use data-filter for project page, data-view for skills page (or standardize to data-filter)
            const filterKey = btn.dataset.filter || btn.dataset.view;
            btn.classList.toggle('active', filterKey === activeFilter);
        });

        // Logic specific to skills page: showing/hiding whole sections
        if (options.sectionMap) {
            const sections = options.sectionMap;
            let commonShouldBeVisible = false;

            // Determine if common section should be visible based on active filter
            if (activeFilter === 'all' || (options.showCommonWith && options.showCommonWith.includes(activeFilter))) {
                commonShouldBeVisible = true;
            }

            // Hide/show primary sections (SWE, DSML)
            const sweSection = document.getElementById(sections.swe);
            const dsmlSection = document.getElementById(sections.dsml);

            if (sweSection) {
                sweSection.hidden = !(activeFilter === 'all' || activeFilter === 'swe');
            }
            if (dsmlSection) {
                dsmlSection.hidden = !(activeFilter === 'all' || activeFilter === 'dsml');
            }

            // Hide/show common section
            const commonSection = document.getElementById(options.commonSectionId);
            if (commonSection) {
                commonSection.hidden = !commonShouldBeVisible;
            }
        }
        // If itemSelector and contentContainerSelector are provided (for project-like filtering)
        else if (options.itemSelector && options.contentContainerSelector) {
            const contentItemsContainer = document.querySelector(options.contentContainerSelector);
            if(contentItemsContainer){
                const contentItems = contentItemsContainer.querySelectorAll(options.itemSelector);
                contentItems.forEach(item => {
                    const itemCategories = item.dataset.category ? item.dataset.category.split(' ') : [];
                    if (activeFilter === 'all' || itemCategories.includes(activeFilter)) {
                        item.style.display = ''; // Default display (e.g., 'grid' for grid items)
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterKey = button.dataset.filter || button.dataset.view;
            updateView(filterKey);
        });
    });

    // Initial view state
    if (options.defaultFilter) {
        updateView(options.defaultFilter);
    } else {
        // Fallback if no default is specified, though skills_page_filter_init should set one
        const firstButton = filterButtonsContainer.querySelector(options.buttonSelector);
        if(firstButton){
            const firstFilterKey = firstButton.dataset.filter || firstButton.dataset.view;
            updateView(firstFilterKey || 'all');
        }
    }
}