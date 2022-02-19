import { useState } from "react";

export default function useInput(initialInputValue = "", initialValue = "", inputValidator, validator) {
  const [input, setInput] = useState(initialInputValue);
  const [state, setState] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    let isInputValid = true;
    if (typeof inputValidator === "function") {
      isInputValid = inputValidator(value);
    }

    if (isInputValid) setInput(value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (typeof validator === "function") {
        setIsValid(validator(input));
      }
      if (isValid) setState(input);
    }
  };

  return { attribute: { value: input, onChange, onKeyDown }, state, setState, setInput, isValid };
}
