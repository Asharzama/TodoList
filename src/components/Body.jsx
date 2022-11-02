import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdCheck } from "react-icons/md";
import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { editContext } from "../App";

const Body = () => {
  const { setEditedItem, sortItems, todoList, setTodoList, setTodo, inputRef } =
    useContext(editContext);
  const [displayList, setDisplayList] = useState([]);
  const deleteItem = (remove) => {
    setTodoList([...todoList.filter((todo, index) => index !== remove)]);
  };

  useEffect(() => {
    if (sortItems === "Completed") {
      let copy = [...todoList];
      setDisplayList(copy.filter((item) => item.isChecked));
    } else if (sortItems === "Incomplete") {
      let copy = [...todoList];
      setDisplayList(copy.filter((item) => !item.isChecked));
    } else {
      setDisplayList(todoList);
    }
  }, [sortItems, todoList]);

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
      setEditedItem(index);
    }
    inputRef.current.focus();
  };
  return (
    <div>
      {displayList.map((todo, index) => (
        <div id="item" key={index}>
          <span className="item">{todo.work}</span>
          <div>
            <button className="Checked" onClick={() => checkBox(todo, index)}>
              <MdCheck size="1.5em" />
              <span className="tooltiptext">Task Completed</span>
            </button>
            <button
              className="Edit"
              onClick={() => editItemHandler(todo, index)}
            >
              <AiFillEdit size="1.5em" />
              <span className="tooltiptext">Edit Task</span>
            </button>

            <button className="Delete" onClick={() => deleteItem(index)}>
              <MdDelete size="1.5em" />
              <span className="tooltiptext">Delete Task</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
