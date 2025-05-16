document.addEventListener('DOMContentLoaded', () => {
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const skillSections = {
        swe: document.getElementById('swe-skills-view'),
        dsml: document.getElementById('dsml-skills-view'),
        common: document.getElementById('common-skills-view') // For skills relevant to both or 'all'
    };

    function updateView(activeView) {
        viewToggleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === activeView);
        });

        if (activeView === 'all') {
            skillSections.swe.hidden = false;
            skillSections.dsml.hidden = false;
            skillSections.common.hidden = false; // Show common skills in 'all' view
        } else {
            skillSections.swe.hidden = (activeView !== 'swe');
            skillSections.dsml.hidden = (activeView !== 'dsml');
            // Show common skills if either SWE or DSML is selected
            if (activeView === 'swe' || activeView === 'dsml') {
                 skillSections.common.hidden = false;
            } else { // This case should not be hit if 'all' is handled, but as a fallback
                 skillSections.common.hidden = true;
            }
        }
        // Default to SWE view if no specific view is active (e.g., on page load after initial load)
        // This part of the original logic might need refinement based on exact desired behavior on direct navigation/refresh
        let anyViewActive = !skillSections.swe.hidden || !skillSections.dsml.hidden;
        if (activeView === 'all') anyViewActive = true;

        if (!anyViewActive) { // If neither SWE nor DSML is specifically active, and not 'all'
             skillSections.swe.hidden = false; // Default view
             skillSections.common.hidden = false; // Also show common with default view
        }
    }

    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateView(button.dataset.view);
        });
    });

    // Determine initial view based on URL hash or a default
    let initialView = 'swe'; // Default
    // Example: if you wanted to link like skills.html#dsml
    // if(window.location.hash) {
    //    initialView = window.location.hash.substring(1); // remove #
    //    if (!skillSections[initialView]) initialView = 'swe'; // fallback if hash is invalid
    // }
    updateView(initialView);
});