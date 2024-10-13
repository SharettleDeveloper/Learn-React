"use client";
import { useReducer } from "react";

type State = {
  count: number;
};

type Action = { type: "increment" } | { type: "decrement" };

const initialState: State = { count: 0 };

//Reducer関数
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error("Unbandled action type");
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count : {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decremtn</button>
    </div>
  );
};
export default Counter;
