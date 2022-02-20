// Accurate_Interval.js 
// Thanks Squeege! For the elegant answer provided to this question: 
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time). 

(function () {
  window.accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel };

  };
}).call(this);
var timeInterval = null;
const ACTION = {
  INCREASE: 'increase',
  DECREASE: 'decrease' };

const Button = ({ id, className, onClick, children }) => /*#__PURE__*/
React.createElement("button", { id: id, className: className, onClick: onClick },
children);


const TimeDisplay = ({ timeLeft }) => {
  const min = Math.floor(timeLeft / 60);
  const minStr = min > 9 ? min : `0${min}`;
  const sec = timeLeft % 60;
  const secStr = sec > 9 ? sec : `0${sec}`;
  return /*#__PURE__*/(
    React.createElement("div", { id: "time-left" }, /*#__PURE__*/
    React.createElement("span", null, minStr), " : ", /*#__PURE__*/React.createElement("span", null, secStr)));


};

const TimeLength = ({ timeLabel, timeLength, updateTimeLength, stateToChange }) => {
  return /*#__PURE__*/(
    React.createElement("div", { class: "session" }, /*#__PURE__*/
    React.createElement("div", { id: `${timeLabel}-label`, class: "title" }, timeLabel, " length"), /*#__PURE__*/
    React.createElement("span", { id: `${timeLabel}-length` }, timeLength), /*#__PURE__*/
    React.createElement(Button, { id: `${timeLabel}-increment`, className: "increase", onClick: () => updateTimeLength(stateToChange, ACTION.INCREASE) }, "increase"), /*#__PURE__*/
    React.createElement(Button, { id: `${timeLabel}-decrement`, className: "decrease", onClick: () => updateTimeLength(stateToChange, ACTION.DECREASE) }, "decrease")));



};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 1500, // in seconds
      isPaused: true,
      sessionLength: 25, // in minutes
      breakLength: 5, // inminutes
      isOnSession: true };


    this.countDown = this.countDown.bind(this);
    this.controlCountDown = this.controlCountDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateTimeLength = this.updateTimeLength.bind(this);
    this.switchSessionBreak = this.switchSessionBreak.bind(this);
  }

  controlCountDown() {
    const self = this;
    if (this.state.isPaused) {
      timeInterval = accurateInterval(self.countDown, 1000);
    } else {
      timeInterval && timeInterval.cancel();
    }
    this.setState({
      isPaused: !this.state.isPaused });

  }

  countDown() {
    if (this.state.timeLeft <= 60) {
      this.setState({
        showWarning: true });

    }
    if (this.state.timeLeft === 0) {
      this.switchSessionBreak();
    }
    this.setState({
      timeLeft: this.state.timeLeft - 1 });

  }

  resetTimer() {
    timeInterval && timeInterval.cancel();
    this.setState({
      timeLeft: 1500,
      isPaused: true,
      sessionLength: 25,
      breakLength: 5,
      isOnSession: true,
      showWarning: false });

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  updateTimeLength(stateToChange, actionType) {
    if (this.state.isPaused) {
      const currentLength = this.state[stateToChange];
      var newLength = currentLength;
      if (actionType === ACTION.INCREASE && currentLength < 60) {
        newLength = currentLength + 1;
      }
      if (actionType === ACTION.DECREASE && currentLength > 1) {
        newLength = currentLength - 1;
      }
      this.setState({
        [stateToChange]: newLength });

      if (stateToChange === 'sessionLength' && this.state.isOnSession || stateToChange === 'breakLength' && !this.state.isOnSession) {
        this.setState({
          timeLeft: newLength * 60 });

      }
    }
  }

  switchSessionBreak() {
    if (this.state.isOnSession) {
      this.setState({
        timeLeft: this.state.breakLength * 60 + 1,
        isOnSession: false });

    } else {
      this.setState({
        timeLeft: this.state.sessionLength * 60 + 1,
        isOnSession: true });

    }
    this.audioBeep.currentTime = 0;
    this.audioBeep.play();
    this.setState({
      showWarning: false });

  }

  render() {
    const { timeLeft, sessionLength, breakLength, isOnSession, showWarning } = this.state;
    const timerLabel = isOnSession ? 'Session' : 'Break';
    const timeDisplayClass = showWarning ? 'time-display-wrapper warning' : 'time-display-wrapper';
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Pomodoro Clock"), /*#__PURE__*/
      React.createElement(TimeLength, {
        timeLabel: "break",
        timeLength: breakLength,
        updateTimeLength: this.updateTimeLength,
        stateToChange: "breakLength" }), /*#__PURE__*/

      React.createElement(TimeLength, {
        timeLabel: "session",
        timeLength: sessionLength,
        updateTimeLength: this.updateTimeLength,
        stateToChange: "sessionLength" }), /*#__PURE__*/

      React.createElement("div", { className: timeDisplayClass }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label", className: "timer-label" }, timerLabel), /*#__PURE__*/
      React.createElement(TimeDisplay, { id: "time-left", timeLeft: this.state.timeLeft }), /*#__PURE__*/
      React.createElement(Button, { id: "start_stop", className: "start-stop", onClick: this.controlCountDown }, "start / pause"), /*#__PURE__*/
      React.createElement(Button, { id: "reset", className: "reset", onClick: this.resetTimer }, "reset")), /*#__PURE__*/

      React.createElement("audio", { id: "beep", preload: "auto",
        src: "https://goo.gl/65cBl1",
        ref: audio => {this.audioBeep = audio;} })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));