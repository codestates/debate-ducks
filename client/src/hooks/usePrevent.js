import { useEffect } from "react";

export default function usePrevent() {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
      // console.log("prevent go back!"); //* console
    };

    history.pushState(null, "", location.href);

    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, []);

  useEffect(() => {
    const listener = (ev) => {
      ev.preventDefault();
      ev.returnValue = "";
    };
    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, []);
}
