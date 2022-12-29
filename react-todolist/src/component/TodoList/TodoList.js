import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { getTodos, addTodo, removeTodo, editTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    /* console.log(
      "handleSubmit1",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    ); // 1, 1 */

    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
        edited: false
      };
      //batching
      addTodo(newTodo).then((todo) => {
        this.setState((prevState) => {
          console.log(this.state.todos.length, prevState.todos.length); //0,0
          return {
            todos: [...prevState.todos, todo],
            inputText: "",
          };
        });

        this.setState((prevState) => {
          console.log(this.state.todos.length, prevState.todos.length);//0,1
          return {
            todos: [...this.state.todos, todo],
            inputText: "",
          };
        });

        /* console.log(
          "handleSubmit2",
          this.state.todos.length,
          document.querySelectorAll(".todoitem").length
        ); //1,1 */
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  handleEdit = (id, data) => {
    editTodo(id, data).then((res) => {
      console.log(res);
      let {title, edited, completed} = res;
      this.setState({
        todos: this.state.todos.map((todo) => +todo.id === +id ? {...todo, title, edited, completed} : todo)
      })
    })
  }

  shouldComponentUpdate() {
    /* console.log(
      "scu",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    ); //1,1 */
    return true;
  }
  /*
    virtual DOM: object
    DOM(document object model): object
    map in jsx:
    key:


    diffing algorithm:

    jsx is a syntax sugar for React.createElement()
    dom node: children
    dom: tree, root parent

    state:
    [
      {},
      {},
      {}
    ]



    lifecycle:
      1. change of state or props
      2. trigger the render cycle, shouldComponentUpdate, render
      3. render method create new virtual dom object using the new state or props
      4. old virtual dom, diffing algorithm, compare new virtual
      5. update the real dom more efficiently, reconciliation
      6. componentDidUpdate


    setState update batching
    setState async
  */

  render() {
    /* console.log(
      "render",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    );  */
    //2,1
    /*   console.log("root",document.querySelectorAll("#root"))
    console.log("jsx",<div>123</div> );//virtual node, virtual dom

    console.log("js",React.createElement("div", null,"123"))   */

    /*
      without key
      1. two virtual doms without key
      2. diffing algorithm, React doesn't know which is which, so it have to compare the difference one by one

      with key
      1. two virtual doms with key
      2. React can identify which one has changed or removed or added, so it will remain the rest of the element intact

    */
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__content">
          <h3>Tasks to Complete</h3>
          {this.state.todos.map((todo) => !todo.completed ? (
            <TodoItem key={todo.id} todo={todo} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
          ) : null)}
        </ul>
        <ul className="todolist__content">
          <h3>Completed</h3>
          {this.state.todos.map((todo) => todo.completed ? (
            <TodoItem key={todo.id} todo={todo} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
          ) : null)}
        </ul>
      </section>
    );
  }

  componentDidUpdate() {
    /* console.log(
      "cdu",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    ); //2,2 */
  }

  componentDidMount() {
    /* console.log(
      "cdm",
      this.state.todos.length,
      document.querySelectorAll(".todoitem").length
    ); //0,0 */
    getTodos().then((data) => {
      /* console.log(data); */
      this.setState({
        todos: data,
      });
    });
    //console.log("cdm1",this.state.todos.length, document.querySelectorAll(".todoitem").length); //0,0
  }
}

export default TodoList;
