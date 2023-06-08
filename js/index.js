import { filter, makeMovieCards } from './fetch_movie_list.js';
// 영화 목록 불러오기 기능
document.addEventListener('DOMContentLoaded', makeMovieCards());

document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (!event.target.value) {
            document.querySelectorAll('.card').forEach((card) => {
                card.style.display = 'flex';
            });
            alert('검색어를 입력해주세요.');
        } else {
            filter();
        }
    }
});
