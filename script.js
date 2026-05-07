// 음악 데이터 
const musicData = [
    { 
       id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        category: 'ballad', // 발라드
        mood: 'longing',    // 삶
        src: '퇴근 길 버스 창가에1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        category: 'ballad', // 발라드
        mood: 'longing',    // 삶
        src: '퇴근 길 버스 창가에2.mp3' 
    }
];

// 2. 노래를 화면에 그려주는 함수 (수정됨)
function displayMusic(data) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) return;
    
    musicGrid.innerHTML = data.map((song) => `
        <div class="music-card" onclick="openPlayerById(${song.id})">
            <div class="music-info">
                <span style="font-size: 0.8rem; color: #fbbf24;">${song.category === 'ballad' ? '발라드' : '트로트'}</span>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <button class="btn btn-primary" style="margin-top:10px;">재생하기</button>
            </div>
        </div>
    `).join('');
}

// 3. 버튼을 눌렀을 때 필터링하는 함수 (새로 추가)
function filterMusic(type) {
    if (type === 'all') {
        displayMusic(musicData);
    } else {
        const filtered = musicData.filter(song => song.category === type || song.mood === type);
        displayMusic(filtered);
    }
}

// 4. 노래 재생 함수 (ID로 찾기)
function openPlayerById(id) {
    const song = musicData.find(s => s.id === id);
    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
    modal.style.display = 'block';
    
    audio.src = song.src;
    playAudio();
}
    }
];

let currentTrack = 0;
let isPlaying = false;
let audio = new Audio();

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    displayMusic(musicData);
});

// 음악 목록 표시 함수
function displayMusic(data) {
    const musicGrid = document.getElementById('music-grid');
    if (!musicGrid) return;
    
    musicGrid.innerHTML = data.map((song, index) => `
        <div class="music-card" onclick="openPlayer(${index})">
            <div class="music-info">
                <h4>${song.title}</h4>
                <p>${song.artist} | ${song.genre}</p>
                <button class="btn btn-primary" style="margin-top:10px;">재생하기</button>
            </div>
        </div>
    `).join('');
}

// 플레이어 열기 및 재생
function openPlayer(index) {
    currentTrack = index;
    const song = musicData[index];
    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    info.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
    modal.style.display = 'block';
    
    audio.src = song.src;
    playAudio();
}

function playAudio() {
    audio.play();
    isPlaying = true;
    document.getElementById('playBtn').innerText = '일시정지';
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('playBtn').innerText = '재생';
    } else {
        audio.play();
        isPlaying = true;
        document.getElementById('playBtn').innerText = '일시정지';
    }
}

function closePlayer() {
    audio.pause();
    document.getElementById('playerModal').style.display = 'none';
}

// 스크롤 함수
function scrollToMusic() {
    const musicSection = document.getElementById('music');
    if (musicSection) {
        musicSection.scrollIntoView({ behavior: 'smooth' });
    }
}
