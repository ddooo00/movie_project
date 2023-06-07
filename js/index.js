import { filter, makeMovieCards } from "./fetch_movie_list.js";
// 영화 목록 불러오기 기능
document.addEventListener("DOMContentLoaded", makeMovieCards());

document.getElementById("search").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!event.target.value) {
      document.querySelectorAll(".card").forEach((card) => {
        card.style.display = "flex";
      });
      alert("검색어를 입력해주세요.");
    } else {
      filter();
    }
  }
});

document.querySelector("#searchBtn").addEventListener("click", (event) => {
  console.log(event.currentTarget);
  if (!event.target.parentNode.querySelector("#search").value) {
    document.querySelectorAll(".card").forEach((card) => {
      card.style.display = "flex";
    });
    alert("검색어를 입력해주세요.");
    event.preventDefault();
  } else {
    filter();
  }
});

console.log(localStorage.getItem("a"));

// 좋아요기능-한희
window.onload = () => {
  const like = document.querySelector(".fa");
  document.getElementById("btn").style.background = "rgb(51, 22, 51)";
  like.addEventListener("click", (e) => {
    e.target.classList.toggle("fa-thumbs-down");
  });
};
