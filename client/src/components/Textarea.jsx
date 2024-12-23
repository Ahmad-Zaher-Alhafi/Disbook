import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "../styles/textarea.module.css";

const textAreaMaxHeight = 300;
const Textarea = forwardRef(
  (
    {
      onInputChanged,
      onKeyPressed,
      onInputClicked,
      placeholder = "Type something...",
    },
    ref
  ) => {
    const inputRef = useRef();

    const handleInputChange = (e) => {
      adjustTextAreaHeight();
      if (onInputChanged) {
        onInputChanged(e);
      }
    };

    function adjustTextAreaHeight() {
      // Shrink to normal
      inputRef.current.style.height = "auto";

      const style = window.getComputedStyle(inputRef.current);
      const paddingTop = parseInt(style.paddingTop);
      const paddingBottom = parseInt(style.paddingBottom);

      const newHeight =
        inputRef.current.scrollHeight - paddingTop - paddingBottom;
      // Expand to fit the message height with a max height limit
      inputRef.current.style.height =
        newHeight > textAreaMaxHeight
          ? textAreaMaxHeight + "px"
          : newHeight + "px";
    }

    useImperativeHandle(ref, () => ({
      clearInput() {
        inputRef.current.value = "";
        inputRef.current.style.height = "auto";
      },

      focusInput() {
        inputRef.current.focus();
      },
    }));

    return (
      <div className={styles.textAreaContainer}>
        <textarea
          className={styles.textArea}
          ref={inputRef}
          type="text"
          name="content"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (onKeyPressed) {
              onKeyPressed(e);
            }
          }}
          onChange={handleInputChange}
          onClick={(e) => {
            if (onInputClicked) {
              onInputClicked(e);
            }
          }}
          rows="1"
        ></textarea>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
