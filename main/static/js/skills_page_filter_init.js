document.addEventListener('DOMContentLoaded', () => {
    initializeFilterSystem({
        buttonContainerSelector: '.skills-header .view-selector', // CSS selector for the div containing filter buttons
        buttonSelector: '.view-toggle-btn',          // CSS selector for the filter buttons themselves
        defaultFilter: 'all',                        // The data-filter value of the default selected button

        // Section-based filtering specific to skills page:
        sectionMap: { // Maps `data-view` or `data-filter` values to the IDs of content sections
            'swe': 'swe-skills-view',
            'dsml': 'dsml-skills-view'
            // 'all' implicitly shows all, plus common
            // 'common' is handled by commonSectionId and showCommonWith
        },
        commonSectionId: 'common-skills-view', // ID of the common skills section
        showCommonWith: ['swe', 'dsml'] // data-filter values that should also show the common section
    });
});