class App {
    setProperties() {
        this.user = new User();
        this.sessionSettings = new TimeSettings('session');
        this.breakSettings = new TimeSettings('break');
        this.clock = new Clock();
    }
    render() {
        document.querySelector('#root').innerHTML = `
            <div class="container">
                <h1>Pomodoro clock</h1>
                <div class="time-sets"></div>
            </div>
        `;
        // render all elements of the clock
        this.setProperties();        
        this.sessionSettings.render();
        this.breakSettings.render();
        this.clock.render();
        this.user.render();
    }
};