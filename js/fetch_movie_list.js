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
  );
  const data = await res.json();
  return data.results;
};
export const makeMovieCards = async () => {
  const movies = await fetchData();
  console.log(movies);
  const cardContainer = document.getElementById("card-list");
  const movieInfo = [];
  cardContainer.innerHTML = movies
    .map((movie) => {
      movieInfo.push({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        rate: movie.vote_average,
        poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        date: movie.release_date,
      });
      return `
      <div class="card" _id="${movie.id}">
        <img class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie_overview">
        ${movie.overview}
        </p>
        <p class="heart">heart</p>
        <p class="movie_vote_average">💯Rating : ${movie.vote_average}</p>
      </div>
      `;
    })
    .join("");
  // 카드 누르면 아이디값 나오게 하기
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("_id");
      for (let i = 0; i < movieInfo.length; i++) {
        if (movieInfo[i].id == targetId) {
          localStorage.setItem("id", movieInfo[i].id);
          localStorage.setItem("title", movieInfo[i].title);
          localStorage.setItem("overview", movieInfo[i].overview);
          localStorage.setItem("rate", movieInfo[i].rate);
          localStorage.setItem("poster", movieInfo[i].poster);
          localStorage.setItem("date", movieInfo[i].date);
          break;
        }
      }
      window.location.href = "./상세페이지.html";
    });
  });
};

// 검색한 영화만 나오게 하기
export function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let card = document.getElementsByClassName("card");
  const searchResultArr = [];
  for (let i = 0; i < card.length; i++) {
    let titleInputValue = card[i]
      .getElementsByClassName("movie-title")[0]
      .textContent.toLowerCase();
    if (titleInputValue.includes(search)) {
      card[i].style.display = "flex";
      searchResultArr.push(titleInputValue);
      console.log(searchResultArr);
    } else {
      card[i].style.display = "none";
    }
  }
  console.log(searchResultArr);
  if (!searchResultArr.length) {
    alert("일치하는 결과가 없습니다.");
    document.querySelectorAll(".card").forEach((element) => {
      element.style.display = "flex";
      document.getElementById("search").value = "";
    });
  }
}
