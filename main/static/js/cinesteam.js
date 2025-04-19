document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('game-search-form');
    const gameInput = document.getElementById('game-input');
    const movieList = document.getElementById('movie-list');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const gameName = gameInput.value.trim();
        
        if (gameName === '') {
            return;
        }

        // Placeholder for fetching movie recommendations
        movieList.innerHTML = `<p>Searching for recommendations...</p>`;

        // Simulating fetching movies (replace with actual API request later)
        setTimeout(() => {
            const fakeMovies = [
                { title: "Inception", poster_link: "https://image.tmdb.org/t/p/w500/example1.jpg" },
                { title: "The Matrix", poster_link: "https://image.tmdb.org/t/p/w500/example2.jpg" },
                { title: "Interstellar", poster_link: "https://image.tmdb.org/t/p/w500/example3.jpg" }
            ];
            
            movieList.innerHTML = fakeMovies.map(movie => `
                <div class="movie-card">
                    <img src="${movie.poster_link}" alt="${movie.title}" class="movie-poster">
                    <p class="movie-title">${movie.title}</p>
                </div>
            `).join('');
        }, 1500);
    });
});
