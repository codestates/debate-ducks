import { useState } from "react";

export default function useSelect(initialOption) {
  const [state, setState] = useState(initialOption);

  const onChange = (ev) => {
    if (ev.target.value !== state) setState(ev.target.value);
  };

  return {
    attribute: { value: state, onChange },
    state,
    setState,
  };
}
