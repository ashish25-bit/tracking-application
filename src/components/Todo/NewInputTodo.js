import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function NewInputTodo({ index, insertNewTodo, setNewInputIndex }) {
  const ref = useRef();

  useEffect(() => ref?.current.focus(), []);

  function onKeyUpHandler(e) {
    if (e.code === "Escape") {
      setNewInputIndex(-1);
      return;
    }

    if (e.code === "Enter") {
      insertNewTodo(index, ref?.current.value);
    }
    return;
  }

  return (
    <input
      className="new-todo-input"
      type={"text"}
      ref={ref}
      onKeyUp={onKeyUpHandler}
    />
  );
}

export default NewInputTodo;

NewInputTodo.propTypes = {
  index: PropTypes.number.isRequired,
  insertNewTodo: PropTypes.func.isRequired,
  setNewInputIndex: PropTypes.func.isRequired,
};
