import "./index.css";
import PropTypes from "prop-types";
import { ReactComponent as MoreLogo } from "../../icons/more.svg";

function TodoItem({
  text,
  index,
  completed,
  changeCompletedStatus,
  menuOpenIndex,
  setMenuOpenIndex,
}) {
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
      <div>
        <button onClick={openMoreContainer}>
          <MoreLogo />
        </button>
        {menuOpenIndex === index && (
          <div className="todo-item-more-container"></div>
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
};

export default TodoItem;
