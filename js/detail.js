// title
document.getElementById('detail-title').innerText =
    localStorage.getItem('title');
// like count
// document.querySelector('#main-info-likes p').innerText
// rate => 10점 만점에서 5점 만점으로 계산
// document.querySelector("#main-info-rate h3").innerText =
//   localStorage.getItem("rate") / 2;
// overview
document.querySelector('.detail-overview').innerText =
    localStorage.getItem('overview');
// // poster
// document.querySelector("#main-poster img").src = localStorage.getItem("backPoster");
document.getElementById(
    'background-img'
).style.background = `url(${localStorage.getItem('backPoster')})`;

document.querySelector(
    '#comment-container h3'
).innerText = `${localStorage.getItem('title')}에 대한 한줄평을 작성해주세요!`;
document
    .getElementById('write-comment-icon-container')
    .setAttribute('_id', localStorage.getItem('id'));

document.getElementById('comment-input').placeholder = `${localStorage.getItem(
    'title'
)} 재미있게 보셨나요? 영화의 어떤 점이 좋았는지 이야기해주세요.`;

document.getElementById('main-back').addEventListener('click', () => {
    location.href = './index.html';
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDJlNzU1ZWIyZTBiMjYwNGM5ZGMzZTRhMjQ4ZTFlZCIsInN1YiI6IjY0MDQwNGI4ZTYxZTZkMDBjNjU4MThmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Lqn-AW0hg003HruAB1mhPIGh2W2-dX1buHHUDiN6TNs',
    },
};

const findVideoKey = async () => {
    let videoKey;
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${localStorage.getItem(
            'id'
        )}/videos?language=en-US`,
        options
    );
    const data = await res.json();
    videoKey = data.results[data.results.length - 1]['key'];
    return videoKey;
};

var player;
async function onYouTubeIframeAPIReady() {
    const videoKey = await findVideoKey();
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: videoKey,
        playerVars: {
            autoplay: 0,
            controls: 1,
            loop: 0,
            mute: 0,
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
            fs: 1,
            cc_load_policy: 0,
            disablekb: 0,
            rel: 0,
            color: 'white',
        },
        events: {
            // onReady: onPlayerReady,
        },
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

function stopVideo() {
    player.stopVideo();
}
