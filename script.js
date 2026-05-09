// ===== 하이브리드 버전: 카테고리 필터 + 실제 음악 파일 =====

// 음악 데이터 (실제 파일 + 테스트 데이터)
const musicData = [
    // 발라드 (Ballad) - 4곡
    { 
        id: 1, 
        title: '퇴근 길 버스 창가에 1', 
        artist: '파랑새', 
        genre: '발라드', 
        category: 'ballad',
        src: '퇴근 길 버스 창가에1.mp3',  // ← 실제 파일!
        emoji: '🎵' 
    },
    { 
        id: 2, 
        title: '그리운 마음', 
        artist: '파랑새', 
        genre: '발라드', 
        category: 'ballad',
        src: '',  // ← 테스트 데이터
        emoji: '💔' 
    },
    { 
        id: 3, 
        title: '밤하늘의 별', 
        artist: '파랑새', 
        genre: '발라드', 
        category: 'ballad',
        src: '',
        emoji: '🌙' 
    },
    { 
        id: 4, 
        title: '사랑이 남긴 것', 
        artist: '파랑새', 
        genre: '발라드', 
        category: 'ballad',
        src: '',
        emoji: '🎼' 
    },

    // 트로트 (Trot) - 4곡
    { 
        id: 5, 
        title: '퇴근 길 버스 창가에 2', 
        artist: '파랑새', 
        genre: '트로트', 
        category: 'trot',
        src: '퇴근 길 버스 창가에2.mp3',  // ← 실제 파일!
        emoji: '🎤' 
    },
    { 
        id: 6, 
        title: '추억의 거리', 
        artist: '파랑새', 
        genre: '트로트', 
        category: 'trot',
        src: '',
        emoji: '📖' 
    },
    { 
        id: 7, 
        title: '봄날의 추억', 
        artist: '파랑새', 
        genre: '트로트', 
        category: 'trot',
        src: '',
        emoji: '🌸' 
    },
    { 
        id: 8, 
        title: '인생길 함께', 
        artist: '파랑새', 
        genre: '트로트', 
        category: 'trot',
        src: '',
        emoji: '🛤️' 
    },

    // 그리움 (Longing) - 4곡
    { 
        id: 9, 
        title: '그리움의 편지', 
        artist: '파랑새', 
        genre: '그리움', 
        category: 'longing',
        src: '',
        emoji: '💌' 
    },
    { 
        id: 10, 
        title: '먼 곳에서', 
        artist: '파랑새', 
        genre: '그리움', 
        category: 'longing',
        src: '',
        emoji: '🌍' 
    },
    { 
        id: 11, 
        title: '그 사람 생각', 
        artist: '파랑새', 
        genre: '그리움', 
        category: 'longing',
        src: '',
        emoji: '💭' 
    },
    { 
        id: 12, 
        title: '돌아올 날을 기다리며', 
        artist: '파랑새', 
        genre: '그리움', 
        category: 'longing',
        src: '',
        emoji: '⏳' 
    },

    // 이별 (Farewell) - 4곡
    { 
        id: 13, 
        title: '달빛 아래', 
        artist: '파랑새', 
        genre: '이별', 
        category: 'farewell',
        src: '',
        emoji: '🎸' 
    },
    { 
        id: 14, 
        title: '마지막 인사', 
        artist: '파랑새', 
        genre: '이별', 
        category: 'farewell',
        src: '',
        emoji: '👋' 
    },
    { 
        id: 15, 
        title: '그 시절의 노래', 
        artist: '파랑새', 
        genre: '이별', 
        category: 'farewell',
        src: '',
        emoji: '🎹' 
    },
    { 
        id: 16, 
        title: '안녕, 그리고 감사해', 
        artist: '파랑새', 
        genre: '이별', 
        category: 'farewell',
        src: '',
        emoji: '🌅' 
    }
];

let currentTrack = 0;
let isPlaying = false;
let favorites = [];
const audioPlayer = new Audio();

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('페이지 로드됨');
    initializeEventListeners();
    loadFavorites();
    renderMusicGrid('all'); // 초기 로드: 모든 음악 표시
});

