document.addEventListener('DOMContentLoaded', () => {
    // 1. 인트로 확실히 제거 (3초 후)
    const intro = document.getElementById('intro');
    if (intro) {
        setTimeout(() => {
            intro.classList.add('hide');
            // 애니메이션 종료 후 아예 삭제하여 클릭 방해 제거
            setTimeout(() => { intro.style.display = 'none'; }, 1000);
        }, 3000);
    }

    // 2. 메뉴 이동 로직
    const buttons = document.querySelectorAll('.menu-btn');
    const pages = document.querySelectorAll('.page');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            pages.forEach(page => page.classList.remove('active-page'));
            buttons.forEach(btn => btn.classList.remove('active-btn'));
            document.getElementById(target).classList.add('active-page');
            button.classList.add('active-btn');
        });
    });

    // 3. 음악 업로드 및 재생 (강력한 로직 적용)
    const uploadInput = document.getElementById('music-upload');
    const audioPlayer = document.getElementById('audio-player');
    const songTitle = document.getElementById('song-title');
    const record = document.getElementById('record');

    if (uploadInput && audioPlayer) {
        uploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                audioPlayer.src = fileURL;
                audioPlayer.load(); // 강제 로드
                songTitle.textContent = file.name;
                
                // 업로드 성공 알림 (디버깅용)
                console.log("파일 업로드 성공: " + file.name);
                
                // 브라우저 정책상 클릭 후 재생이 안전함
                audioPlayer.play().catch(error => {
                    console.log("자동 재생이 차단되었습니다. 재생 버튼을 직접 눌러주세요.");
                });
            }
        });
    }

    // 4. 레코드판 애니메이션 (CSS 설정을 강제로 덮어씀)
    if (audioPlayer && record) {
        audioPlayer.addEventListener('play', () => {
            record.style.animationPlayState = 'running';
            record.style.webkitAnimationPlayState = 'running'; // 사파리/크롬 호환
        });

        audioPlayer.addEventListener('pause', () => {
            record.style.animationPlayState = 'paused';
            record.style.webkitAnimationPlayState = 'paused';
        });
    }
});














































































































































































