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

const commentInfo = JSON.parse(
  localStorage.getItem(localStorage.getItem("id"))
);
console.log(commentInfo);
if (commentInfo) {
  document.getElementById("comments-list").style.display = "flex";
  let userName = commentInfo["user name"];
  let comment = commentInfo.comment;
  if (!userName) {
    userName = "Anonymous";
  }
  document.getElementById("writer").innerText = userName;
  document.getElementById("comment-list").value = comment;
}
localStorage.setItem("a", 123);

const writeButton = document.getElementById("write-comment-icon-container");
let start;
let later;
let counter = 0;
let movieId = localStorage.getItem("id");
writeButton.addEventListener("mousedown", (e) => {
  start = Date.now();
});
writeButton.addEventListener("mouseup", (e) => {
  later = Date.now();
  if (later - start > 600) {
    const userName = prompt("유저 이름을 입력하세요.");
    const password = prompt("비밀번호를 입력해주세요.");
    localStorage.setItem(
      movieId,
      JSON.stringify({
        "user name": userName,
        id: movieId,
        title: localStorage.getItem("title"),
        comment: document.getElementById("comment-input").value,
        password: password,
      })
    );
    alert("댓글을 저장했습니다.");
    location.reload();
  }
});

document.getElementById("main-back").addEventListener("click", () => {
  location.href = "./index.html";
});

document
  .getElementById("write-comment-icon-container")
  .addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

document.getElementById("edit-button").addEventListener("click", () => {
  if (confirm("수정하시겠습니까?")) {
    const triedPassword = prompt("비밀번호를 입력해주세요.");
    const thePassword = JSON.parse(localStorage.getItem(movieId)).password;
    if (triedPassword === thePassword) {
      alert("댓글을 다시 입력해주세요.");
      document.getElementById("comment-input").focus();
      document.getElementById("comment-input").value =
        document.getElementById("comment-list").value;
    } else {
      alert("비밀번호가 틀렸습니다. \n다시 시도해 주세요.");
    }
  }
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
  `https://api.themoviedb.org/3/movie/${
    JSON.parse(localStorage.getItem(movieId)).id
  }/videos?language=en-US`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    videoKey = response.results[response.results.length - 1]["key"];
  })
  .catch((err) => console.error(err));

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: videoKey,
    playerVars: {
      playsinline: 1,
      autoplay: 1,
      color: "white",
      controls: 0,
      fs: 1,
    },
    events: {},
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
