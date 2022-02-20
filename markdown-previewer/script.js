const placeholder =
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
const Button = ({ className, onClick, children }) => /*#__PURE__*/
React.createElement("button", { className: className, onClick: onClick }, /*#__PURE__*/React.createElement("span", null, children));

const Editor = ({ value, onChange }) => /*#__PURE__*/
React.createElement("textarea", { id: "editor", type: "text-area", value: value,
  onChange: onChange });



const Preview = ({ markdown }) => /*#__PURE__*/
React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(markdown) } });

const Toolbar = ({ title, onClick }) => /*#__PURE__*/
React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
React.createElement("h3", null, title), /*#__PURE__*/
React.createElement(Button, { className: "toggle", onClick: onClick }, "toggle"));




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false };


    this.HandleChange = this.HandleChange.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  HandleChange(e) {
    this.setState({
      markdown: e.target.value });

  }

  toggleEditor() {
    this.setState({
      editorMaximized: !this.state.editorMaximized });

  }

  togglePreview() {
    this.setState({
      previewMaximized: !this.state.previewMaximized });

  }

  render() {
    const { markdown } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: this.state.editorMaximized ? "editor-wrapper maxmized" : "editor-wrapper" }, /*#__PURE__*/
      React.createElement(Toolbar, { title: "Editor", onClick: this.toggleEditor }), /*#__PURE__*/
      React.createElement(Editor, {
        value: markdown,
        onChange: this.HandleChange })), /*#__PURE__*/

      React.createElement("div", { className: this.state.previewMaximized ? "preview-wrapper maxmized" : "preview-wrapper" }, /*#__PURE__*/
      React.createElement(Toolbar, { title: "preview", onClick: this.togglePreview }), /*#__PURE__*/
      React.createElement(Preview, { markdown: markdown }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));