import { getTimeUntilBday, formatNum } from "./calculator.js";
const LOCAL_STORAGE = 'birthday.date'


checkLs()
loadPage()

function checkLs(){
    if (!localStorage.getItem(LOCAL_STORAGE)) {
        var defaultbday = {
            year: 2022,
            month: 3,
            day: 6
        }
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(defaultbday))
    }
}

function getLs(){
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE))
}

function setBday(y, m, d){
    if (checkDate(y, m, d) == false) return 'Invalid date'
    var data = getLs()
    data.year = y
    data.month = m
    data.day = d
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data))
    return `Birthday changed to ${formatNum(y)}-${formatNum(m)}-${formatNum(d)}`
}
function checkDate(y, m, d){
    if (!y) return false
    if (!m) return false
    if (!d) return false
    if (parseInt(m) < 1) return false
    if (parseInt(m) > 12) return false
    if (parseInt(y) < 2000) return false
    if (parseInt(d) < 1) return false
    if (parseInt(d) > 31) return false
    if (parseInt(m) == 2 && parseInt(d) > 29) return false
    if (parseInt(m) == 2 && `${parseInt(y) / 4}`.includes('.') && parseInt(d) > 28) return false
    if ((parseInt(m) == 4 || parseInt(m) == 6 || parseInt(m) == 9 || parseInt(m) == 11) && parseInt(d) > 30) return false
    return true
}
function getBday(){
    var data = getLs()
    return `${formatNum(data.year)}-${formatNum(data.month)}-${formatNum(data.day)}`
}
function getBdayDisplay(){
    var data = getLs()
    var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',')
    var month = months[data.month - 1]
    return `${month} ${data.day}, ${data.year}`
}

function loadPage(){
    var inputs = document.getElementById('inputcontainer')

    inputs.innerHTML = `
    <div class="inputs">
        <div class="inputs-grid">
            <label for="year">Year</label>
            <label for="month">Month</label>
            <label for="day">Day</label>
            <input id="year" placeholder="Year" type="number" autocomplete="off">
            <input id="month" placeholder="Month" type="number" autocomplete="off">
            <input id="day" placeholder="Day" type="number" autocomplete="off">
        </div>
        <button id="save">Save</button>
        <p id="message"></p>
    </div>
    `
    document.getElementById('year').value = getLs().year
    document.getElementById('month').value = getLs().month
    document.getElementById('day').value = getLs().day
    document.getElementById('message').style.display = 'none'

    document.getElementById('save').addEventListener('click', (saveBtn))

    var display = document.getElementById('display')
    var remaining = getTimeUntilBday(getBday())
    if (remaining.days > 0 && remaining.hours > 0 && remaining.minutes > 0 && remaining.seconds > 0) {
        display.innerHTML = `
        <div class="display-date-time">
            <h1>${getBdayDisplay()}</h1>
            <div class="display-time">
                <h1>${remaining.days}</h1>
                <h1>${remaining.hours}</h1>
                <h1>${remaining.minutes}</h1>
                <h1>${remaining.seconds}</h1>
                <p>Days</p>
                <p>Hours</p>
                <p>Minutes</p>
                <p>Seconds</p>
            </div>
        </div>
        `
    } else {
        display.innerHTML = `
        <div class="display-date-time">
            <h1>${getBdayDisplay()}</h1>
            <div class="display-time">
                <h1>0</h1>
                <h1>0</h1>
                <h1>0</h1>
                <h1>0</h1>
                <p>Days</p>
                <p>Hours</p>
                <p>Minutes</p>
                <p>Seconds</p>
            </div>
            <p style="text-align:center;margin-top:5vmin;font-style:italic;font-weight:bold;font-size:8vmin;">Happy birthday!</p>
        </div>
        `
    }
    setInterval(function() {
        var remaining = getTimeUntilBday(getBday())
        
        if (remaining.days > 0 && remaining.hours > 0 && remaining.minutes > 0 && remaining.seconds > 0) {
            display.innerHTML = `
            <div class="display-date-time">
                <h1>${getBdayDisplay()}</h1>
                <div class="display-time">
                    <h1>${remaining.days}</h1>
                    <h1>${remaining.hours}</h1>
                    <h1>${remaining.minutes}</h1>
                    <h1>${remaining.seconds}</h1>
                    <p>Days</p>
                    <p>Hours</p>
                    <p>Minutes</p>
                    <p>Seconds</p>
                </div>
            </div>
            `
        } else {
            display.innerHTML = `
            <div class="display-date-time">
                <h1>${getBdayDisplay()}</h1>
                <div class="display-time">
                    <h1>0</h1>
                    <h1>0</h1>
                    <h1>0</h1>
                    <h1>0</h1>
                    <p>Days</p>
                    <p>Hours</p>
                    <p>Minutes</p>
                    <p>Seconds</p>
                </div>
                <p style="text-align:center;margin-top:5vmin;font-style:italic;font-weight:bold;font-size:8vmin;">Happy birthday!</p>
            </div>
            `
        }
    }, 1000)
}

function saveBtn(){
    if (setBday(parseInt(document.getElementById('year').value), parseInt(document.getElementById('month').value), parseInt(document.getElementById('day').value)) == 'Invalid date') {
        document.getElementById('message').style.display = 'block'
        document.getElementById('message').style.color = '#c00'
        document.getElementById('message').innerText = 'Invalid date'
        setTimeout(function(){
            document.getElementById('message').style.display = 'none'
            document.getElementById('message').style.color = '#000'
            document.getElementById('message').innerText = ''
        }, 1500)
    } else {
        document.getElementById('message').style.display = 'block'
        document.getElementById('message').style.color = '#0c0'
        document.getElementById('message').innerText = 'Saved'
        setTimeout(function(){
            document.getElementById('message').style.display = 'none'
            document.getElementById('message').style.color = '#000'
            document.getElementById('message').innerText = ''
        }, 1500)
    }
}