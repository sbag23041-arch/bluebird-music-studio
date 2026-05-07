// 1. 노래 정보 (아버님의 실제 파일명과 100% 일치시켰습니다)
const musicList = [
    { 
        title: '퇴근 길 버스 창가에 1', 
        src: '퇴근 길 버스 창가에1.mp3' 
    },
    { 
        title: '퇴근 길 버스 창가에 2', 
        src: '퇴근 길 버스 창가에2.mp3' 
    }
];

const audioPlayer = new Audio();

// 2. 페이지가 열리자마자 노래 목록을 화면에 바로 뿌려줍니다.
window.onload = function() {
    const grid = document.getElementById('music-grid');
    if(!grid) return;

    grid.innerHTML = musicList.map((song, index) => `
        <div style="border: 1px solid #fbbf24; padding: 20px; margin: 10px; border-radius: 10px; text-align: center; background: rgba(255,255,255,0.05);">
            <h4 style="color: white; margin-bottom: 15px;">${song.title}</h4>
            <button onclick="playSong('${song.src}', '${song.title}')" style="background: #fbbf24; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                ▶ 노래 듣기
            </button>
        </div>
    `).join('');
};

// 3. 버튼을 누르면 노래가 즉시 나옵니다.
function playSong(file, title) {
    const modal = document.getElementById('playerModal');
    const info = document.getElementById('player-info');
    
    if(modal && info) {
        info.innerHTML = `<h3 style="color:white;">${title}</h3><p style="color:#fbbf24;">재생 중...</p>`;
        modal.style.display = 'block';
        audioPlayer.src = encodeURI(file); // 한글 파일명 오류 방지
        audioPlayer.play();
    }
}

// 4. 창 닫기
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    audioPlayer.pause();
}
