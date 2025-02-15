import { useState } from "react";

const TodoNews = (props) => {
  const [inputValue, setInputValue] = useState("");
  const { addNewToDo } = props;
  /////////////////////////////////////
  const handleClick = () => {
    addNewToDo(inputValue);
    setInputValue("");
  };
  ///////////////////////////
  const handleOnChange = (event) => {
    setInputValue(event);
  };
  ///////////////////

  return (
    <>
      <div className="todo-container">
        <div className="todo-title">
          <h1>Todo List</h1>
        </div>
        <div className="todo-input">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => handleOnChange(event.target.value)}
          />
          <button onClick={handleClick} style={{ cursor: "pointer" }}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoNews;
