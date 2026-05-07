// 1. 노래 데이터 설정 
const musicData = [
    { 
        id: 1, 
        title: '퇴근길버스창가에1', 
        artist: '파랑새', 
        category: 'ballad', // '발라드' 버튼과 연결
        mood: 'longing',    // '그리움/이별' 버튼과 연결
        src: '퇴근길버스창가에1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근길버스창가에 2', 
        artist: '파랑새', 
        category: 'trot',   // '트로트' 버튼과 연결
        mood: 'longing',    // '그리움/이별' 버튼과 연결
        src: '퇴근길버스창가에2.mp3' 
    }
];

const audio = new Audio();

// 2. 노래 목록 표시 함수 (기능이 멈추지 않도록 표준 영문 사용)
function displayMusic(data) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) return;
    
    musicGrid.innerHTML = data.map((song) => `
        <div class="music-card" onclick="openPlayerById(${song.id})" style="cursor:pointer;">
            <div class="music-info">
                <span style="font-size: 0.8rem; color: #fbbf24;">
                    ${song.category === 'ballad' ? '7080 발라드' : '7080 트로트'}
                </span>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <button class="btn btn-primary" style="margin-top:10px;">재생하기</button>
            </div>
        </div>
    `).join('');
}

// 3. 분류(필터) 기능 (index.html의 버튼과 직접 연결됨)
function filterMusic(type) {
    console.log("선택된 분류:", type); // 작동 확인용 기록
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        const filtered = musicData.filter(song => song.category === type || song.mood === type);
        displayMusic(filtered);
    }
}

// 4. 노래 재생창 열기
function openPlayerById(id) {
    const song = musicData.find(s => s.id === id);
    if (!song) return;

    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
    modal.style.display = 'block';
    
    audio.src = song.src;
    audio.play().catch(e => console.error("재생 실패:", e));
}

// 5. 창 닫기 및 기타 제어
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    audio.pause();
}

function togglePlay() {
    if (audio.paused) audio.play();
    else audio.pause();
}

// 페이지 로딩 완료 시 목록 출력
window.onload = () => {
    displayMusic(musicData);
};
