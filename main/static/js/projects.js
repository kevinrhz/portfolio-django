document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const mediaViewer = document.getElementById('mediaViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerVideo = document.getElementById('viewerVideo');
    const mediaWrapper = document.getElementById('mediaWrapper');
    const closeModal = document.querySelector('.close');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 6px 15px hsla(0, 0%, 0%, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 10px hsla(0, 0%, 0%, 0.2)';
        });
    });

    // Open project links in a new tab
    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        link.setAttribute('target', '_blank');
    });
    

    // Media data for the Custom PC project
    const mediaFiles = [
        { type: 'image', src: '/static/images/customPC1.jpg' },
        { type: 'image', src: '/static/images/customPC2.jpg' },
        { type: 'video', src: '/static/videos/customPC.mp4' }
    ];

    // Open modal when clicking the button
    document.querySelectorAll('.open-viewer').forEach(button => {
        button.addEventListener('click', () => {
            currentIndex = 0;
            updateMedia();
            mediaViewer.style.display = 'flex';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        mediaViewer.style.display = 'none';
        viewerVideo.pause();
    });

    // Navigate to next media
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaFiles.length;
        updateMedia();
    });

    // Navigate to previous media
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
        updateMedia();
    });

    function updateMedia() {
        const media = mediaFiles[currentIndex];

        // Hide all media initially
        viewerImage.style.display = 'none';
        viewerVideo.style.display = 'none';

        if (media.type === 'image') {
            viewerImage.src = media.src;
            viewerImage.style.display = 'block';
        } else if (media.type === 'video') {
            viewerVideo.src = media.src;
            viewerVideo.style.display = 'block';
        }
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === mediaViewer) {
            mediaViewer.style.display = 'none';
            viewerVideo.pause();
        }
    });
    
});