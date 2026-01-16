
document.getElementById('runBtn').addEventListener('click', runSimulation);

function runSimulation() {
    const btn = document.getElementById('runBtn');
    const log = document.getElementById('log-output');
    const ctx = document.getElementById('analysisChart').getContext('2d');
    
    btn.disabled = true;
    btn.innerText = "Analyzing... (Processing Data)";
    log.innerHTML += "<br>> Initializing Monte Carlo Engine...";

    // 기존 차트가 있다면 제거 (메모리 누수 방지)
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // 시뮬레이션 데이터 생성 (가짜지만 진짜처럼 보임)
    let dataPoints = [];
    let labels = [];
    let balance = 0;
    
    for (let i = 0; i <= 50; i++) {
        labels.push(i);
        // 랜덤 워크 로직
        if (i === 0) {
            dataPoints.push(0);
        } else {
            let change = Math.random() > 0.5 ? 1 : -1;
            // 약간의 변동성 추가
            if(Math.random() < 0.1) change *= 3; 
            balance += change;
            dataPoints.push(balance);
        }
    }

    setTimeout(() => {
        log.innerHTML += "<br>> Generating 50,000 data points...";
        log.innerHTML += "<br>> Calculating Standard Deviation...";
        
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Probability Deviation (Variance)',
                    data: dataPoints,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    tension: 0.4, // 부드러운 곡선
                    fill: true,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: { grid: { color: '#e2e8f0' } },
                    x: { grid: { display: false } }
                }
            }
        });

        log.innerHTML += "<br>> <span style='color:#00ff00'>Analysis Complete. Pattern Detected.</span>";
        log.scrollTop = log.scrollHeight;
        btn.disabled = false;
        btn.innerText = "데이터 분석 시작 (Run Analysis)";
        
    }, 1200); // 1.2초 딜레이로 연산하는 척
}

// 깜빡이는 효과
setInterval(() => {
    const el = document.querySelector('.blink');
    el.style.opacity = el.style.opacity === '0' ? '1' : '0';
}, 1000);
