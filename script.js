// 1. 노래 데이터 설정
const musicData = [
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        category: 'ballad', // 분류용 영문 태그
        mood: 'longing',    // 분위기용 영문 태그
        src: '퇴근 길 버스 창가에1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        category: 'ballad', // 분류용 영문 태그
        mood: 'longing', 
        src: '퇴근 길 버스 창가에2.mp3' 
    }
];

const audio = new Audio();

// 2. 노래를 화면에 그려주는 기능
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

// 3. 분류 버튼 기능
function filterMusic(type) {
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        // category나 mood가 선택한 타입과 일치하는 노래만 골라냅니다
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

// 5. 창 닫기 및 정지
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    audio.pause();
}

// 처음 페이지 열릴 때 전체 노래 보여주기
window.onload = () => displayMusic(musicData);
