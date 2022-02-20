const localStorageKey = '_yun_react_recipeBox';
class LocalStorageManager {
  set(obj) {
    let currentState = JSON.stringify(obj);
    localStorage.setItem('_yun_react_recipeBox', currentState);
  }
  get() {
    let currentState = localStorage.getItem('_yun_react_recipeBox');
    return JSON.parse(currentState);
  }}

const initialRecipeList = [
{
  id: 0,
  title: 'Artichoke Pasta',
  ingrediends: ['2 tablespoons butter', '2 cloves garlic, minced', '1 cup heavy cream', '3/4 teaspoon salt', '1 teaspoon fresh-ground black pepper', '2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters', '3/4 pound fusilli', '1/2 cup grated Parmesan cheese', '2 tablespoons chopped chives, scallion tops, or parsley'],
  steps: ['In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes.', 'In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.'],
  imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--9688_12.jpg?itok=5z2HVwqp' },

{
  id: 1,
  title: 'Garlic Chicken',
  ingrediends: ["3 tablespoons butter", "1 teaspoon seasoning salt", "1 teaspoon onion powder ", "4 skinless, boneless chicken breast halves", "2 teaspoons garlic powder"],
  steps: ["Melt butter in a large skillet over medium high heat.", "Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.", "Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear."],
  imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/09/crunchy-garlic-chicken.jpg?itok=y8NzFZyM' },

{
  id: 2,
  title: 'Easy Chocolate Pie',
  ingrediends: ["1 (12 ounce) can evaporated milk", "1 (5.9 ounce) package chocolate instant pudding mix", "1 (6.5 ounce) can whipped cream", "1/2 cup miniature semi-sweet chocolate chips (optional)", "1 (9 inch) graham cracker pie crust", "Another can of whipped cream for garnish (optional)"],
  steps: ["Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.", "Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover.", "Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired."],
  imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--931468_11.jpg?itok=wY_OdJUi' },

{
  id: 3,
  title: 'Lime Chicken Tacos',
  ingrediends: ['1 1/2 pounds skinless, boneless chicken breast meat - cubed', '1/8 cup red wine vinegar', '1/2 lime, juiced', '1 teaspoon white sugar', '1/2 teaspoon salt', '1/2 teaspoon ground black pepper', '2 green onions, chopped', '2 cloves garlic, minced', '1 teaspoon dried oregano', '10 (6 inch) corn tortillas', '1 tomato, diced', '1/4 cup shredded lettuce', '1/4 cup shredded Monterey Jack cheese', '1/4 cup salsa'],
  steps: ['Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.', 'Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.'],
  imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/04/lighter-chicken-tacos.jpg?itok=Oi4pFDT5' }];



const separator = '\\';
const ingredPlaceholder = 'Separate each ingredient with a ' + separator + ': \n\nMilk ' + separator + '2 Eggs' + separator + '1/3 Cup Sugar';

const stepsPlaceholder = 'Separate each step with a ' + separator + ': \n\nPreheat oven to 350°F ' + separator + '\nCombine ingredients in pie crust' + separator + '\nBake until crust is golden brown.';


function parseInput(input) {
  return input.replace(/\n/g, '').split(separator);
}

function findIndex(objectList, id) {
  return objectList.map(item => item.id).indexOf(id);
}

const RecipeIndex = ({ recipeList, onClick, currentId }) => /*#__PURE__*/
React.createElement("div", { className: "recipe-index" },


recipeList.length ? recipeList.map((recipe) => /*#__PURE__*/
React.createElement("h3", { className: recipe.id == currentId ? 'recipe-title current' : 'recipe-title', onClick: onClick, "data-id": recipe.id }, recipe.title)) : /*#__PURE__*/

React.createElement("h3", { className: "empty" }, "You have no recipe yet."));



const RecipeDisplay = ({ recipe, onEdit, onAdd, onDelete }) => /*#__PURE__*/
React.createElement("div", { className: "recipe-display" }, /*#__PURE__*/
React.createElement("div", { className: "header" }, /*#__PURE__*/
React.createElement("h2", { className: "recipe-title" }, recipe.title), /*#__PURE__*/
React.createElement("button", { className: "edit", onClick: onEdit }, /*#__PURE__*/React.createElement("i", { className: "fa fa-pencil-square-o" })), /*#__PURE__*/
React.createElement("button", { className: "delete", onClick: onDelete }, /*#__PURE__*/React.createElement("i", { className: "fa fa-trash-o" }))), /*#__PURE__*/

React.createElement("div", { className: "recipe-content" }, /*#__PURE__*/
React.createElement("div", { className: "image-wrapper" }, /*#__PURE__*/React.createElement("img", { src: recipe.imgUrl == '' ? 'https://imgplaceholder.com/420x320/ff7f7f/333333/fa-image' : recipe.imgUrl })), /*#__PURE__*/
React.createElement("div", { className: "ingrediends" }, /*#__PURE__*/
React.createElement("h3", null, "Ingrediends:"), /*#__PURE__*/
React.createElement("ul", null, recipe.ingrediends.map((item, i) => /*#__PURE__*/React.createElement("li", { key: i }, item)))), /*#__PURE__*/


React.createElement("div", { className: "steps" }, /*#__PURE__*/
React.createElement("h3", null, "Directions:"), /*#__PURE__*/
React.createElement("ol", null, recipe.steps.map((item, i) => /*#__PURE__*/React.createElement("li", { key: i }, item))))));






const Editor = ({ title, ingred, steps, image, onSave, onClose, handleTitleChange, handleIngredChange, handleStepsChange, handleImageChange }) => /*#__PURE__*/
React.createElement("div", { className: "editor" }, /*#__PURE__*/
React.createElement("div", { className: "header" }, /*#__PURE__*/
React.createElement("h2", null, " ", title == '' ? 'Add a Recipe' : 'Edit Recipe', " "), /*#__PURE__*/
React.createElement("button", { className: "close", onClick: onClose }, " ", /*#__PURE__*/React.createElement("i", { className: "fa fa-times" }), " ")), /*#__PURE__*/

React.createElement("div", { className: "content" }, /*#__PURE__*/
React.createElement("label", { className: "required" }, "Recipe"), /*#__PURE__*/
React.createElement("input", { type: "text-field", value: title, onChange: handleTitleChange }), /*#__PURE__*/
React.createElement("label", null, "Image url"), /*#__PURE__*/
React.createElement("input", { type: "text-field", value: image, onChange: handleImageChange }), /*#__PURE__*/
React.createElement("label", null, "Ingrediends (", 'separate each ingredient with a ' + separator, ")"), /*#__PURE__*/
React.createElement("textarea", { type: "text-field", placeholder: ingredPlaceholder, value: ingred.join(separator), onChange: handleIngredChange }), /*#__PURE__*/
React.createElement("label", null, "Directions (", 'separate each step with a ' + separator, ")"), /*#__PURE__*/
React.createElement("textarea", { type: "text-field", placeholder: stepsPlaceholder, value: steps.join(separator + '\n\n'), onChange: handleStepsChange })), /*#__PURE__*/

React.createElement("div", { className: "footer" }, /*#__PURE__*/
React.createElement("button", { className: "save", onClick: onSave }, " ", title == '' ? 'Add' : 'Save', " "), /*#__PURE__*/
React.createElement("button", { className: "close", onClick: onClose }, " Close ")));




class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeList: initialRecipeList,
      currentId: 0,
      editId: null,
      editRecipe: null,
      showIndex: false,
      showEditor: false,
      newTitle: '',
      newIngred: [],
      newSteps: [],
      newImage: '' };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleIndex = this.toggleIndex.bind(this);
    this.chooseRecipe = this.chooseRecipe.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIngredChange = this.handleIngredChange.bind(this);
    this.handleStepsChange = this.handleStepsChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  // handle click outside of the dropdown
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target) && !document.getElementById('toggle-index').contains(e.target)) {
      this.setState({
        showIndex: false });

    }
  }

  toggleIndex() {
    this.setState({
      showIndex: !this.state.showIndex });

  }
  chooseRecipe(e) {
    this.setState({
      currentId: parseInt(e.target.getAttribute('data-id')),
      showEditor: false });

  }


  handleEdit() {
    const editRecipe = this.state.recipeList.find(item => item.id == this.state.currentId);
    this.setState({
      editId: this.state.currentId,
      newTitle: editRecipe.title,
      newIngred: editRecipe.ingrediends,
      newSteps: editRecipe.steps,
      newImage: editRecipe.imgUrl,
      showEditor: true });

  }

  handleDelete() {
    const { recipeList, currentId } = this.state;

    let index = findIndex(recipeList, currentId);
    if (confirm(`Are you sure you want to delete ${recipeList[index].title} from the Recipe Box?`)) {
      const updatedList = [...recipeList.slice(0, index), ...recipeList.slice(index + 1)];
      index = index > updatedList.length - 1 ? 0 : index;

      this.setState({
        recipeList: updatedList,
        currentId: updatedList.length > 0 ? updatedList[index].id : null });

    }

  }

  handleAdd() {
    const currentList = this.state.recipeList;
    let editId = 0;
    if (currentList.length > 0) {
      editId = currentList[currentList.length - 1].id + 1;
    }
    this.setState({
      editId: editId,
      editRecipe: null,
      newTitle: '',
      newIngred: [],
      newSteps: [],
      newImage: '',
      showEditor: true });


  }

  handleSave() {
    const { recipeList, currentId, editId, newTitle, newIngred, newSteps, newImage } = this.state;
    if (!newTitle || newTitle == '') {
      alert('Your recipe must have a name!');
      return;
    }
    const newRecipe = {
      id: editId,
      title: newTitle,
      ingrediends: newIngred,
      steps: newSteps,
      imgUrl: newImage };

    let updatedList = [];
    if (editId == currentId) {
      const recipeIndex = recipeList.map(item => item.id).indexOf(currentId);
      updatedList = [...recipeList.slice(0, recipeIndex), newRecipe, ...recipeList.slice(recipeIndex + 1)];
    } else {
      updatedList = [...recipeList, newRecipe];
      this.setState({
        currentId: editId });

    }

    this.setState({
      recipeList: updatedList,
      showEditor: false });


  }

  handleClose() {
    this.setState({
      showEditor: false });

  }

  handleTitleChange(e) {
    this.setState({
      newTitle: e.target.value });

  }
  handleIngredChange(e) {
    this.setState({
      newIngred: parseInput(e.target.value) });

  }
  handleStepsChange(e) {console.log(parseInput(e.target.value));
    this.setState({
      newSteps: parseInput(e.target.value) });

  }
  handleImageChange(e) {
    this.setState({
      newImage: e.target.value });

  }

  handleNav(navType) {
    const { recipeList, currentId } = this.state;
    const currentIndex = findIndex(recipeList, currentId);
    let newCurrentId;
    if (navType == 'prev') {
      newCurrentId = currentIndex == 0 ? recipeList.length - 1 : currentIndex - 1;
    }
    if (navType == 'next') {
      newCurrentId = currentIndex == recipeList.length - 1 ? 0 : currentIndex + 1;
    }
    this.setState({
      currentId: newCurrentId });

  }

  render() {
    const { recipeList, currentId, editId, editRecipe, showIndex, showEditor, newTitle, newIngred, newSteps, newImage } = this.state;
    const currentRecipe = recipeList.find(item => item.id == currentId);
    const currentIndex = findIndex(recipeList, currentId);
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "box-header" }, /*#__PURE__*/
      React.createElement("h1", null, "Recipe Box"), /*#__PURE__*/
      React.createElement("button", { className: "add", onClick: this.handleAdd }, "Add a Recipe"), /*#__PURE__*/
      React.createElement("button", { id: "toggle-index", className: showIndex ? 'index-btn open' : 'index-btn', onClick: this.toggleIndex }, /*#__PURE__*/React.createElement("i", { className: "fa fa-bars" }), " "),

      showIndex ? /*#__PURE__*/
      React.createElement("div", { ref: node => this.dropdownRef = node }, /*#__PURE__*/
      React.createElement(RecipeIndex, {
        recipeList: recipeList,
        onClick: this.chooseRecipe,
        currentId: currentId })) :



      ''),





      recipeList.length ? /*#__PURE__*/React.createElement(RecipeDisplay, {
        recipe: currentRecipe,
        onEdit: this.handleEdit,
        onDelete: this.handleDelete }) :
      '',



      showEditor ? /*#__PURE__*/
      React.createElement("div", { className: "editor-wrapper" }, /*#__PURE__*/React.createElement(Editor, {
        title: newTitle,
        ingred: newIngred,
        steps: newSteps,
        image: newImage,
        onSave: this.handleSave,
        onClose: this.handleClose,
        handleTitleChange: this.handleTitleChange,
        handleIngredChange: this.handleIngredChange,
        handleStepsChange: this.handleStepsChange,
        handleImageChange: this.handleImageChange })) :
      '',


      recipeList.length ? /*#__PURE__*/
      React.createElement("div", { className: "toobar" }, /*#__PURE__*/
      React.createElement("button", { className: "nav prev", onClick: () => this.handleNav('prev'), disabled: currentIndex == 0 }, "Prev Recipe"), /*#__PURE__*/
      React.createElement("button", { className: "nav next", onClick: () => this.handleNav('next'), disabled: currentIndex == recipeList.length - 1 }, "Next Recipe"), " ") :
      ''));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Recipe, null), document.getElementById('app'));