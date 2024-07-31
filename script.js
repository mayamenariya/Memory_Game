const emojis = ["😍", "😍", "🙃", "🙃", "👻", "👻", "🤡", "🤡", "🙂", "🙂", "🥰", "🥰", "🤩", "🤩",
"😎", "😎"];
let shuf_emojis = emojis.sort(() => Math.random() > 0.5 ? 1 : -1);

let moves = 0;
let startTime;
let interval;
let isGameStarted = false;

function startTimer() {
    startTime = new Date().getTime();
    interval = setInterval(function() {
        let now = new Date().getTime();
        let elapsed = Math.floor((now - startTime) / 1000);
        let minutes = Math.floor(elapsed / 60);
        let seconds = elapsed % 60;
        document.getElementById('time').innerText = `${minutes}m ${seconds}s`;
    }, 1000);
}

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement('div');
    box.classList.add('item', 'hidden');
    box.innerHTML = shuf_emojis[i];

    box.onclick = function() {
        if (!isGameStarted) {
            isGameStarted = true;
            startTimer();
        }

        if (this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) return;

        this.classList.add('boxOpen');
        this.classList.remove('hidden');
        moves++;
        document.getElementById('moves').innerText = moves;

        setTimeout(function() {
            let openBoxes = document.querySelectorAll('.boxOpen:not(.boxMatch)');
            if (openBoxes.length > 1) {
                if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                    openBoxes[0].classList.add('boxMatch');
                    openBoxes[1].classList.add('boxMatch');
                } else {
                    openBoxes[0].classList.add('hidden');
                    openBoxes[1].classList.add('hidden');
                }
                openBoxes[0].classList.remove('boxOpen');
                openBoxes[1].classList.remove('boxOpen');

                if (document.querySelectorAll('.boxMatch').length === emojis.length) {
                    clearInterval(interval);
                    alert('You win!');
                }
            }
        }, 500);
    };

    document.querySelector('.game').appendChild(box);
}