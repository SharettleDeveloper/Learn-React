"use client";
import "./styles.css";
import { useReducer } from "react";

type State = {
  title: string;
  backgroundColor: string;
  textSize: "small" | "medium" | "large";
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_BACKGROUND_COLOR"; payload: string }
  | { type: "SET_TEXT_SIZE"; payload: "small" | "medium" | "large" };

const initialState: State = {
  title: "My Dashboard Widget",
  backgroundColor: "blue",
  textSize: "medium",
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "SET_TEXT_SIZE":
      return { ...state, textSize: action.payload };
    default:
      throw new Error("Unhandled actioni type");
  }
}

const DashboardWidget = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div>
      <h2>Customize Your Widget</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input id="title" type="text" value={state.title} onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })} />
        </div>
        <div>
          <label htmlFor="background">Background Color:</label>
          <select id="background" value={state.backgroundColor} onChange={(e) => dispatch({ type: "SET_BACKGROUND_COLOR", payload: e.target.value })}>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
        <div>
          <label htmlFor="textsize">Text Size:</label>
          <select
            id="textsize"
            value={state.textSize}
            onChange={(e) => dispatch({ type: "SET_TEXT_SIZE", payload: e.target.value as "small" | "medium" | "large" })}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </form>
      <div className={`widget ${state.textSize}`} style={{ backgroundColor: state.backgroundColor }}>
        <h3>{state.title}</h3>
        <p>This is your customized widget!</p>
      </div>
    </div>
  );
};

export default DashboardWidget;
