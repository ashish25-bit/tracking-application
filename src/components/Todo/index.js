import "./index.css";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { useTodo } from '../../contexts/TodoContext';
import { useState } from "react";

function Todo({ name, data }) {
  const { setTodos } = useTodo();
  const [menuOpenIndex, setMenuOpenIndex] = useState(-1);

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
          />
        );
      })}
    </div>
  );
}

Todo.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Todo;
