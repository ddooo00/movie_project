const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjcwODRkYzgxMjZhN2Q0YTJjNTY0NTI0ZjFlNjg5NCIsInN1YiI6IjY0NzQ2MDNjOTQwOGVjMDBhN2ZiNGFiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8q-ScrA47MKBVXKXv7LALyn7qYF6qcrIM7fD3u1_200",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.results);
    document.querySelector(".card").remove();
    response.results.forEach((movie) => {
      let template = ` <div class="card">
                            <img onclick='showId(${movie.id})'  class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                            <h3 class="movie-title">${movie.title}</h3>
                            <p class="movie_overview">
                            ${movie.overview}
                            </p>
                            <p class="movie_vote_average">💯Rating : ${movie.vote_average}</p>
                        </div>`;

      document
        .getElementById("card-list")
        .insertAdjacentHTML("beforeend", template);
    });
  })

  .catch((err) => console.error(err));

//template   + 클릭 시 카드 id값 보이게 하기
function showId(clicked_id) {
  alert("영화 id : " + clicked_id);
}

//버튼 클릭 시, 겁색한 영화만 보이게
function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let card = document.getElementsByClassName("card");
  console.log(search);

  for (let i = 0; i < card.length; i++) {
    title = card[i].getElementsByClassName("movie-title");

    if (title[0].innerHTML.toLowerCase().indexOf(search) != -1) {
      card[i].style.display = "flex";
    } else {
      card[i].style.display = "none";
    }
  }
}

//submit  아니라 필요 없는듯....?
// document.getElementById("searchBtn").addEventListener("click", (e) => {
//   e.preventDefault();
// });

// //필터로 거르기 , indexOf, css바꾸기
// function filter() {
//   let searchInput = document.getElementById("searchInput").value.toLowerCase;
//   let card_container =
//     document.getElementsByClassName("card_container")[0].value;
// }
// for (let i = 0; i < card_container.length; i++) {
//   title = card_container[i].getElementsByClassName("movie.title");
//   if (title[0].innerHTML.toLowerCase().indexOf(searchInput) != -1) {
//     card_container[i].style.display = "block";
//   } else {
//     card_container[i].style.display = "none";
//   }
// }

// const searchInput = document.getElementById("search");
// const searchBtn = document.getElementById("searchBtn");

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const val = searchInput.value;
//   console.log(val);
// });
