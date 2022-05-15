const frames = {'daily': 'Day', 'weekly': 'Week', 'monthly': 'Month'};
const interval = document.querySelectorAll('.header-nav p');

const currentTimes = document.querySelectorAll('.current-time');
const intervals = document.querySelectorAll('.interval');
const lastTimes = document.querySelectorAll('.last-time');

interval.forEach(p => p.addEventListener('click', () => {
    removeActiveAll();
    p.classList.add('active');
    updateTimeFrames(p.id);
}));

function removeActiveAll() {
    interval.forEach(p => p.classList.remove('active'));
}

async function updateTimeFrames(id) {
    const res = await fetch('data.json');
    const data = await res.json();
    const timeframes = data.map(frame => {
        return [frame.timeframes[id]['current'], frame.timeframes[id]['previous']];
    });

    for (let i = 0; i < currentTimes.length; i++) {
        currentTimes[i].textContent = timeframes[i][0];
        intervals[i].textContent = frames[id];
        lastTimes[i].textContent = timeframes[i][1];
    }
}

updateTimeFrames('daily');