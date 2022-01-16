import "./index.css";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { useTodo } from "../../contexts/TodoContext";
import { useState } from "react";
import NewInputTodo from "./NewInputTodo";

function Todo({ name, data }) {
  const { setTodos } = useTodo();
  const [menuOpenIndex, setMenuOpenIndex] = useState(-1);
  const [newInputIndex, setNewInputIndex] = useState(-1);

  function changeCompletedStatus(index) {
    if (index < 0 || index >= data.length)
      return;

    data[index].completed = !data[index].completed;
    setTodos(prevState => ({ ...prevState, [name]:data }))
  }

  function deleteTodo(index) {
    setMenuOpenIndex(-1);

    if (!(window.confirm("Press ok if you want to delete the todo")))
      return;

    if (index < 0 || index >= data.length)
      return;

    let newData = data.filter((_, dataIndex) => dataIndex !== index);
    setTodos(prevState => ( {...prevState, [name]: newData } ));
  }

  /**
   *
   * @param {number} insertIndex new index
   * @param {string} text the todo text
   */
  function insertNewTodo(insertIndex, text) {
    data.splice(insertIndex, 0, { text, completed: false });
    setTodos((prevState) => ({ ...prevState, [name]: data }));
    setNewInputIndex(-1);
  }

  return (
    <div style={{ transition: "0.4s" }}>
      {data.map((item, index) => {
        return (
          <TodoItem
            key={index}
            text={item.text}
            completed={item.completed}
            index={index}
            changeCompletedStatus={changeCompletedStatus}
            setMenuOpenIndex={setMenuOpenIndex}
            menuOpenIndex={menuOpenIndex}
            deleteTodo={deleteTodo}
            newInputIndex={newInputIndex}
            setNewInputIndex={setNewInputIndex}
            insertNewTodo={insertNewTodo}
          />
        );
      })}

      {newInputIndex === data.length && (
        <NewInputTodo
          index={data.length}
          insertNewTodo={insertNewTodo}
          setNewInputIndex={setNewInputIndex}
        />
      )}
    </div>
  );
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Todo;
