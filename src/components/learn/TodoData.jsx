import "../learn/TodoData.scss";

const TodoData = (props) => {
  const { todoList, deleteToDo } = props;
  console.log(">>> check props: ", todoList);

  const handleDelete = (id) => {
    deleteToDo(id);
  };

  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        console.log(">>> check map: ", item, index);
        return (
          <div className={`todo-item`} key={item.id}>
            <div> {item.name}</div>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
