import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import FocusTrap from "../FocusTrap";
import { useTodo } from "../../contexts/TodoContext";
import { DEFAULT_CATEGORY } from "../../utils/constant";

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
    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
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
    setIsModalOpen(0);
  }

  function deleteCategory(index, key) {
    if (!window.confirm('Press ok to delete category'))
      return;

    setTodos(prevState => {
      const { [key]: item, ...rest } = prevState;
      return rest;
    });
    setCategories(prevState => prevState.filter((_, idx) => idx !== index));
    setIsModalOpen(0);
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
                    <button onClick={() => deleteCategory(index, item)}></button>
                  </div>
                )
            )}
          </div>
          <div className="rearrange-category">
            <h2>rearrange Category</h2>
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
