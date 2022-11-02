import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { editContext } from "../App";

const Header = (props) => {
  const {
    editedItem,
    setEditedItem,
    setSortItems,
    setTodoList,
    todoList,
    setTodo,
    todo,
    inputRef,
  } = useContext(editContext);
  const [alert, setAlert] = useState("hidden");
  const addItem = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = () => {

    if (todo !== "") {
      setAlert("hidden");
      if (editedItem !== "") {
        setTodoList([
          ...todoList.map((ele, ind) => {
            if (ind === editedItem) {
              ele.work = todo;
            }
            return ele;
          }),
        ]);
        setTodo("");
        setEditedItem("");
      } else {

        setTodoList([...todoList, { work: todo, isChecked: false }]);
        setTodo("");
      }
    } else {
      setAlert("visible");
    }
  };
  return (
    <div>
      <h1>TO DO List</h1>
      <div className="input-wrapper">
        <input
          ref={inputRef}
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

        <button className="add" onClick={addTodo} >
        <AiOutlinePlus size="2em" />
        </button>
        <select
          className="options"
          onChange={(e) => setSortItems(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <p style={{ visibility: `${alert}`, color: "red" }}>
        Please Add list Item
      </p>
    </div>
  );
};

export default Header;
