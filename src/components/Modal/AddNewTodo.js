import { useEffect, useRef, useState } from "react";
import "./index.css";
import PropTypes from "prop-types";
import { useTodo } from "../../contexts/TodoContext";
import Dropdown from "../Dropdown";
import FocusTrap from "../FocusTrap";

function AddNewTodo({ setIsModalOpen }) {
  const inputTodoRef = useRef();

  useEffect(() => {
    function handleDocumentClick(e) {
      if (e.target.classList.contains("modal-container")) {
        setIsModalOpen(0);
        document.body.removeAttribute("style");
      }
    }

    document.addEventListener("click", handleDocumentClick, false);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, [setIsModalOpen]);

  const { categories, todos, setTodos } = useTodo();
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleAddTodo() {
    if (selectedCategory === "") {
      alert('Category is not selected');
      return;
    }

    const temp = todos[selectedCategory];
    temp.push({text: inputTodoRef?.current?.value, completed: false});

    setTodos(prevState => ( {...prevState, [selectedCategory]: temp } ));
    inputTodoRef.current.focus();
    inputTodoRef.current.select();
  }

  return (
    <FocusTrap>
      <div className="modal-container">
        <div className="add-new-todo-container">
          <Dropdown
            title="Select Category"
            items={categories}
            setSelectedData={setSelectedCategory}
            defaultSelectedIndex={0}
          />
          <input type="text" placeholder="Enter the todo message" ref={inputTodoRef} />
          <div className="btns">
            <button onClick={handleAddTodo}>Ok</button>
            <button onClick={() => setIsModalOpen(0)}>Cancel</button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddNewTodo;

AddNewTodo.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
