"use client";
import { useState } from "react";
import "./list.css";

export default function ReactList() {
  const [count, setCount] = useState(0);
  function handleClick(title: string) {
    setCount(count + 1);
    alert(`You clicked ${title}`);
  }
  const products = [
    { title: "Cabbage", id: 1 },
    { title: "Garlic", id: 2 },
    { title: "Apple", id: 3 },
    { title: "Carrot", id: 4 },
    { title: "Potato", id: 5 },
    { title: "Tomato", id: 6 },
    { title: "Onion", id: 7 },
    { title: "Broccoli", id: 8 },
    { title: "Spinach", id: 9 },
    { title: "Mushroom", id: 10 },
    { title: "Lettuce", id: 11 },
    { title: "Pepper", id: 12 },
    { title: "Zucchini", id: 13 },
    { title: "Pumpkin", id: 14 },
    { title: "Cucumber", id: 15 },
  ];

  const listItems = products.map((product) => (
    <>
      <li className="user-list" key={product.id}>
        <br />
        <button type="button" onClick={() => handleClick(product.title)}>
          {product.title}
        </button>
      </li>
    </>
  ));

  return (
    <>
      <h1>You Clicked Button {count}</h1>
      <ul>{listItems}</ul>
    </>
  );
}
