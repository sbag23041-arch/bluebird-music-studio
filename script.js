window.addEventListener('load', () => {
    const uploadInput = document.getElementById('music-upload');
    const audioPlayer = document.getElementById('audio-player');
    const songTitle = document.getElementById('song-title');
    const record = document.getElementById('record');

    // 1. 음악 업로드 및 재생 로직
    if (uploadInput && audioPlayer) {
        uploadInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                // 파일 연결
                const fileURL = URL.createObjectURL(file);
                audioPlayer.src = fileURL;
                
                // 제목 표시
                if (songTitle) songTitle.innerText = file.name;
                
                // 로드 및 재생
                audioPlayer.load();
                audioPlayer.play().catch(err => {
                    console.log("재생 버튼을 직접 눌러주세요.");
                });
            }
        };
    }

    // 2. 레코드판 회전 제어
    if (audioPlayer && record) {
        audioPlayer.onplay = () => { 
            record.style.animationPlayState = "running"; 
        };
        audioPlayer.onpause = () => { 
            record.style.animationPlayState = "paused"; 
        };
    }

    // 3. 인트로 화면 제거
    const intro = document.getElementById('intro');
    if (intro) {
        setTimeout(() => {
            intro.classList.add('hide');
            setTimeout(() => { 
                intro.style.display = 'none'; 
            }, 1000);
        }, 2500);
    }

    // 4. 메뉴 이동 (페이지 전환)
    const buttons = document.querySelectorAll('.menu-btn');
    const pages = document.querySelectorAll('.page');
    buttons.forEach(btn => {
        btn.onclick = function() {
            const target = this.getAttribute('data-target');
            pages.forEach(p => p.classList.remove('active-page'));
            buttons.forEach(b => b.classList.remove('active-btn'));
            
            const targetPage = document.getElementById(target);
            if (targetPage) {
                targetPage.classList.add('active-page');
                this.classList.add('active-btn');
            }
        };
    });
});
