class Clock {
    constructor() {
        this.title = 'session';
        this.wasPaused = false;
        this.startClock = () => this.handleStart();
        this.fullTime = app.user.time * 60;
    }
    //capitalise first letter
    makeReadable(word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1, word.length)
    }
    //add 0 before time if nedeed 
    standardiseTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    //change timer HTML element
    renderTimer() {
        document.querySelector('.timer').textContent = `
            ${this.standardiseTime(app.user.time)} : 00
        `;
    }
    // change timer's title
    renderTitle(type) {
        document.querySelector('.timer-title').textContent = `
            ${this.makeReadable(type)}
        `;
    }
    // find start button
    setProperties() {
        this.startBtn = document.querySelector('#start-btn');
    }
    // adds event handler from start button
    appendStartHandler() {
        this.startBtn.addEventListener('click', this.startClock);
    }
    // removes event handler from start button
    removeStartHandler() {
        this.startBtn.removeEventListener('click', this.startClock);
    }
    // for start button
    handleStart() {
        // remove event handlers from buttons
        this.removeStartHandler();
        app.sessionSettings.disableTimeChange();
        app.breakSettings.disableTimeChange();
        
        app.user.stopSound();
        // don't count time after pause
        if(!this.wasPaused) {
            this.fullTime = app.user.time * 60;
        }
        // counting down
        this.tik = setInterval(() => {
            this.fullTime -= 1;
            document.querySelector('.timer').textContent = `
                ${this.standardiseTime(Math.floor(this.fullTime / 60))} : ${this.standardiseTime(this.fullTime % 60)}
            `;
            if(this.fullTime === 0) {
                this.changePeriod();
            }
        }, 1000)
        this.wasPaused = false;
    }
    // when period is finished, change its type, add to statistics, play signal, prepare timer
    changePeriod() {
        clearInterval(this.tik);
        this.fullTime = app.user.time * 60;
        if (app.user.isSession) {
            ++app.user.sessions;
            app.user.sessionsTime += app.user.time;
        } else {
            app.user.breaksTime += app.user.time;
        }
        app.user.isSession = !app.user.isSession;
        app.user.time = app.user.isSession ? app.sessionSettings.time : app.breakSettings.time
        document.querySelector('.timer').textContent = `
            ${this.standardiseTime(app.user.time)} : 00
        `;
        app.user.renderStats();
        app.user.sound.play();
        this.fullTime = app.user.time * 60;
        this.renderTitle(app.user.isSession ? 'session' : 'break');
        this.appendStartHandler();
        app.sessionSettings.appendTimeChange();
        app.breakSettings.appendTimeChange();
    }
    // for pause button
    handlePause() {
        clearInterval(this.tik);
        app.user.stopSound();
        // set property only if pause was clicked during countingdown
        if(this.fullTime !== app.user.time * 60) {
            this.wasPaused = true;
        }
        
        this.appendStartHandler();
    }
    // for reset button
    handleReset() {
        clearInterval(this.tik);
        app.user.stopSound();
        app.render();
        app.user.sessions = 0;
        app.user.sessionsTime = 0;
        app.user.breaksTime = 0;
    }
    render() {
        const clockDiv = document.createElement('div')
        clockDiv.className =  'clock';
        clockDiv.innerHTML =  `
            <div class="clock-display">
                <h2 class="timer-title">
                    ${this.makeReadable(this.title)}
                </h2>
                <span class="timer">
                    ${this.standardiseTime(app.user.time)} : 00
                </span>
            </div>
            <div class="btns">
                <button id="start-btn">
                    <img src="img/start.png">
                </button>
                <button id="pause-btn">
                    <img src="img/pause.png">
                </button>
                <button id="reset-btn">
                    <img src="img/reset.png">
                </button>
            </div>
        `;
        document.querySelector('.container').appendChild(clockDiv);
        this.setProperties();
        this.appendStartHandler();
        document.querySelector('#pause-btn').addEventListener('click', () => this.handlePause());
        document.querySelector('#reset-btn').addEventListener('click', () => this.handleReset());
    }
};
