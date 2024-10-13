"use client";
import { useReducer } from "react";

type State = {
  name: string;
  email: string;
  error: string;
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "RESET_FORM" }
  | { type: "SET_ERROR"; payload: string };

const initialState: State = {
  name: "",
  email: "",
  error: "",
};

function fomrReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "RESET_FORM":
      return initialState;
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(fomrReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.name || !state.email) {
      dispatch({ type: "SET_ERROR", payload: "Name and Email are required" });
    } else {
      alert(`Submitted: ${state.name}, ${state.email}`);
      dispatch({ type: "RESET_FORM" });
    }
  };

  return (
    <>
      <div>{state.error && <p style={{ color: "red" }}>{state.error}</p>}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={state.name}
            onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="emal"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "RESET_FORM" })}>
          Reset
        </button>
      </form>
    </>
  );
};

export default Form;
