// title
document.getElementById("main-title").innerText = localStorage.getItem("title");
// like count
// document.querySelector('#main-info-likes p').innerText
// rate => 10점 만점에서 5점 만점으로 계산
document.querySelector("#main-info-rate h3").innerText =
  localStorage.getItem("rate") / 2;
// overview
document.querySelector("#overwiew-container p").innerText =
  localStorage.getItem("overview");
// poster
document.querySelector("#main-poster img").src = localStorage.getItem("poster");
document.getElementById(
  "movie-detail-sect-1"
).style.background = `url(${localStorage.getItem("poster")})`;
document.querySelector(
  "#comment-container h3"
).innerText = `${localStorage.getItem("title")}에 대한 한줄평을 작성해주세요!`;
document
  .getElementById("write-comment-icon-container")
  .setAttribute("_id", localStorage.getItem("id"));

document.getElementById("comment-input").placeholder = `${localStorage.getItem(
  "title"
)} 재미있게 보셨나요? 영화의 어떤 점이 좋았는지 이야기해주세요.`;

document.getElementById("main-back").addEventListener("click", () => {
  location.href = "./index.html";
});

document
  .getElementById("write-comment-icon-container")
  .addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
//
//
//
//
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDJlNzU1ZWIyZTBiMjYwNGM5ZGMzZTRhMjQ4ZTFlZCIsInN1YiI6IjY0MDQwNGI4ZTYxZTZkMDBjNjU4MThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqn-AW0hg003HruAB1mhPIGh2W2-dX1buHHUDiN6TNs",
  },
};

let videoKey;
fetch(
  `https://api.themoviedb.org/3/movie/${localStorage.getItem(
    "id"
  )}/videos?language=en-US`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    videoKey = data.results[data.results.length - 1]["key"];
  })
  .catch((err) => console.error(err));

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videoKey,
    playerVars: {
      playsinline: 1,
      playlist: videoKey,
      autoplay: 0,
      color: "white",
      controls: 1,
      fs: 1,
    },
    events: {
      onError: onPlyaerError
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}
function onPlyaerError(event) {
  console.log('YouTube 동영상 재생 중 오류 발생:');
  console.log('오류 코드:', event.data);
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
