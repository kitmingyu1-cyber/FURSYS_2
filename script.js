document.addEventListener('DOMContentLoaded', () => {
    // Files tracking
    const fileInputs = [document.getElementById('file1'), document.getElementById('file2')];
    const previewImgs = [document.getElementById('img1'), document.getElementById('img2')];
    const analyzeBtn = document.getElementById('analyzeBtn');
    let files = [null, null];

    fileInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            if(input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImgs[index].src = e.target.result;
                    previewImgs[index].style.display = 'block';
                    files[index] = input.files[0];
                    checkAnalyzeBtn();
                }
                reader.readAsDataURL(input.files[0]);
            }
        });
    });

    function checkAnalyzeBtn() {
        if(files[0] && files[1]) {
            analyzeBtn.removeAttribute('disabled');
        } else {
            analyzeBtn.setAttribute('disabled', 'true');
        }
    }

    // State Panes
    const stateReady = document.getElementById('stateReady');
    const stateLoading = document.getElementById('stateLoading');
    const stateDone = document.getElementById('stateDone');
    const progFill = document.getElementById('progress');
    const lText = document.getElementById('loadingText');
    const resetBtn = document.getElementById('resetBtn');

    function switchState(state) {
        stateReady.style.display = 'none';
        stateLoading.style.display = 'none';
        stateDone.style.display = 'none';
        if(state === 'ready') stateReady.style.display = 'flex';
        if(state === 'loading') stateLoading.style.display = 'flex';
        if(state === 'done') stateDone.style.display = 'flex';
    }

    analyzeBtn.addEventListener('click', () => {
        switchState('loading');
        analyzeBtn.setAttribute('disabled', 'true'); // prevent multiple clicks
        progFill.style.width = '0%';
        
        const steps = [
            "이미지 최적화 중...",
            "ERP 화면 OCR 추출 및 파싱...",
            "주문품 화면 OCR 추출 및 파싱...",
            "단품코드, 색상, 수량 정합성 교차 분석 중..."
        ];

        let delay = 0;
        steps.forEach((text, i) => {
            setTimeout(() => {
                lText.textContent = text;
                progFill.style.width = `${(i+1)*25}%`;
            }, delay);
            delay += 800;
        });

        setTimeout(() => {
            switchState('done');
            analyzeBtn.removeAttribute('disabled');
        }, delay + 600);
    });

    resetBtn.addEventListener('click', () => {
        // Reset uploads
        files = [null, null];
        fileInputs.forEach(input => input.value = '');
        previewImgs.forEach(img => {
            img.src = '';
            img.style.display = 'none';
        });
        checkAnalyzeBtn();
        switchState('ready');
    });
});
