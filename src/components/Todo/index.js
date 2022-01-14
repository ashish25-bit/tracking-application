import "./index.css";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import { useTodo } from '../../contexts/TodoContext';

function Todo({ name, data }) {
  const { setTodos } = useTodo();

  function changeCompletedStatus(index) {
    if (index < 0 || index >= data.length)
      return;

    data[index].completed = !data[index].completed;
    setTodos(prevState => ({ ...prevState, [name]:data }))
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
