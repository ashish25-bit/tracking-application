import PropTypes from "prop-types";
import { useRef } from "react";
import { STR } from '../../utils/random';

function DraggableList({ children, callBack, onDragOverClass = "", onDragStartClass = "" }) {
  const idRef = useRef({ id : STR() });
  const ref = useRef(null);

  function onDragStart(event, index) {
    onDragStartClass !== "" && event.target.classList.add(onDragStartClass);
    event.dataTransfer.setData("startIndex", index);
    event.dataTransfer.setData("eventID", idRef.current.id);
  }

  function onDragOver(event) {
    event.preventDefault();
    onDragOverClass !== "" && event.target.classList.add(onDragOverClass);
  }

  function onDrop(event, endIndex) {
    if (event.dataTransfer.getData('eventID') !== idRef.current.id)
      return;

    let startIndex = +event.dataTransfer.getData("startIndex");

    if (callBack !== undefined && typeof callBack === "function")
      callBack(startIndex, endIndex);

    onDragOverClass !== "" && event.target.classList.remove(onDragOverClass);
  }

  function onDragEnd() {
    ref?.current?.childNodes?.forEach(child => {
      onDragStartClass !== "" && child.classList.remove(onDragStartClass);
    })
  }

  function onDragLeave(event) {
    onDragOverClass !== "" && event.target.classList.remove(onDragOverClass);
  }

  return (
    <div ref={ref}>
      {children.map((child, idx) => {
        if (child.props.draggable)
          return (
            <div
              onDragStart={(e) => onDragStart(e, idx)}
              onDragOver={(e) => onDragOver(e, idx)}
              onDrop={(e) => onDrop(e, idx)}
              onDragEnd={onDragEnd}
              onDragLeave={onDragLeave}
              key={idx}
              {...child.props}
            />
          );
        else return child;
      })}
    </div>
  );
}

export default DraggableList;

DraggableList.propTypes = {
  callBack: PropTypes.func.isRequired,
  onDragStartClass: PropTypes.string,
  onDragOverClass: PropTypes.string,
};
