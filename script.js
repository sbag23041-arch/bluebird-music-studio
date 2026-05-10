window.onload = function() {
    const uploadInput = document.getElementById('music-upload');
    const audioPlayer = document.getElementById('audio-player');
    const songTitle = document.getElementById('song-title');
    const record = document.getElementById('record');

    // 1. 음악 업로드 및 재생 로직
    if (uploadInput && audioPlayer) {
        uploadInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                audioPlayer.src = fileURL;
                if (songTitle) songTitle.innerText = file.name;
                audioPlayer.load();
                audioPlayer.play().catch(err => console.log("재생 버튼을 눌러주세요."));
            }
        };
    }

    // 2. 레코드판 회전 제어 (CSS 강제 오버라이드)
    if (audioPlayer && record) {
        audioPlayer.onplay = () => { record.style.animationPlayState = "running"; };
        audioPlayer.onpause = () => { record.style.animationPlayState = "paused"; };
    }

    // 3. 인트로 제거 (확실한 display 처리)
    const intro = document.getElementById('intro');
    if (intro) {
        setTimeout(() => {
            intro.classList.add('hide');
            setTimeout(() => { intro.style.display = 'none'; }, 1000);
        }, 2500);
    }

    // 4. 메뉴 이동
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => {
        btn.onclick = function() {
            const target = this.getAttribute('data-target');
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
            document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active-btn'));
            document.getElementById(target).classList.add('active-page');
            this.classList.add('active-btn');
        };
    });
};
