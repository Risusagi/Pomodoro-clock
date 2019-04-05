document.addEventListener('DOMContentLoaded', () => {
    const increaseSession = document.querySelector('#increase_session'); //buttons of session settings
    const decreaseSession = document.querySelector('#decrease_session');
    const increaseBreak = document.querySelector('#increase_break'); //buttons of break settings
    const decreaseBreak = document.querySelector('#decrease_break');
    const timeOfSession = document.querySelector('#time_of_session'); //values of session/break time
    const timeOfBreak = document.querySelector('#time_of_break');
    const startButton = document.querySelector('#start_btn'); //piloting buttons
    const pauseButton = document.querySelector('#pause_btn');
    const resetButton = document.querySelector('#reset_btn');
    const minutes = document.querySelector('#minutes'); //time inside timer
    const seconds = document.querySelector('#seconds');
    
    let timeOfSessionAsANumber = Number(timeOfSession.innerText);
    let timeOfBreakAsANumber = Number(timeOfBreak.innerText);
    
    const changeSessionTime = (e) => {
        if (e.target === increaseSession && timeOfSessionAsANumber < 59) {
           timeOfSessionAsANumber += 1;
        }
        else if (e.target === decreaseSession && timeOfSessionAsANumber > 1) {
            timeOfSessionAsANumber -= 1;
        }   
        timeOfSession.innerText = timeOfSessionAsANumber; 
        //changes timer's time
        minutes.innerText = timeOfSessionAsANumber < 10 ? '0' + timeOfSession.innerText : timeOfSession.innerText;
        seconds.innerText = '00';
    }

    const changeBreakTime = (e) => {
        if (e.target === increaseBreak && timeOfBreakAsANumber < 59) {
            timeOfBreakAsANumber += 1;
        }
        else if (e.target === decreaseBreak && timeOfBreakAsANumber > 1) {
            timeOfBreakAsANumber -= 1;
        }
        timeOfBreak.innerText = timeOfBreakAsANumber;
    }
    //events for changing time of session/break
    increaseSession.addEventListener('click', changeSessionTime); 
    decreaseSession.addEventListener('click', changeSessionTime);
    increaseBreak.addEventListener('click', changeBreakTime);
    decreaseBreak.addEventListener('click', changeBreakTime);

    const sound = document.querySelector("#end_sound");
    
    const usersSessions = document.querySelector('#users_sessions');
    const usersSessionsTime = document.querySelector('#users_sessions_time');
    const usersBreaksTime = document.querySelector('#users_breaks_time');

    const textInsideTimer = document.querySelector('#text_inside_timer'); //shows if it is break or session inside timer
    
    
    let sessionOrBreak = 0; //controls if it is session or break now
    
    let usersSessionsTimeCounter = 0; //whole time of user's sessions
    let usersBreaksTimeCounter = 0; //whole time of user's breaks

    let countingDown;

    //START BUTTON
    const updateClock = () => {
        //whole time of timer in seconds (minutes are changed with session settings so we can get time from timer)
        let t = parseInt(minutes.innerText, 10) * 60 + parseInt(seconds.innerText, 10);
        
        if (sessionOrBreak % 2 === 0) {
            usersSessionsTimeCounter += t / 60; //if it is a session now add its time to counter of the whole user's sessions, but don't show it at that moment
        } else {
            usersBreaksTimeCounter += t / 60; //the same but for break
        }
        
        countingDown = setInterval(() => {
            t -= 1;
            min = Math.floor(t / 60);
            sec = Math.floor(t % 60);
            minutes.innerText = min < 10 ? '0' + min : min; //add 0 if minutes have only one digit
            seconds.innerText = sec < 10 ? '0' + sec : sec; //add 0 if seconds have only one digit
            //when countingdown is finished make all that things:
            if (t == 0) {
                sound.play();
                sessionOrBreak++;    //increase controler to know what should be next: break or session
                clearInterval(countingDown);   //stop countingdown
                //STATISTICS
                usersSessions.innerText = Math.floor((sessionOrBreak + 1) / 2);  //if it was a session increase their number in statistics counter
                //time of sessions, which was increased after clicking start button
                usersSessionsTime.innerText = Math.floor(usersSessionsTimeCounter / 60) + "h " + usersSessionsTimeCounter % 60 + "min";
                usersBreaksTime.innerText = Math.floor(usersBreaksTimeCounter / 60) + "h " + usersBreaksTimeCounter % 60 + "min";
                
                if (sessionOrBreak % 2 !== 0) {
                    //if next part of time is break, get it's time from break settings and change text inside timer
                    minutes.innerText = timeOfBreakAsANumber < 10 ? '0' + timeOfBreakAsANumber : timeOfBreakAsANumber;
                    textInsideTimer.innerText = 'Break';
                } else {
                    minutes.innerText = timeOfSessionAsANumber < 10 ? '0' + timeOfSessionAsANumber : timeOfSessionAsANumber;
                    textInsideTimer.innerText = 'Session';
                }
                seconds.innerText = '00';
                startButton.addEventListener('click', stopSound);
            }
        }, 1000)

    }
    startButton.addEventListener('click', updateClock);

    //PAUSE BUTTON
    const pauseFunction = () => {
        clearInterval(countingDown);
        stopSound();
    }
    pauseButton.addEventListener('click', pauseFunction);

    //RESET BUTTON
    const resetFunction = () => {
        timeOfSession.innerText = '25';
        timeOfBreak.innerText = '5';
        minutes.innerText = timeOfSession.innerText;
        seconds.innerText = '00';
        clearInterval(countingDown);
        stopSound();
        usersSessions.innerText = 0;
        usersSessionsTime.innerText = "0 min";
        usersBreaksTime.innerText = "0 min";
        sessionOrBreak = 0;
        usersSessionsTimeCounter = 0;
        usersBreaksTimeCounter = 0; 
        timeOfSessionAsANumber = 25;
        timeOfBreakAsANumber = 5;
    }
    resetButton.addEventListener('click', resetFunction);

    //STOP SOUND AND RETURN IT TO START TIME
    const stopSound = () => {
        sound.pause();
        sound.currentTime = 0.0;
    }
})
