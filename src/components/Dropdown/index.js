import { useState, useEffect, useRef } from "react";
import "./index.css";
import PropTypes from "prop-types";

function Dropdown({ title = "Select item", items = [], setSelectedData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const ref = useRef();

  useEffect(() => {
    function checkIfClickedOutside(e) {
      if (isOpen && ref.current && !ref.current.contains(e.target))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => document.removeEventListener("mousedown", checkIfClickedOutside);

  }, [isOpen]);

  function handleOnClick(index) {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setSelectedData(items[index]);
    } else {
      setSelectedIndex(null);
      setSelectedData("");
    }

    setIsOpen(false);
  }

  return (
    <div className="dd-wrapper" ref={ref}>
      <div
        className={isOpen ? "dd-header open" : "dd-header"}
        tabIndex={0}
        role="button"
        onKeyPress={() => setIsOpen(!isOpen)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="dd-header_title">
          {selectedIndex !== null ? items[selectedIndex] : title}
        </div>
      </div>
      {isOpen && (
        <ul className="dd-list">
          {items.map((item, index) => (
            <li className="dd-list-item" key={index}>
              <button onClick={() => handleOnClick(index)}>
                <span>{item}</span>
                {selectedIndex === index && (
                  <span style={{ fontSize: "10px" }}>🟢</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  setSelectedData: PropTypes.func.isRequired,
};
