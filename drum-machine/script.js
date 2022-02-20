const DATA = [
{ name: 'Q',
  keycode: 81,
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{ name: 'W',
  keycode: 87,
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },

{ name: 'E',
  keycode: 69,
  id: 'Kick-and-Hat',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{ name: 'A',
  keycode: 65,
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },

{ name: 'S',
  keycode: 83,
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{ name: 'D',
  keycode: 68,
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' },

{ name: 'Z',
  keycode: 90,
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },

{ name: 'X',
  keycode: 88,
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{ name: 'C',
  keycode: 67,
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' }];



class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false };


    this.activatePad = this.activatePad.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  activatePad() {
    if (this.props.powerOn) {
      this.setState({
        active: true });

      setTimeout(() => this.setState({ active: false }), 100);

      this.playSound();

      this.props.updateActivePadId(this.props.pad.id);
    }
  }
  playSound() {
    const audio = this.audio;
    audio.volume = this.props.volume / 100;
    audio.play();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.pad.keycode) {
      this.activatePad();
    }
  }

  render() {
    const { pad } = this.props;
    const className = this.state.active ? 'active' : '';
    return /*#__PURE__*/(
      React.createElement("div", { id: pad.id, className: `drum-pad ${className}`, onClick: this.activatePad }, /*#__PURE__*/
      React.createElement("span", null, pad.name), /*#__PURE__*/
      React.createElement("audio", { id: pad.name, className: "clip", src: pad.url, ref: el => this.audio = el })));


  }}


const ControlPanel = ({ activePadId, switchPower, powerOn, volume, changeVolume }) => {
  const powerClass = powerOn ? 'power-button power-on' : 'power-button';
  return /*#__PURE__*/(
    React.createElement("div", { className: "control-panel" }, /*#__PURE__*/
    React.createElement("div", { className: powerClass, onClick: switchPower }, /*#__PURE__*/
    React.createElement("span", null, "Power")), /*#__PURE__*/

    React.createElement("div", { className: "volume-control" }, /*#__PURE__*/
    React.createElement("span", null, "Volume"), /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      value: volume,
      min: "1",
      max: "100",
      onChange: changeVolume }), /*#__PURE__*/

    React.createElement("span", { className: "volume-value" }, volume)), /*#__PURE__*/

    React.createElement("div", { id: "display", className: "display" },
    activePadId)));




};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePadId: '',
      powerOn: true,
      volume: 50 };

    this.updateActivePadId = this.updateActivePadId.bind(this);
    this.switchPower = this.switchPower.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }
  updateActivePadId(id) {
    this.setState({
      activePadId: id });

  }
  switchPower() {
    this.setState(
    {
      powerOn: !this.state.powerOn });


  }
  changeVolume(e) {
    this.setState({
      volume: e.target.value });

  }
  render() {
    const { activePadId, powerOn, volume } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-machine-wrapper" }, /*#__PURE__*/
      React.createElement("h1", null, "Drum Machine"), /*#__PURE__*/
      React.createElement(ControlPanel, {
        activePadId: activePadId,
        switchPower: this.switchPower,
        powerOn: powerOn,
        volume: volume,
        changeVolume: this.changeVolume }), /*#__PURE__*/

      React.createElement("div", { className: "pads" },
      DATA.map((pad) => /*#__PURE__*/
      React.createElement(DrumPad, {
        pad: pad,
        updateActivePadId: this.updateActivePadId,
        powerOn: powerOn,
        volume: volume })))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('drum-machine'));