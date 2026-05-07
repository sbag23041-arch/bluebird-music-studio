// 1. 노래 데이터 설정 (영문 속성명을 사용해야 작동합니다)
const musicData = [
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        category: 'ballad', 
        mood: 'longing',    
        src: '퇴근 길 버스 창가에1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        category: 'ballad', 
        mood: 'longing', 
        src: '퇴근 길 버스 창가에2.mp3' 
    }
];

const audio = new Audio();

// 2. 화면에 노래 목록을 그리는 함수
function displayMusic(data) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) return;
    
    musicGrid.innerHTML = data.map((song) => `
        <div class="music-card" onclick="openPlayerById(${song.id})">
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

// 3. 분류 기능
function filterMusic(type) {
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        const filtered = musicData.filter(song => song.category === type || song.mood === type);
        displayMusic(filtered);
    }
}

// 4. 노래 재생 창 열기
function openPlayerById(id) {
    const song = musicData.find(s => s.id === id);
    if (!song) return;

    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
    modal.style.display = 'block';
    
    audio.src = song.src;
    audio.play();
}

// 5. 창 닫기
function closePlayer() {
    const modal = document.getElementById('playerModal');
    if (modal) modal.style.display = 'none';
    audio.pause();
}

// 재생/일시정지 버튼용
function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// 페이지 로드 시 실행
window.onload = () => displayMusic(musicData);
