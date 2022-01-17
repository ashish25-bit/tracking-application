import "./index.css";
import PropTypes from "prop-types";
import { ReactComponent as MoreLogo } from "../../icons/more.svg";
import { useRef, useEffect, useCallback, useState } from "react";
import NewInputTodo from "./NewInputTodo";

function TodoItem({
  text,
  index,
  completed,
  changeCompletedStatus,
  menuOpenIndex,
  setMenuOpenIndex,
  deleteTodo,
  setNewInputIndex,
  newInputIndex,
  insertNewTodo,
  editTodoText,
}) {
  const moreContainerRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editCurrentTodoValue, setEditCurrentTodoValue] = useState(text);

  const checkIfClickedOutside = useCallback(
    (e) => {
      if (
        index === menuOpenIndex &&
        moreContainerRef.current &&
        !moreContainerRef.current.contains(e.target)
      )
        setMenuOpenIndex(-1);
    },
    [index, menuOpenIndex, setMenuOpenIndex]
  );

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [checkIfClickedOutside]);

  function handleOnKeyUpCheckbox(e) {
    if (e.keyCode !== 13) return;

    changeCompletedStatus(index);
  }

  function openMoreContainer() {
    if (index === menuOpenIndex) setMenuOpenIndex(-1);
    else setMenuOpenIndex(index);
  }

  function keyDownHandle_adding_new_todo(e) {
    if (e.key === "Escape") {
      setMenuOpenIndex(-1);
      return;
    }

    if (e.key !== "Tab") return;

    const focusableElements =
      moreContainerRef?.current.querySelectorAll("button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (
      (!e.shiftKey && document.activeElement === lastElement) ||
      (e.shiftKey && document.activeElement === firstElement)
    )
      setMenuOpenIndex(-1);
  }

  function onClick_adding_new_todo(value) {
    setIsEditing(false);
    setNewInputIndex(value);
    setMenuOpenIndex(-1);
  }

  function editCurrentTodo_key_handler(e) {
    if (e.code === "Escape") {
      setIsEditing(false);
      return;
    }

    if (e.code === "Enter") {
      setIsEditing(false);
      editTodoText(index, editCurrentTodoValue);
    }
  }

  return (
    <>
      {newInputIndex === index && (
        <NewInputTodo
          index={index}
          insertNewTodo={insertNewTodo}
          setNewInputIndex={setNewInputIndex}
        />
      )}
      <div className="todo-item">
        <div>
          <input
            type="checkbox"
            onChange={() => changeCompletedStatus(index)}
            onKeyUp={handleOnKeyUpCheckbox}
            checked={completed}
          />
        </div>
        {!isEditing ? (
          <div
            className={completed ? "completed" : null}
            onClick={() => changeCompletedStatus(index)}
          >
            {text}
          </div>
        ) : (
          <input
            type={"text"}
            className="todo-edit-input"
            value={editCurrentTodoValue}
            onChange={(e) => setEditCurrentTodoValue(e.target.value)}
            onKeyUp={editCurrentTodo_key_handler}
          />
        )}
        <div
          ref={moreContainerRef}
          onKeyDown={
            menuOpenIndex === index ? keyDownHandle_adding_new_todo : null
          }
        >
          <button onClick={openMoreContainer}>
            <MoreLogo />
          </button>
          {menuOpenIndex === index && (
            <div className="todo-item-more-container">
              {!isEditing && (
                <button
                  onClick={() => {
                    setEditCurrentTodoValue(text);
                    setMenuOpenIndex(-1);
                    setIsEditing(true);
                  }}
                >
                  Edit todo
                </button>
              )}
              <button onClick={() => onClick_adding_new_todo(index)}>
                Add row above this ⬆
              </button>
              <button onClick={() => onClick_adding_new_todo(index + 1)}>
                Add row below this ⬇
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  deleteTodo(index);
                }}
              >
                Delete todo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
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
  setNewInputIndex: PropTypes.func.isRequired,
  newInputIndex: PropTypes.number.isRequired,
  insertNewTodo: PropTypes.func.isRequired,
  editTodoText: PropTypes.func.isRequired,
};

export default TodoItem;
