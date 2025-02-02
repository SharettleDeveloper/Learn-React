"use client";
import { useState } from "react";
import { v4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoForm = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const createNewId = () => {
    const uid = v4();
    return uid;
  };

  const createNewTodo = () => {
    const newId = createNewId();
    const newTodoItem: Todo = {
      id: newId,
      text: newTodo,
      completed: false,
    };
    const newTodoList = [...todoList, newTodoItem];
    setTodoList(newTodoList);
    setNewTodo("");
  };

  const startEdit = (index: number, currentText: string) => {
    setEditIndex(index);
    setEditText(currentText);
  };
  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  const updateTodo = (index: number) => {
    setTodoList((prevList) => prevList.map((todo, i) => (i === index ? { ...todo, text: editText } : todo)));
    cancelEdit();
  };
  const deleteTodo = (index: number) => {
    const newTodoList = [...todoList].filter((value, ind) => ind !== index);
    setTodoList(newTodoList);
  };

  const toggleState = (index: number) => {
    setTodoList((prevList) => prevList.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <>
      <input className="text-black" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="テキスト" />
      <button onClick={createNewTodo}>追加</button>
      <ul>
        {todoList.map((todo, index) => (
          <li key={todo.id}>
            {editIndex === index ? (
              <>
                <input className="text-black" type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button className="bg-purple-700" onClick={() => updateTodo(index)}>
                  保存
                </button>
                <button className="bg-gray-700" onClick={() => cancelEdit()}>
                  キャンセル
                </button>
              </>
            ) : (
              <>
                <span className="bg-white text-black">{todo.text}</span>
                <button className="bg-green-700" onClick={() => startEdit(index, todo.text)}>
                  編集
                </button>
              </>
            )}
            <button className={!todo.completed ? "bg-yellow-600" : "bg-sky-500"} onClick={() => toggleState(index)}>
              {!todo.completed ? "未完了" : "完了"}
            </button>
            <button className="bg-red-600" onClick={() => deleteTodo(index)}>
              削除
            </button>{" "}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoForm;
