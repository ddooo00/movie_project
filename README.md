# 팀스파르타 React 6기 10조
https://movie-app-2-ob8s-lgd65hgli-kimhwanhoon.vercel.app/

## 조원 소개

| 구분  | 이름 |
| --------- |:----------:|
| 조장      | 김환훈     |
| 조원      | 이소영     |
| 조원      | 최다연     |
| 조원      | 한희       |
| 조원      | 황대성     |

## 앱 소개
> "BEST 영화 앱을 만들자!"

위 목표를 가지고 정성스럽게 만들어 봤습니다. <br>
<br>
모든 조원이 HTML과, CSS, JavaScript 그리고 Github를 사용하여 목표를 달성하려 노력했습니다.
### TMDB의 API를 사용하였으며, fetch주소는 다음과 같이 사용하였습니다.
#### 1. 기본 정보들 받기
```javascript
fetch('https://api.themoviedb.org/3/configuration')
```
#### 2. 인기 영화 목록 받기
```javascript
fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
```
#### 3. 영화 포스터, 백드롭 등 받기
```javascript
fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`)
```
#### 4. 영화 상세정보 받기
```javascript
fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
```

## 앱 기능
메인 페이지의 기능은 다음과 같습니다.
1. 메인에서 영화 데이터를 받아와서 랜덤으로 영화를 소개합니다.<br>
2. `backdrop`을 받아와서 메인 배경화면으로 표시합니다.<br>
3. 같은 영화의 제목, 내용, 평점 등을 가져와서 메인에 표시합니다. <br>
4. 처음 로드시 인기영화 `page=1`을 로드하여 오른쪽에 카드형식으로 표현합니다.<br>
5. 카드 안에 왼쪽, 오른쪽 화살표 버튼을 누르면 카드가 이동합니다. <br>
6. 카드 클릭시 상세 페이지로 이동합니다. <br>
7. 메인 오른쪽 상단의 랜덤(shuffle)버튼을 누르면, 영화 목록을 `page 1 - 50`까지 랜덤하게 가져옵니다. 즉, 메인의 영화 목록들이 전체적으로 바뀌게 됩니다.
8. 메인 오른쪽 상단의 검색 버튼을 누르면 검색창 `input`이 나오게 되고, 검색하여 `Enter`키를 눌러 검색할 수 있으며 `Escape` 키를 눌러 종료하며 다시 결과를 초기화 시킬 수 있습니다.
9. 전반적으로 조금씩 마이너한 에니메이션을 넣었습니다. 가장 많이 사용한 애니메이션 효과는 `transition: ease-in-out 0.25s;`입니다.<br>
10. 카드를 클릭했을 때 상세페이지로 이동합니다. 이동하기 바로 직전에 메인 화면을 어둡게 하고, 로딩하는 효과를 추가해서 자연스러운 화면전환을 유도하는 UX를 구현했습니다. <br>
11. 카드를 클릭하여 상세페이지에 이동했을 때, 해당 영화의 정보(제목, 스토리 등)를 `localStorage`에 저장하고, 상세페이지에서 그 값을 불러와 구현하였습니다.<br>
12. 상세페이지에 Youtube의 iframe API를 사용하여 동영상을 불러오게끔 구현했습니다.<br>
13. 상세페이지 오른쪽에 저희 조원 소개와 함께 한줄평을 넣었습니다. 한줄평 또한 `localStorage`를 사용하여 불러오고, 저장되며, 비밀번호 기능과 함께 수정과 삭제도 가능합니다. <br>
14. 관람평쓰기 버튼을 눌렀을 때 바로 반응하지 않고 간단한 애니메이션을 구현하여 버튼이 왼쪽에서 오른쪽으로 다 이동했을 때, 기능이 작동하도록 구현했습니다. 버튼을 클릭한 순간과 클릭이 끝난 순간을 캐치하여 둘을 뺀 값을 600ms로 설정하여 이벤트를 구현했습니다.

## 마무리
저희 팀원들 고생 많으셨습니다. 그리고 저희가 한 주 동안 많은 시간 써가며 만든 사이트 봐주셔서 진심으로 감사드립니다.
<br>
<br>
#####  작성일: 2023. 6. 9 | 작성자: 팀장 김환훈
