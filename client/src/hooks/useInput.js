import { useState } from "react";

export default function useInput(initialInputValue = "", initialValue = "", inputValidator, validator) {
  const [input, setInput] = useState(initialInputValue);
  const [state, setState] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const onChange = (ev) => {
    const {
      target: { value },
    } = ev;
    let isInputValid = true;
    if (typeof inputValidator === "function") {
      isInputValid = inputValidator(value);
    }

    if (isInputValid) setInput(value);
  };

  const onKeyDown = (ev) => {
    if (ev.key === "Enter") {
      if (typeof validator === "function") {
        setIsValid(validator(input));
      }
      if (isValid) setState(input);
    }
  };

  const onClick = () => {
    if (typeof validator === "function") {
      setIsValid(validator(input));
    }
    if (isValid) setState(input);
  };

  return { attribute: { value: input, onChange, onKeyDown }, state, setState, input, setInput, onClick, isValid };
}
