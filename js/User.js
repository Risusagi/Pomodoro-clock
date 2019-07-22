class User  {
    constructor() {
        this.isSession = true;
        this.time = 25;
        this.sessions = 0;
        this.sessionsTime = 0;
        this.breaksTime = 0;
        this.sound = document.querySelector('.sound');
    }
    // render all user statistics when changed
    renderStats() {
        document.querySelector('.user-sessions').textContent = this.sessions;
        document.querySelector('.user-sessions-time').textContent = this.standardiseTime(this.sessionsTime);
        document.querySelector('.user-breaks-time').textContent = this.standardiseTime(this.breaksTime);
    }
    // add zeros to time
    standardiseTime(time) {
        return time > 59 ? `${Math.floor(time / 60)} h  ${time % 60} min` : `${time} min`;
    }
    // stop signal and make it go to it's start
    stopSound() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
    render() {
        const userDiv = document.createElement('div');
        userDiv.setAttribute('class', 'user-statistics')
        userDiv.innerHTML = `
            <p>
                Your sessions today:
                <span class="user-sessions">
                    ${this.sessions}
                </span>
            </p>
            <p>
                Time of sessions:
                <span class="user-sessions-time">
                    ${this.sessionsTime}
                </span>
            </p>
            <p>
                Time of breaks:
                <span class="user-breaks-time">
                    ${this.breaksTime}
                </span>
            </p>
        `;
        document.querySelector('.container').appendChild(userDiv);
    }
}