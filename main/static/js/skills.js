document.addEventListener('DOMContentLoaded', () => {
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const skillSections = {
        swe: document.getElementById('swe-skills-view'),
        dsml: document.getElementById('dsml-skills-view'),
        common: document.getElementById('common-skills-view')
    };

    function updateView(activeView) {
        viewToggleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === activeView);
        });

        if (activeView === 'all') {
            skillSections.swe.hidden = false;
            skillSections.dsml.hidden = false;
            skillSections.common.hidden = false;
        } else {
            skillSections.swe.hidden = (activeView !== 'swe');
            skillSections.dsml.hidden = (activeView !== 'dsml');
            if (activeView === 'swe' || activeView === 'dsml') {
                 skillSections.common.hidden = false;
            } else {
                 skillSections.common.hidden = true;
            }
        }
    }

    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateView(button.dataset.view);
        });
    });

    updateView('all');
});