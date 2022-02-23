import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function useGetAsync(reducer, action, payload) {
  const dispatch = useDispatch();

  const reducerValue = useSelector((state) => state[reducer]);

  useEffect(() => {
    dispatch(action(payload));
  }, [dispatch, action, ...Object.values(payload)]);

  return { data: reducerValue.data.data, loading: reducerValue.loading, error: reducerValue.error };
}
