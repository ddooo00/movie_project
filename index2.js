import { makeMovieCards } from './js/fetch_movie_list.js';
// 영화 목록 불러오기 기능
document.addEventListener('DOMContentLoaded', makeMovieCards(2));

// API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjcwODRkYzgxMjZhN2Q0YTJjNTY0NTI0ZjFlNjg5NCIsInN1YiI6IjY0NzQ2MDNjOTQwOGVjMDBhN2ZiNGFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8q-ScrA47MKBVXKXv7LALyn7qYF6qcrIM7fD3u1_200',
    },
};
// 기타 정보들 받기
const fetchBase = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/configuration',
        options
    );
    const data = await res.json();
    return data;
};
// console.log(await fetchBase());
// 백드롭 사이즈 ['w300', 'w780', 'w1280', 'original']
// 로고 사이즈 ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original']
// 포스터 사이즈 ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
// 프로필 사이즈 ['w45', 'w185', 'h632', 'original']
// 스틸 사이즈 ['w92', 'w185', 'w300', 'original']
const imgBaseUrl = 'https://image.tmdb.org/t/p';

const fetchMovie = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        options
    );
    const data = await res.json();
    return data.results;
};
const fetchPoster = async (movieId) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        options
    );
    const data = await res.json();
    console.log(data);
    return data;
};

const populate = async () => {
    const main = document.querySelector('main');
    const data = await fetchMovie();
    const posterResult = await fetchPoster(data[0].id);
    const path = posterResult.backdrops[0].file_path;
    const backdropImg = `${imgBaseUrl}/original${path}`;
    // main background image applied.
    // main.style.background = `url('${backdropImg}')`;
};

populate();
document.getElementById('random-icon').addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 50);
    makeMovieCards(randomNumber);
    document.getElementById('cards-container').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('cards-container').style.opacity = 1;
    }, 500);
});
