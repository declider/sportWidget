const timeDiv = document.getElementById("timer")

let time = 0
let backupTime = 0
let timer = 0
let started = false

function logoDragOver(e) {
    e.preventDefault()
    return false
}

function logoDrop(e) {
    e.preventDefault()
    let link = e.dataTransfer.getData("text")
    if(e.target.id=="logo1"||e.target.id=="logo2"){ 
        e.target.src = link
    }
    return false
}

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