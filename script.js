// 음악 데이터
const musicData = [
    { id: 1, title: '퇴근 길 버스 창가에1', artist: '파랑새', genre: 'ballad', category: 'ballad' },
    { id: 2, title: '퇴근 길 버스 창가에2', artist: '파랑새', genre: 'trot', category: 'trot' },
    { id: 3, title: '달빛 아래', artist: '파랑새', genre: 'korean-trot', category: 'korean-trot' },
    { id: 4, title: '그 시절의 노래', artist: '파랑새', genre: '7080음악', category: '70s-80s' },
    { id: 5, title: '밤하늘의 별', artist: '파랑새', genre: 'ballad', category: 'ballad' },
    { id: 6, title: '봄날의 추억', artist: '파랑새', genre: 'trot', category: 'trot' }
];

let currentTrack = 0;
let isPlaying = false;
let favorites = [];

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadFavorites();
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 카테고리 필터
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMusic(this.dataset.filter);
        });
    });

    // 네비게이션 링크
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 스크롤 시 네비게이션 업데이트
    window.addEventListener('scroll', updateActiveNavLink);
}

// 음악 필터링
function filterMusic(category) {
    const cards = document.querySelectorAll('.music-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 음악 재생
function playMusic(id) {
    currentTrack = id - 1;
    const music = musicData[currentTrack];
    
    document.getElementById('playerTitle').textContent = music.title;
    document.getElementById('playerArtist').textContent = music.artist;
    
    const modal = document.getElementById('playerModal');
    modal.style.display = 'block';
    
    isPlaying = true;
    updatePlayButton();
    simulatePlayback();
}

// 플레이어 닫기
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    isPlaying = false;
    updatePlayButton();
}

// 재생/일시정지 토글
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();
    if (isPlaying) {
        simulatePlayback();
    }
}

// 재생 버튼 업데이트
function updatePlayButton() {
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = isPlaying ? '⏸' : '▶';
}

// 재생 시뮬레이션
function simulatePlayback() {
    if (!isPlaying) return;
    
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    let time = 0;
    const duration = 180; // 3분
    
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        time += 1;
        if (time > duration) {
            time = 0;
            nextTrack();
            clearInterval(interval);
            return;
        }
        
        const percentage = (time / duration) * 100;
        progress.style.width = percentage + '%';
        
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// 다음 트랙
function nextTrack() {
    currentTrack = (currentTrack + 1) % musicData.length;
    const music = musicData[currentTrack];
    document.getElementById('playerTitle').textContent = music.title;
    document.getElementById('playerArtist').textContent = music.artist;
    
    if (isPlaying) {
        simulatePlayback();
    }
}

// 이전 트랙
function previousTrack() {
    currentTrack = (currentTrack - 1 + musicData.length) % musicData.length;
    const music = musicData[currentTrack];
    document.getElementById('playerTitle').textContent = music.title;
    document.getElementById('playerArtist').textContent = music.artist;
    
    if (isPlaying) {
        simulatePlayback();
    }
}

// 음악 다운로드
function downloadMusic(id) {
    const music = musicData[id - 1];
    alert(`"${music.title}" 다운로드 준비 중입니다.\n\n실제 구현 시 음악 파일이 다운로드됩니다.`);
}

// 현재 음악 다운로드
function downloadCurrentMusic() {
    const music = musicData[currentTrack];
    alert(`"${music.title}" 다운로드 준비 중입니다.\n\n실제 구현 시 음악 파일이 다운로드됩니다.`);
}

// 즐겨찾기 추가
function addToFavorite(id) {
    if (!favorites.includes(id)) {
        favorites.push(id);
        saveFavorites();
        alert('즐겨찾기에 추가되었습니다!');
    } else {
        favorites = favorites.filter(fav => fav !== id);
        saveFavorites();
        alert('즐겨찾기에서 제거되었습니다!');
    }
}

// 즐겨찾기 저장
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// 즐겨찾기 로드
function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        favorites = JSON.parse(saved);
    }
}

// 음악 공유
function shareMusic() {
    const music = musicData[currentTrack];
    const text = `"${music.title}" - ${music.artist}\n\n파랑새 뮤직 스튜디오에서 감상하세요!\n\nAI와 창의성이 만드는 음악 | 7080세대 공감`;
    
    if (navigator.share) {
        navigator.share({
            title: music.title,
            text: text
        });
    } else {
        alert('공유 기능을 사용할 수 없습니다.\n\n' + text);
    }
}

// 스크롤 시 네비게이션 링크 활성화
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// 스크롤 함수
function scrollToMusic() {
    const musicSection = document.getElementById('music');
    musicSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    const modal = document.getElementById('playerModal');
    if (event.target === modal) {
        closePlayer();
    }
});

// 연락처 폼 제출
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('메시지가 전송되었습니다!\n파랑새가 곧 연락드리겠습니다.');
            this.reset();
        });
    }
});

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('playerModal');
    if (modal.style.display === 'block') {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowRight') {
            nextTrack();
        } else if (e.code === 'ArrowLeft') {
            previousTrack();
        } else if (e.code === 'Escape') {
            closePlayer();
        }
    }
});
