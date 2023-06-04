
// 엔터키 누르면 버튼 온클릭되게 하기
function submitName(event) {
  if (event.key === "Enter") {
    if (!document.getElementById('search').value) {
      alert ('검색어를 입력해주세요.')
    }
    event.preventDefault(); // Prevent form submission
    filter();
    console.log(1)
  }
}
// 카드 누르면 아이디값 나오게 하기
function showId(movieId) {
  alert(`Movie ID: ${movieId}`);
}
// 검색한 영화만 나오게 하기
function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let card = document.getElementsByClassName("card");
  const searchResultArr = [];
  for (let i = 0; i < card.length; i++) {
    let titleInputValue = card[i]
      .getElementsByClassName("movie-title")[0]
      .textContent.toLowerCase();
    if (titleInputValue.includes(search)) {
      card[i].style.display = "flex";
      searchResultArr.push(titleInputValue)
      console.log(searchResultArr)
    } else {
      card[i].style.display = "none";
    }
  }
  console.log(searchResultArr)
  if (!searchResultArr) {
    alert('일치하는 결과가 없습니다.')
  }
}
// API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjcwODRkYzgxMjZhN2Q0YTJjNTY0NTI0ZjFlNjg5NCIsInN1YiI6IjY0NzQ2MDNjOTQwOGVjMDBhN2ZiNGFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8q-ScrA47MKBVXKXv7LALyn7qYF6qcrIM7fD3u1_200",
  },
};

const fetchData = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  )
  const data = await res.json();
  return data.results
}

export const makeMovieCards = async () => {
  const movies = await fetchData();
  console.log(movies)
  const cardContainer = document.getElementById('card-list');

  cardContainer.innerHTML = movies.map(movie => {
    return `
    <div class="card" _id="${movie.id}">
      <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie_overview">
      ${movie.overview}
      </p>
      <p class="movie_vote_average">💯Rating : ${movie.vote_average}</p>
    </div>
    `
  }).join('');

  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', (e) => {
      alert(e.currentTarget.getAttribute('_id'))
    })
  })
}


