class TimeSettings {
    constructor(type) {
        this.type = type;
        this.time = this.type === 'session' ? app.user.time : 5;
        //it is connected with app.user.isSession
        this.check = this.type === 'session' ? true : false;
        this.changeTime = (e) => this.handleTimeChange(e);
    }
    setProperties() {
        this.changeBtns = document.querySelectorAll(`.change-${this.type}`);
    }
    // change time on button click
    handleTimeChange(e) {
        const delta = e.currentTarget.classList.contains('decrease') ? -1 : 1;
        if(delta === 1 && this.time < 59 || delta === -1 && this.time > 1) {
            this.time += delta;
            document.querySelector(`.${this.type}-time`).textContent = this.time;
            if(this.check === app.user.isSession) {
                app.user.time = this.time;
                app.clock.renderTimer(app.user.time);
            }
        }
    }
    appendTimeChange() {
        this.changeBtns.forEach(el => el.addEventListener('click', this.changeTime))
    }
    // disable time changing during countingdown
    disableTimeChange() {
        this.changeBtns.forEach(el => el.removeEventListener('click', this.changeTime));
    }
    render() {
        const timeSet = document.createElement('div');
        timeSet.setAttribute('class', `${this.type}-set`)
        timeSet.innerHTML = `
            <span class="set-title">
                ${this.type.slice(0,1).toUpperCase() + this.type.slice(1)}
            </span>
            <button class="decrease change-${this.type}">
                -
            </button>
            <span class="${this.type}-time time-value">
                ${this.time}
            </span>
            <button class="increase change-${this.type}">
                +
            </button>  
        `;
        document.querySelector('.time-sets').appendChild(timeSet);
        this.setProperties();
        this.appendTimeChange();
    }
}