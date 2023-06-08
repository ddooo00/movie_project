// start와 later 전역변수 지정. 밑에 자세한 설명
let start; let later;
// 관람평쓰기 버튼 변수 지정
const submitBtn = document.getElementById('write-comment-icon-container');
// local Storage에서 해당 영화의 id를 가져와 다음 MOVIE_ID에 지정
const MOVIE_ID = localStorage.getItem('id')
// 영화 한줄평 목록을 변수 선언
let commentListArr;
// localStorage에 이미 등록된 한줄평이 있으면, 가져오고 아니면 새로 생성하기
if (localStorage.getItem(MOVIE_ID)) {
    commentListArr = JSON.parse(localStorage.getItem(MOVIE_ID))
} else {
    commentListArr = [];
}
// 처음에 localStorage에서 댓글 정보들 가져오기
document.addEventListener('DOMContentLoaded', () => loadComment())
/**
 * 코멘트 로딩함수
 * @return comment
 */
const loadComment = () => {
    // 댓글 다는 것을 세팅해주기 위해 부모 요소를 변수 등록
    const commentsListDiv = document.querySelector('.comments-list');
    // commentListArr에서 map 메소드를 사용하여 저장된 댓글들을 html로 만들어 냄
    commentsListDiv.innerHTML = commentListArr.map(el => {
        return `
        <div class="comment" _id="${el.comment_id}">
            <span class="writer">${el.commenter}</span>
            <input type="text" name="comment-list" class="comment-value" readonly value="${el.comment_value}"/>
            <div class="comment-list-container">
                <div class="comment-time">${el.time}</div>
                <img class="edit-button" src="./img/edit.png" />
                <img class="delete-button" src="./img/delete.png" />
            </div>
        </div>
        `;
    }).join('');
}

// 관람평 쓰기를 누르는 순간의 시간 캐치하기
submitBtn.addEventListener("mousedown", (e) => {
  start = Date.now();
});

// 관람평 쓰기에서 마우스를 떼는 순간의 시간 캐치하기
submitBtn.addEventListener("mouseup", (e) => {
  later = Date.now();
  const D = new Date;
  const TIME = String(`${D.getFullYear()}.${String(D.getMonth()).padStart(2, 0)}.${String(D.getDate()).padStart(2, 0)}\n${String(D.getHours()).padStart(2, 0)}:${String(D.getMinutes()).padStart(2, 0)}`)
  // 마우스를 클릭을 올린 시간 - 처음 클릭한 시간을 계산한 값이 600보다 크면
  // 즉, 클릭을 600ms 이상 하고 있다가 떼었을때 다음 함수를 실행
  if (later - start > 600) {
    // 댓글 배열에 다음의 내용을 추가, comment_id는 현재의 시간 값을 생성하여 고유 댓글 번호를 줌.
    let username = prompt('이름을 입력하세요.')
    let password = prompt('비밀번호를 입력하세요.')
    if (username === null || password === null) {
        alert('취소하였습니다.')
        return
    } else if (!username) {
        username = '익명'
    }
    commentListArr.push(
        {
            'commenter': username,
            'comment_id': D.getTime(),
            'password': password,
            'comment_value': document.getElementById('comment-input').value,
            'time': TIME,
        }
    )
    alert('한줄평이 성공적으로 등록되었습니다.')
    localStorage.setItem(MOVIE_ID, JSON.stringify(commentListArr))
    location.reload()
    }

});

/**
 * 수정하기
 * @returns 수정하기이벤트
 * @param e 클릭했을때 이벤트 노드
 */
const editComment = (e) => {
    const commentDiv = e.parentNode.parentNode
    const commentsOnStorage = JSON.parse(localStorage.getItem(MOVIE_ID));
    let cancelSwitch = Boolean;
    commentsOnStorage.forEach(element => {
        if (commentDiv.getAttribute('_id') === String(element.comment_id)) {
            const passwordTry = prompt('패스워드를 입력해주세요.')
            if (passwordTry === element.password) {
                cancelSwitch = true;
                if (confirm(`다음은 수정하려는 한줄평이 맞습니까?\n\n작성자: ${element.commenter}\n내용: ${element.comment_value}\n작성일: ${element.time.replace('\n', ' ')}`)) {
                    element.comment_value = prompt(`\n새로운 한줄평을 입력해주세요.`)
                } else {
                    cancelSwitch = false;
                    alert('취소되었습니다.')
                }
            } else {
                cancelSwitch = false;
                alert('비밀번호가 틀렸습니다.\n다시 시도해주세요.')
            }
        }
    });
    if (cancelSwitch) {
        // 위에서 수정한 정보를 다시 localStorage에 저장
        localStorage.setItem(MOVIE_ID, JSON.stringify(commentsOnStorage))
        alert('저장되었습니다.')
        location.reload();
    }
}
/**
 * 삭제하기
 * @returns 삭제하기이벤트
 * @param e 클릭했을때 이벤트 노드
 */
const deleteComment = (e) => {
    const commentDiv = e.parentNode.parentNode
    const commentsOnStorage = JSON.parse(localStorage.getItem(MOVIE_ID));
    let cancelSwitch = Boolean;
    let deleteTargetIndex;
    for (let i = 0; i < commentsOnStorage.length; i++) {
        if (commentDiv.getAttribute('_id') === String(commentsOnStorage[i].comment_id)) {
            const passwordTry = prompt('패스워드를 입력해주세요.')
            if (passwordTry === commentsOnStorage[i].password) {
                cancelSwitch = true;
                if (confirm(`다음은 삭제하려는 한줄평이 맞습니까?\n\n작성자: ${commentsOnStorage[i].commenter}\n내용: ${commentsOnStorage[i].comment_value}\n작성일: ${commentsOnStorage[i].time.replace('\n', ' ')}`)) {
                    deleteTargetIndex = i;
                    alert('삭제되었습니다.')
                } else {
                    alert('취소되었습니다.')
                    cancelSwitch = false;
                }
            } else {
                cancelSwitch = false;
                alert('비밀번호가 틀렸습니다.\n다시 시도해주세요.')
            }
        }
    }
    if (cancelSwitch) {
        commentsOnStorage.splice(deleteTargetIndex, 1);
        // 위에서 수정한 정보를 다시 localStorage에 저장
        localStorage.setItem(MOVIE_ID, JSON.stringify(commentsOnStorage))
        location.reload();
    };
};

// 수정하기 버튼 눌렀을 때
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const target = e.target
        editComment(target)
    }
})
// 삭제하기 버튼 눌렀을 때
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const target = e.target
        deleteComment(target)
    }
})