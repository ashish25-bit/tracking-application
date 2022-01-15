import "./index.css";
import PropTypes from "prop-types";
import { ReactComponent as MoreLogo } from "../../icons/more.svg";
import { useRef, useEffect, useCallback } from "react";

function TodoItem({
  text,
  index,
  completed,
  changeCompletedStatus,
  menuOpenIndex,
  setMenuOpenIndex,
  deleteTodo
}) {
  const moreContainerRef = useRef();

  const checkIfClickedOutside = useCallback((e) => {
    if (
      index === menuOpenIndex &&
      moreContainerRef.current &&
      !moreContainerRef.current.contains(e.target)
    ) setMenuOpenIndex(-1);
  }, [index, menuOpenIndex, setMenuOpenIndex]);

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [checkIfClickedOutside]);

  function handleOnKeyUpCheckbox(e) {
    if (e.keyCode !== 13) return;

    changeCompletedStatus(index);
  }

  function openMoreContainer() {
    if (index === menuOpenIndex)
      setMenuOpenIndex(-1);
    else
      setMenuOpenIndex(index);
  }

  return (
    <div className="todo-item">
      <div>
        <input
          type="checkbox"
          onChange={() => changeCompletedStatus(index)}
          onKeyUp={handleOnKeyUpCheckbox}
          checked={completed}
        />
      </div>
      <div
        className={completed ? "completed" : null}
        onClick={() => changeCompletedStatus(index)}
      >
        {text}
      </div>
      <div ref={moreContainerRef}>
        <button onClick={openMoreContainer}>
          <MoreLogo />
        </button>
        {menuOpenIndex === index && (
          <div className="todo-item-more-container">
            <button>Edit todo</button>
            <button onClick={() => deleteTodo(index)}>Delete todo</button>
          </div>
        )}
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  changeCompletedStatus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  menuOpenIndex: PropTypes.number.isRequired,
  setMenuOpenIndex: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
