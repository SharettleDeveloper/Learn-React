"use client";

import { useEffect, useReducer, useRef } from "react";

const initialState = { count: 0, text: "", onClick: false };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };

    case "decrement":
      if (state.count <= 0) {
        return { ...state, count: 0 };
      }
      return { ...state, count: state.count - 1 };
    case "setText":
      return { ...state, text: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementIntervalRef = useRef(null);
  const decrementIntervalRef = useRef(null);

  const startIncrement = () => {
    dispatch({ type: "increment" });
    if (incrementIntervalRef.current) clearInterval(incrementIntervalRef.current);
    incrementIntervalRef.current = setInterval(() => {
      dispatch({ type: "increment" });
    }, 5);
  };

  const stopIncrement = () => {
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
  };

  const startDecrement = () => {
    dispatch({ type: "decrement" });
    if (decrementIntervalRef.current) clearInterval(decrementIntervalRef.current);
    decrementIntervalRef.current = setInterval(() => {
      dispatch({ type: "decrement" });
    }, 0.2);
  };
  const stopDecrement = () => {
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        if (!incrementIntervalRef.current) {
          startIncrement();
        }
      } else if (e.key === "ArrowLeft") {
        if (!decrementIntervalRef.current) {
          startDecrement();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowRight") {
        stopIncrement();
      } else if (e.key === "ArrowLeft") {
        stopDecrement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <h2 className="my-10 h-20 w-60 rounded-[40px] bg-white text-black font-bold text-[30px] flex justify-center items-center"> {state.count}</h2>
      </div>
      <div className="" />
      <div className="flex justify-around bg-green-400 w-[400px] m-auto h-[60px] rounded-[30px] items-center ">
        <button
          onMouseDown={startIncrement}
          onMouseUp={stopIncrement}
          onMouseLeave={stopIncrement}
          className="bg-sky-500 w-20 h-10 border-2 border-white rounded-[20px] hover:bg-sky-600"
        >
          {" "}
          + 1
        </button>
        <button
          onMouseDown={startDecrement}
          onMouseUp={stopDecrement}
          onMouseLeave={stopDecrement}
          className="bg-purple-500 w-20 h-10 border-2 border-white rounded-[20px] hover:bg-purple-600"
        >
          {" "}
          - 1
        </button>
      </div>
      <input
        type="text"
        value={state.text}
        placeholder="Enter"
        onChange={(e) => dispatch({ type: "setText", payload: e.target.value })}
        className="w-60 h-30 bg-white text-black border-2 border-sky-500 rounded-lg font-bold text-[15px] pl-1 focus:outline-none focus:border-red-400
         "
      />
      <p>入力されたやつ {state.text}</p>
      <div
        className="absolute  bg-purple-400 rounded-t-[0px]"
        style={{ left: `${state.count ** 0}px `, width: `${(state.count ** 1.4 + 1000) % 1000}px`, height: `${(state.count ** 1.2 + 100) % 2000}px` }}
      />
    </div>
  );
}

export default Counter;
