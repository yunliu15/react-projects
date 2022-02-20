const buttonList = [
{ id: '1', color: 'green', active: false },
{ id: '2', color: 'red', active: false },
{ id: '3', color: 'yellow', active: false },
{ id: '4', color: 'blue', active: false }];

const totalCounts = 20;

const audioList = [
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')];


const Button = ({ color, value, isActive, onClick, clickable }) => {
  let className = 'button ' + color;
  className = isActive ? className + ' active' : className;
  className = clickable ? className : className + ' disabled';
  return /*#__PURE__*/(
    React.createElement("button", { className: className, value: value, onClick: onClick }));


};

function generatePlayList() {
  return Array(totalCounts).fill('0').map(() => (Math.floor(Math.random() * 4) + 1).toString());
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playList: generatePlayList(),
      clicked: 0,
      currentCount: 0,
      activeButton: null,
      playFinished: false,
      gameMessage: 'Click start to play',
      clickable: false };


    this.activateButton = this.activateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      playList: generatePlayList(),
      clicked: 0,
      currentCount: 1,
      activeButton: null,
      playFinished: false,
      gameMessage: '',
      clickable: false });

  }
  startGame() {
    this.reset();
    this.activateButton(1);
  }

  activateButton(currentCount) {
    let i = 0;
    this.setState({
      playFinished: false });

    let timeInterval = setInterval(() => {
      if (i < currentCount) {
        const listValue = this.state.playList[i];
        let index = parseInt(listValue) - 1;
        this.setState({
          activeButton: this.state.playList[i] });

        audioList[index].play();console.log('i', i);
        setTimeout(() => {
          this.setState({
            activeButton: null });

        }, 400);
        i++;
      } else {
        clearInterval(timeInterval);
        this.setState({
          playFinished: true,
          gameMessage: 'Go!',
          clickable: true });

      }
    }, 1000);


  }


  handleClick(e) {
    const newClick = e.target.value;
    let index = parseInt(newClick) - 1;
    const { clicked, currentCount, playFinished, playList } = this.state;
    if (playFinished) {
      if (clicked < currentCount) {
        this.setState({
          clicked: clicked + 1,
          activeButton: newClick });

        audioList[index].play();console.log('index', index);

        setTimeout(() => {
          this.setState({
            activeButton: null });

        }, 400);

        if (newClick != playList[clicked]) {
          this.endGame();
          return;
        }
      }
      if (clicked + 1 === currentCount) {
        if (currentCount == totalCounts) {
          this.setState({
            gameMessage: 'You win!',
            clickable: false });

          return;
        }
        setTimeout(() => {
          this.activateButton(currentCount + 1);
        }, 1000);
        this.setState({
          clicked: 0,
          gameMessage: 'Well Done!',
          clickable: false,
          currentCount: currentCount + 1 });


      }
    }


  }

  endGame() {
    this.reset();
    this.setState({
      gameMessage: 'Game Over' });

  }


  render() {
    const { activeButton, clickable, gameMessage, currentCount } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
      React.createElement("h1", null, "Simon Game"), /*#__PURE__*/
      React.createElement("div", { className: "panel-wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "button-wrapper" },

      buttonList.map((button) => /*#__PURE__*/
      React.createElement(Button, {
        color: button.color,
        value: button.id,
        isActive: button.id === activeButton,
        onClick: this.handleClick,
        clickable: clickable }))), /*#__PURE__*/




      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("button", { className: "start", onClick: this.startGame }, "Start"), /*#__PURE__*/
      React.createElement("div", { className: "game-message" }, gameMessage), /*#__PURE__*/
      React.createElement("div", { className: "count" }, currentCount > 0 ? currentCount : '')))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById('app'));