import React, { useState } from "react";
import "../App.css";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDelete,MdCheck } from "react-icons/md";
import { useRef } from "react";
import { useEffect } from "react";

export function Todo(props) {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [editItem, setEditItem] = useState("");
  const [alert, setAlert] = useState("hidden");
  const [sortItems, setSortItems] = useState("All");
  const [displayList, setDisplayList] = useState([]);

  useEffect(()=>{
    if(sortItems === "Completed"){
      let copy = [...todoList];
      setDisplayList(copy.filter((item)=>item.isChecked));
    }
    else if(sortItems === "Incomplete"){
      let copy = [...todoList];
      setDisplayList(copy.filter((item)=> !item.isChecked));
    }
    else{
      setDisplayList(todoList);
    }
  },[sortItems, todoList])

  const inputRef = useRef(null);

  const addItem = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = () => {
    if (todo !== "") {
      setAlert("hidden");
      if (editItem !== "") {
        setTodoList([
          ...todoList.map((ele, ind) => {
            if (ind === editItem) {
              ele.work = todo;
            }
            return ele;
          }),
        ]);
        setTodo("");
        setEditItem("");
      } else {
        setTodoList([...todoList, { work: todo, isChecked: false }]);
        setTodo("");
      }
    } else {
      setAlert("visible");
    }
  };

  const deleteItem = (remove) => {
    setTodoList([...todoList.filter((todo, index) => index !== remove)]);
  };

  const checkBox = (todo, index) => {
    if (todo.isChecked === false) {
      setTodoList([
        ...todoList.map((item, ind) =>
          index === ind
            ? { work: <strike>{item.work}</strike>, isChecked: true }
            : item
        ),
      ]);
    }
  };

  const editItemHandler = (todo, index) => {
    if (todo.isChecked === false) {
      const seletedTodo = todoList.find((todo, i) => i === index);
      setTodo(seletedTodo.work);
      setEditItem(index);
    }
    inputRef.current.focus();
  };

  return (
    <div id="container">
      <h1>TODO APP</h1>
      <div className="input-wrapper">
        <input ref={inputRef}
          type={"text"}
          className="text"
          placeholder={props.placeholder}
          value={todo}
          onChange={addItem}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />

        <button className="add" onClick={addTodo}>
          <AiOutlinePlus size="2.5em" />
        </button>
        <select className="options" onChange={(e)=>setSortItems(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <p style={{ visibility: `${alert}`, color: "red" }}>Please Add list Item</p>

      {displayList.map((todo, index) => (
        <div id="item" key={index}>
          <span className="item" >{todo.work}</span>
          <div>
            <button className="Checked" onClick={() => checkBox(todo, index)}>
              <MdCheck size="1.5em"/><span className="tooltiptext">Task Completed</span>
            </button>
            <button className="Edit" onClick={() => editItemHandler(todo, index)}>
              <AiFillEdit size="1.5em" />
            <span className="tooltiptext">Edit Task</span></button>

            <button className="Delete" onClick={() => deleteItem(index)}>
              <MdDelete size="1.5em" /><span className="tooltiptext">Delete Task</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
