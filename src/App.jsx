import { useState } from "react";
import logo from "./assets/react.svg";
import TodoData from "./components/learn/TodoData";
import TodoNews from "./components/learn/TodoNews";

const App = () => {
  const [todoList, setToDoList] = useState([]);

  const addNewToDo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name,
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
    <>
      <TodoNews addNewToDo={addNewToDo} />

      {todoList.length > 0 ? (
        <TodoData todoList={todoList} deleteToDo={deleteToDo} />
      ) : (
        <div>
          <img src={logo} />
        </div>
      )}
    </>
  );
};

export default App;
