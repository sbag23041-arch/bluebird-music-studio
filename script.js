// 1. 노래 데이터 (영문 속성명을 사용하여 브라우저가 인식하게 함)
const musicData = [
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        category: 'ballad', // 발라드 버튼용
        mood: 'longing',    // 그리움 버튼용
        src: '퇴근 길 버스 창가에 1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        category: category: 'trot',   // 트로트 버튼용
        mood: 'longing',    // 그리움 버튼용
        src: '퇴근 길 버스 창가에 2.mp3' 
    }
];

const audio = new Audio();

// 2. 노래 목록을 화면에 그리는 함수
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

// 3. 분류(필터) 기능 - 버튼을 눌렀을 때 실행됩니다
function filterMusic(type) {
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        // category(장르)나 mood(분위기)가 클릭한 type과 일치하는 것만 골라냄
        const filtered = musicData.filter(song => song.category === type || song.mood === type);
        displayMusic(filtered);
    }
}

// 4. 노래 재생 모달 열기
function openPlayerById(id) {
    const song = musicData.find(s => s.id === id);
    if (!song) return;

    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
    modal.style.display = 'block';
    
    audio.src = song.src;
    audio.play().catch(e => console.log("재생 오류:", e));
}

// 5. 모달 닫기
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    audio.pause();
}

// 페이지가 처음 열릴 때 전체 목록을 보여줍니다
window.onload = () => displayMusic(musicData);
