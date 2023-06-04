const timeDiv = document.getElementById("timer")

let time = 0
let backupTime = 0
let timer = 0
let started = false


document.addEventListener("click", (event) => {
    if (event.target.className == "gs-image gs-image-scalable") {
        event.preventDefault()
        document.getElementById("logo1").src = event.target.src

        document.getElementsByClassName("gs-selectedImageResult")[0].classList.remove("gs-selectedImageResult")
        document.getElementsByClassName("gs-imagePreviewArea")[0].className = "gs-imagePreviewArea-invisible"
    }
    return false
})

document.addEventListener("contextmenu", (event) => {
    if (event.target.className == "gs-image gs-image-scalable") {
        event.preventDefault()
        document.getElementById("logo2").src = event.target.src
    }
    return false
})

function strToTime() {
    try {
        let minutes = timeDiv.value.split(":")[0].trim()
        let seconds = timeDiv.value.split(":")[1].trim()
        if(!isNaN(minutes) && !isNaN(seconds)) {
            return parseInt(minutes)*60 + parseInt(seconds)
        } else {
            return -1
        }
    } catch {
        return -1
    }
}

function timeToStr() {
    let minutes = (Math.floor(time/60)).toString().padStart(2, "0")
    let seconds = (time%60).toString().padStart(2, "0")
    return `${minutes}:${seconds}`
}

function startTimeEdit() {
    clearInterval(timer)
    started = false
    timeDiv.readOnly = false
    timeDiv.focus()
}

function endTimeEdit() {
    timeDiv.readOnly = true
    let newTime = strToTime()
    if(newTime>=0) {
        time = newTime
        backupTime = newTime
    } else {
        time = backupTime
    }
    timeDiv.value = timeToStr()
}

function timeTick() {
    time += 1
    timeDiv.value = timeToStr()
}

function startStopTimer() {
    if(started) {
        clearInterval(timer)
        started = false
    } else {
        timer = setInterval(timeTick, 1000)
        started = true
    }
}
