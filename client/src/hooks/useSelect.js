import { useState } from "react";

export default function useSelect(initialOption) {
  const [state, setState] = useState(initialOption);

  const onChange = (e) => {
    if (e.target.value !== state) setState(e.target.value);
  };

  return {
    attribute: { value: state, onChange },
    state,
    setState,
  };
}
