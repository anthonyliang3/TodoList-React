import React from "react";

import "./TodoItem.css";
let interval;
class TodoItem extends React.Component {
 /*  constructor(props){
    super(props);
    interval = setInterval(()=>{
      console.log("todoItem")
    },1000)
  } */
  state = {
    editedContent: this.props.todo.title
  }

  onInputChange = (e) => {
    this.setState({editedContent: e.target.value});
  }

  render() {
    const { id, title, edited, completed } = this.props.todo;
    const { onDelete, onEdit } = this.props;
    if (edited) {
      return (
        <li className="todoitem">
          <input value={this.state.editedContent} onChange={this.onInputChange}></input>
          <button className="btn btn--edit" onClick={() => onEdit(id, {"edited": false, "title": this.state.editedContent})}>Edit</button>
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            Delete
          </button>
      </li>
      )
    } else if (completed) {
      return (
        <li className="todoitem">
          <span onClick={() => onEdit(id, {"completed": !completed})}><strike>{title}</strike></span>
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      );
    } else {
      return (
        <li className="todoitem">
          <span onClick={() => onEdit(id, {"completed": !completed})}>{title}</span>
          <button className="btn btn--edit" onClick={() => onEdit(id, {"edited": true})}>Edit</button>
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      );
    }


  }
  componentWillUnmount(){
    clearInterval(interval)
    /* console.log("cwu") */
  }
}
// id, title, completed, delete button

export default TodoItem;
