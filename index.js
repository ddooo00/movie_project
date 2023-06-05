// 엔터키 누르면 버튼 온클릭되게 하기
function submitName(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    filter();
  }
}
// 카드 누르면 아이디값 나오게 하기
function showId(movieId) {
  alert(`Movie ID: ${movieId}`);
  clickID = console.log(`${movieId}`)
}
// 검색한 영화만 나오게 하기
function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let card = document.getElementsByClassName("card");

  for (let i = 0; i < card.length; i++) {
    let title = card[i]
      .getElementsByClassName("movie-title")[0]
      .textContent.toLowerCase();

    if (title.includes(search)) {
      card[i].style.display = "flex";
    } else {
      card[i].style.display = "none";
    }
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
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.results);
    document.querySelector(".card").remove();
    response.results.forEach((movie) => {
      let template = ` <div class="card" onclick = 'winopen()'>
                            <img onclick='showId(${movie.id})' class="img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
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

    // API 호출 완료 후 검색 버튼 및 엔터 키 입력 이벤트 처리
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("search");

    searchBtn.addEventListener("click", filter);
    searchInput.addEventListener("keydown", submitName);
  });

// document.getElementById("search").addEventListener("keyup", function (e) {
//   if (e.code === "Enter") {
//     document.getElementById("searchBtn").click();
//   }
// });
//근데 이거 submit  아니라 필요 없는듯....?
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

// 상세페이지 만들기
function winopen() {
  win = window.open('specific.html','specific');
  win.document.getElementByID('specific-title').innerText = "영화제목"
}

