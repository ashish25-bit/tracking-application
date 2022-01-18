import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import FocusTrap from "../FocusTrap";
import { useTodo } from "../../contexts/TodoContext";
import { DEFAULT_CATEGORY } from "../../utils/constant";
import DraggableList from "../DraggableList";

function EditCategoryModal({ setIsModalOpen }) {
  const inputRef = useRef();

  const handleDocumentClick = useCallback(
    (e) => {
      if (e.target.classList.contains("modal-container")) {
        setIsModalOpen(0);
        document.body.removeAttribute("style");
      }
    },
    [setIsModalOpen]
  );

  useEffect(() => {
    document.addEventListener("dblclick", handleDocumentClick);

    return () => document.removeEventListener("dblclick", handleDocumentClick);
  }, [handleDocumentClick]);

  const { categories, setCategories, setTodos } = useTodo();

  function addNewCategory() {
    let value = inputRef?.current?.value;

    if (value === "" || value === undefined) {
      alert("Empty category name");
      return;
    }

    value = value.toLowerCase();
    setTodos((prevState) => ({ ...prevState, [value]: [] }));
    setCategories((prevState) => [...prevState, value]);
    inputRef?.current?.focus();
  }

  function deleteCategory(index, key) {
    if (!window.confirm("Press ok to delete category")) return;

    setTodos((prevState) => {
      const { [key]: item, ...rest } = prevState;
      return rest;
    });
    setCategories((prevState) => prevState.filter((_, idx) => idx !== index));
  }

  function reorderCallback(startIndex, endIndex) {
    const data = [...categories];

    if (
      startIndex < 0 ||
      endIndex < 0 ||
      startIndex >= data.length ||
      endIndex >= data.length
    )
      return;

    if (startIndex < endIndex) {
      const startElem = data[startIndex];
      for (let i = startIndex + 1; i <= endIndex; i++)
        data[i - 1] = data[i];
      data[endIndex] = startElem;
    }

    else if (startIndex > endIndex) {
      const startElem = data[startIndex];
      for (let i = startIndex - 1; i >= endIndex; i--)
        data[i + 1] = data[i];
      data[endIndex] = startElem;
    }

    setCategories(data);
  }

  return (
    <FocusTrap>
      <div className="modal-container">
        <div className="edit-category-modal">
          <div className="add-category">
            <h2>Add New Category</h2>
            <input type={"text"} ref={inputRef} />
            <div className="btns">
              <button onClick={addNewCategory}>Ok</button>
              <button onClick={() => setIsModalOpen(0)}>cancel</button>
            </div>
          </div>
          <div className="delete-category">
            <h2>Delete Category</h2>
            {categories.map(
              (item, index) =>
                DEFAULT_CATEGORY.includes(item) === false && (
                  <div key={index}>
                    <p>{item}</p>
                    <button
                      onClick={() => deleteCategory(index, item)}
                    ></button>
                  </div>
                )
            )}
          </div>
          <div className="rearrange-category">
            <h2>rearrange Category</h2>
            <DraggableList
              callBack={reorderCallback}
              onDragStartClass="drag-start"
              onDragOverClass="dragging"
            >
              {categories.map((item, index) => (
                <div className="draggable-element" key={index} draggable>
                  {item}
                </div>
              ))}
            </DraggableList>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default EditCategoryModal;

EditCategoryModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
