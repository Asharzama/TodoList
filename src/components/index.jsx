import React, { useState } from "react";
import "../App.css";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useRef } from "react";

export function Todo(props) {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [editItem, setEditItem] = useState("");
  const [alert, setAlert] = useState("hidden");

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
      </div>

      <p style={{ visibility: `${alert}`, color: "red" }}>Please Add list Item</p>

      {todoList.map((todo, index) => (
        <div id="item" key={index}>
          <span className="item" onClick={() => checkBox(todo, index)}>{todo.work}</span>
          <div>

            <button onClick={() => editItemHandler(todo, index)}>
              <AiFillEdit size="1.5em" />
            </button>

            <button onClick={() => deleteItem(index)}>
              <MdDelete size="1.5em" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
