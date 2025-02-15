import { useState } from "react";
import logo from "../../assets/react.svg";
import TodoData from "./TodoData";
import TodoNews from "./TodoNews";

const ToDoApp = () => {
  const [todoList, setToDoList] = useState([]);

  const addNewToDo = (inputValue) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      inputValue: inputValue,
    };
    setToDoList([...todoList, newTodo]);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  //////////////// delete
  const deleteToDo = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id);
    setToDoList(newTodo);
    console.log("check id", newTodo);
  };
  return (
    <div>
      <TodoNews addNewToDo={addNewToDo} />
      {todoList.length > 0 ? (
        <TodoData todoList={todoList} deleteToDo={deleteToDo} />
      ) : (
        <div>
          <img src={logo} />
        </div>
      )}
    </div>
  );
};

export default ToDoApp;
