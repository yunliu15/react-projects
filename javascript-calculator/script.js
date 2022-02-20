const isOperate = /[x/+-]/;

const Output = ({ currentValue }) => /*#__PURE__*/
React.createElement("div", { id: "display", className: "outputScreen" }, currentValue);

const Formula = ({ formula }) => /*#__PURE__*/
React.createElement("div", { className: "formulaScreen" }, formula);

const Panel = ({ clear, clickOnOperators, clickOnNumbers, clickOnDecimal, evaluate }) => /*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/
React.createElement("button", { className: "clear-btn", id: "clear", value: "AC", onClick: clear }, "AC"), /*#__PURE__*/
React.createElement("button", { className: "orperator-btn", id: "divide", value: "/", onClick: clickOnOperators }, "/"), /*#__PURE__*/
React.createElement("button", { className: "multiply-btn", id: "multiply", value: "x", onClick: clickOnOperators }, "x"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "seven", value: "7", onClick: clickOnNumbers }, "7"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "eight", value: "8", onClick: clickOnNumbers }, "8"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "nine", value: "9", onClick: clickOnNumbers }, "9"), /*#__PURE__*/
React.createElement("button", { className: "orperator-btn", id: "subtract", value: "-", onClick: clickOnOperators }, "-"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "four", value: "4", onClick: clickOnNumbers }, "4"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "five", value: "5", onClick: clickOnNumbers }, "5"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "six", value: "6", onClick: clickOnNumbers }, "6"), /*#__PURE__*/
React.createElement("button", { className: "orperator-btn", id: "add", value: "+", onClick: clickOnOperators }, "+"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "one", value: "1", onClick: clickOnNumbers }, "1"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "two", value: "2", onClick: clickOnNumbers }, "2"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "three", value: "3", onClick: clickOnNumbers }, "3"), /*#__PURE__*/
React.createElement("button", { className: "orperator-btn equals", id: "equals", value: "=", onClick: evaluate }, "="), /*#__PURE__*/
React.createElement("button", { className: "number-btn zero", id: "zero", value: "0", onClick: clickOnNumbers }, "0"), /*#__PURE__*/
React.createElement("button", { className: "number-btn", id: "decimal", value: ".", onClick: clickOnDecimal }, "."));


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      formula: '0',
      evaluated: false,
      result: '' };

    this.clear = this.clear.bind(this);
    this.clickOnNumbers = this.clickOnNumbers.bind(this);
    this.clickOnOperators = this.clickOnOperators.bind(this);
    this.clickOnDecimal = this.clickOnDecimal.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  clear() {
    this.setState({
      currentValue: '0',
      formula: '0',
      evaluated: false,
      result: '' });

  }

  clickOnNumbers(e) {
    let newFormula = this.state.formula;
    const value = e.target.value;
    let newValue = this.state.currentValue;
    if (this.state.evaluated) {
      newFormula = '0';
      newValue = value;
      this.setState({
        evaluated: false });

    } else {
      if (/\d|\.$/.test(newValue) && newValue != '0') {
        newValue += value;
      } else newValue = value;
    }

    this.setState({
      currentValue: newValue,
      formula: newFormula === '0' ? value : newFormula + value });

  }

  clickOnOperators(e) {
    const value = e.target.value;
    let newFormula = this.state.formula;
    if (this.state.evaluated) {
      newFormula = this.state.result;
      this.setState({
        evaluated: false });

    }
    if (!isOperate.test(this.state.currentValue)) {
      newFormula += value;
    } else {
      newFormula = newFormula.slice(0, -1) + value;
    }
    this.setState({
      currentValue: value,
      formula: newFormula });

  }

  clickOnDecimal(e) {
    const value = e.target.value;
    let newFormula = this.state.formula,
    newValue = this.state.currentValue;
    if (this.state.evaluated) {
      newFormula = this.state.result;
      if (/\d*\.\d*$/.test(newFormula)) {
        newFormula = '0';
        newValue = '0';
      }
      this.setState({
        evaluated: false });

    }
    if (!/\d*\.\d*$/.test(newFormula)) {
      if (/[x/+-]$/.test(newFormula)) {
        newFormula = newFormula + '0' + value;
        newValue = '0' + value;
      } else
      {
        newFormula = newFormula + value;
        newValue = newValue + value;
      }
      this.setState({
        currentValue: newValue,
        formula: newFormula });


    }

  }

  evaluate() {
    const formula = this.state.formula;
    let answer = eval(formula.replace(/x/g, '*'));
    this.setState({
      formula: formula + '=' + answer,
      currentValue: answer,
      evaluated: true,
      result: answer });

  }

  render() {
    const { currentValue, formula } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement(Formula, { formula: formula }), /*#__PURE__*/
      React.createElement(Output, { currentValue: currentValue }), /*#__PURE__*/
      React.createElement(Panel, {
        clear: this.clear,
        clickOnNumbers: this.clickOnNumbers,
        clickOnOperators: this.clickOnOperators,
        clickOnDecimal: this.clickOnDecimal,
        evaluate: this.evaluate })));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById('app'));