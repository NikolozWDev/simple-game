const player = document.querySelector('.image-person');
const timer = document.querySelector('.time');
const scores = document.querySelector('.scores')
const coins = document.querySelector('.coins')
const text1 = document.querySelector('.text1')
const text2 = document.querySelector('.text2')
const text3 = document.querySelector('.text3')
const stats = document.querySelector('.match-stats-container')
const exit = document.querySelector('.exit')
const playGround = document.querySelector('.play-ground')

let timeActive = false
let intervalId;

function getRandomPosition() {
    const playRect = playGround.getBoundingClientRect()
    const playerRect = player.getBoundingClientRect()

    const maxX = playRect.width - playerRect.width
    const maxY = playRect.height - playerRect.height

    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    return {x: randomX, y: randomY}
}

player.addEventListener('click', () => {
    stats.classList.remove('match-stats-container2')
    if(!timeActive) {
        const timerSave = timer.innerHTML
        let count = Number(timer.innerHTML)
        timeActive = true
        intervalId = setInterval(() => {
        count -= 1;
        timer.innerHTML = count
        if(count === 0) {
            clearInterval(intervalId)
            let rate;
            if(Number(scores.innerHTML) < 15) {
                rate = 'bad'
            } else if(Number(scores.innerHTML) > 15 && Number(scores.innerHTML) < 20) {
                rate = 'normal'
            } else if(Number(scores.innerHTML) > 25) {
                rate = 'good'
            }
            timeActive = false
            stats.classList.add('match-stats-container2')
            text1.innerHTML = `your scores in ${timerSave} seconds was ${scores.innerHTML}`
            text2.innerHTML = `you taken ${Number(scores.innerHTML) - 15 > 0 ? Number(scores.innerHTML) - 15 : 0} coins`
            text3.innerHTML = `rate: ${rate}`
            exit.addEventListener('click', () => {
                stats.classList.remove('match-stats-container2')
            })
            timer.innerHTML = timerSave
            scores.innerHTML = 0
        }
    }, 1000)
    }

    // const randomX = Math.floor(Math.random() * 500) * (Math.random() > 0.5 ? 1 : -1)
    // const randomY = Math.floor(Math.random() * 500) * (Math.random() > 0.5 ? 1 : -1)
    // player.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`
    const pos = getRandomPosition();
    player.style.left = `${pos.x}px`
    player.style.top = `${pos.y}px`
    scores.innerHTML = Number(scores.innerHTML) + 1
    if(scores.innerHTML - 15 > 0) {
        let counter = Number(localStorage.getItem('coins')) || 0
        counter += 1
        coins.innerHTML = counter
        localStorage.setItem('coins', coins.innerHTML)
    }

});
coins.innerHTML = localStorage.getItem('coins') || 0;