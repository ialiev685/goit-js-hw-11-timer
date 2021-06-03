class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate.getTime();

    this.countDown = false;
    this.intervalId = null;

    this.start();
  }

  start() {
    this.countDown = true;
    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const dealtaTime = this.targetDate - currentDate;
      this.checkDeltaTime(dealtaTime);
      if (!this.countDown) {
        return;
      }
      const time = this.getTimeComponents(dealtaTime);

      this.updateClockFace(time);
    }, 1000);
  }

  checkDeltaTime(num) {
    if (num <= 0) {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.countDown = false;
    const time = this.getTimeComponents(0);
    this.updateClockFace(time);
  }

  getTimeComponents(time) {
    const days = this.makeDoubleDigit(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.makeDoubleDigit(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.makeDoubleDigit(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    const secs = this.makeDoubleDigit(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  updateClockFace({ days, hours, mins, secs }) {
    const clockFace = document.querySelector(this.selector);

    clockFace.children[0].firstElementChild.textContent = days;
    clockFace.children[1].firstElementChild.textContent = hours;
    clockFace.children[2].firstElementChild.textContent = mins;
    clockFace.children[3].firstElementChild.textContent = secs;
  }

  makeDoubleDigit(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jun 06, 2021"),
});
