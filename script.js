// [최종 점검] 파일명에 공백을 아버님이 올리신 사진과 똑같이 맞췄습니다.
const musicData = [
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        category: 'ballad', 
        mood: 'longing',    
        src: '퇴근 길 버스 창가에1.mp3' // 공백 꼼꼼히 확인 완료
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        category: 'trot', 
        mood: 'longing', 
        src: '퇴근 길 버스 창가에2.mp3' // 공백 꼼꼼히 확인 완료
    }
];

const audio = new Audio();

// 노래 목록 표시
function displayMusic(data) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) {
        console.error("오류: index.html에 music-grid라는 이름의 칸이 없습니다.");
        return;
    }
    
    musicGrid.innerHTML = data.map((song) => `
        <div class="music-card" onclick="openPlayerById(${song.id})" style="cursor:pointer; border:1px solid #ddd; padding:15px; margin:10px; border-radius:10px;">
            <div class="music-info">
                <span style="color:#fbbf24; font-size:0.8rem;">${song.category === 'ballad' ? '발라드' : '트로트'}</span>
                <h4 style="margin:5px 0;">${song.title}</h4>
                <p style="font-size:0.9rem; color:#666;">${song.artist}</p>
                <button class="btn btn-primary">재생하기</button>
            </div>
        </div>
    `).join('');
}

// 분류 기능 (버튼 클릭 시 실행)
function filterMusic(type) {
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        const filtered = musicData.filter(song => song.category === type || song.mood === type);
        displayMusic(filtered);
    }
}

// 재생 기능
function openPlayerById(id) {
    const song = musicData.find(s => s.id === id);
    if (!song) return;
    
    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    if(modal && info) {
        info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
        modal.style.display = 'block';
        audio.src = encodeURI(song.src); // 한글 파일명 오류 방지
        audio.play();
    }
}

function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    audio.pause();
}

// 시작하자마자 목록 보여주기
window.onload = function() {
    displayMusic(musicData);
};
