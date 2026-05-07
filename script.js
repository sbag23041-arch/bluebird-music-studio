// 음악 데이터 
const musicData = [
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        genre: '7080 발라드', 
        category: 'ballad',
        src: '퇴근 길 버스 창가에1.mp3' 
    },
    { 
        id: 2, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        genre: '7080 트로트', 
        category: 'trot',
        src: '퇴근 길 버스 창가에2.mp3' 
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
