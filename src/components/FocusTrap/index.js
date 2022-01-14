import { useCallback, useEffect, useRef } from "react";

function FocusTrap({ children }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const keyDownHandler = useCallback((e) => {
    if (e.key !== "Tab") return;

    const focusableModalElements = ref.current.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select, *[role=button]"
    );

    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  }, []);

  return (
    <div role={"dialog"} tabIndex={-1} ref={ref} onKeyDown={keyDownHandler}>
      {children}
    </div>
  );
}

export default FocusTrap;
