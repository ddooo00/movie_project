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
    //   document.querySelector(".card").remove();
      response.results.forEach((movie) => {
        let movie_id = movie["id"]
        let movie_title = movie["title"]
        let movie_overview = movie["overview"]
        let poster = movie["poster_path"];
        let movie_vote_average = movie["vote_average"]
        
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card");

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
        img.classList.add("card-img-top");
        img.alt = "...";
        //이미지 클릭시 id 알림창-호출이 아닌 선언을 해야함
        img.onclick = function () {
            clickId(id);
        };
        console.log(movie_id)
      });
    })