// 이벤트 리스너 초기화
function initializeEventListeners() {
    console.log('이벤트 리스너 초기화 중...');
    
    // 카테고리 필터 버튼
    const filterBtns = document.querySelectorAll('.filter-btn');
    console.log('필터 버튼 개수:', filterBtns.length);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('필터 클릭:', this.dataset.filter);
            
            // 모든 버튼에서 active 클래스 제거
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 필터링 실행
            const filterValue = this.dataset.filter;
            filterMusic(filterValue);
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

// 음악 그리드 렌더링
function renderMusicGrid(category = 'all') {
    console.log('음악 그리드 렌더링:', category);
    filterMusic(category);
}

// 음악 필터링
function filterMusic(category) {
    console.log('필터링 실행:', category);
    
    const cards = document.querySelectorAll('.music-card');
    console.log('음악 카드 개수:', cards.length);
    
    let visibleCount = 0;
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            // 애니메이션 효과
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
            
            visibleCount++;
        } else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    console.log('표시된 카드:', visibleCount);
}

// 음악 재생
function playMusic(id) {
    console.log('음악 재생:', id);
    
    currentTrack = id - 1;
    const music = musicData[currentTrack];
    
    if (!music) {
        console.error('음악 데이터를 찾을 수 없습니다:', id);
        return;
    }
    
    // 플레이어 정보 업데이트
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    
    if (playerTitle) playerTitle.textContent = music.title;
    if (playerArtist) playerArtist.textContent = music.artist;
    
    // 모달 표시
    const modal = document.getElementById('playerModal');
    if (modal) {
        modal.style.display = 'block';
    }
    
    // 실제 파일이 있으면 재생
    if (music.src) {
        audioPlayer.src = encodeURI(music.src);  // 한글 파일명 지원
        audioPlayer.play();
        isPlaying = true;
        console.log('실제 음악 파일 재생:', music.src);
    } else {
        console.log('테스트 데이터 (파일 없음):', music.title);
        isPlaying = true;
    }
    
    updatePlayButton();
    simulatePlayback();
}

// 플레이어 닫기
function closePlayer() {
    const modal = document.getElementById('playerModal');
    if (modal) {
        modal.style.display = 'none';
    }
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
}

// 재생/일시정지 토글
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();
    
    if (isPlaying) {
        audioPlayer.play();
        simulatePlayback();
    } else {
        audioPlayer.pause();
    }
}

// 재생 버튼 업데이트
function updatePlayButton() {
    const btn = document.getElementById('playPauseBtn');
    if (btn) {
        btn.textContent = isPlaying ? '⏸' : '▶';
    }
}

// 재생 시뮬레이션
function simulatePlayback() {
    if (!isPlaying) return;
    
    const progress = document.getElementById('progress');
    const currentTime = document.getElementById('currentTime');
    
    if (!progress || !currentTime) return;
    
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
    
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    
    if (playerTitle) playerTitle.textContent = music.title;
    if (playerArtist) playerArtist.textContent = music.artist;
    
    if (music.src) {
        audioPlayer.src = encodeURI(music.src);
        audioPlayer.play();
    }
    
    if (isPlaying) {
        simulatePlayback();
    }
}

// 이전 트랙
function previousTrack() {
    currentTrack = (currentTrack - 1 + musicData.length) % musicData.length;
    const music = musicData[currentTrack];
    
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    
    if (playerTitle) playerTitle.textContent = music.title;
    if (playerArtist) playerArtist.textContent = music.artist;
    
    if (music.src) {
        audioPlayer.src = encodeURI(music.src);
        audioPlayer.play();
    }
    
    if (isPlaying) {
        simulatePlayback();
    }
}

// 음악 다운로드
function downloadMusic(id) {
    const music = musicData[id - 1];
    if (music) {
        if (music.src) {
            alert(`"${music.title}" 다운로드 준비 중입니다.\n\n실제 구현 시 음악 파일이 다운로드됩니다.`);
        } else {
            alert(`"${music.title}"은 테스트 데이터입니다.\n\n실제 음악 파일을 추가하면 다운로드할 수 있습니다.`);
        }
    }
}

// 현재 음악 다운로드
function downloadCurrentMusic() {
    const music = musicData[currentTrack];
    if (music) {
        if (music.src) {
            alert(`"${music.title}" 다운로드 준비 중입니다.\n\n실제 구현 시 음악 파일이 다운로드됩니다.`);
        } else {
            alert(`"${music.title}"은 테스트 데이터입니다.\n\n실제 음악 파일을 추가하면 다운로드할 수 있습니다.`);
        }
    }
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
    if (musicSection) {
        musicSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    const modal = document.getElementById('playerModal');
    if (modal && event.target === modal) {
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
    if (modal && modal.style.display === 'block') {
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

// 햄버거 메뉴 (모바일)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

console.log('Script.js 로드 완료! (하이브리드 버전)');
