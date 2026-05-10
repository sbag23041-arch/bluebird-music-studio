document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('music-upload');
    const audioPlayer = document.getElementById('audio-player');
    const songTitle = document.getElementById('song-title');
    const record = document.getElementById('record');

    // 1. 음악 업로드 및 재생 핵심 로직
    if (uploadInput && audioPlayer) {
        uploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // 기존 URL 해제 (메모리 관리)
                if (audioPlayer.src) URL.revokeObjectURL(audioPlayer.src);
                
                const fileURL = URL.createObjectURL(file);
                audioPlayer.src = fileURL;
                audioPlayer.load(); // 파일 로드 강제 실행
                songTitle.textContent = file.name;
                
                // 업로드 즉시 재생 시도
                audioPlayer.play().catch(err => console.log("자동 재생 차단됨: ", err));
            }
        });
    }

    // 2. 레코드판 애니메이션 제어
    if (audioPlayer && record) {
        audioPlayer.addEventListener('play', () => {
            record.style.animation = "rotate 10s linear infinite"; // 애니메이션 강제 할당
            record.style.animationPlayState = 'running';
        });
        audioPlayer.addEventListener('pause', () => {
            record.style.animationPlayState = 'paused';
        });
    }

    // 3. 인트로 및 네비게이션 (기존 로직 보강)
    setTimeout(() => {
        const intro = document.getElementById('intro');
        if(intro) intro.style.display = 'none';
    }, 3000);

    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
            document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active-btn'));
            document.getElementById(target).classList.add('active-page');
            btn.classList.add('active-btn');
        });
    });
});

















































































































































































