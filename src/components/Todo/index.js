import "./index.css";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function Todo({ data }) {
  return (
    <div style={{ transition: "0.4s" }}>
      {data.map((item, index) => {
        return <TodoItem key={index} text={item} />;
      })}
    </div>
  );
}

Todo.propTypes = {
  data: PropTypes.array.isRequired
};

export default Todo;
