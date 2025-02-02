"use client";
import React, { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors, UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ----------------------------------------------------
// 型定義
// ----------------------------------------------------

type ColumnKey = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnKey;
}

export type BoardState = Record<ColumnKey, Task[]>;

// ----------------------------------------------------
// 初期データ／Local Storage のキー
// ----------------------------------------------------

const LOCAL_STORAGE_KEY = "kanban-board";

const initialBoard: BoardState = {
  todo: [
    { id: "task-1", title: "タスク 1", description: "タスク 1 の詳細", status: "todo" },
    { id: "task-2", title: "タスク 2", description: "タスク 2 の詳細", status: "todo" },
  ],
  "in-progress": [{ id: "task-3", title: "タスク 3", description: "タスク 3 の詳細", status: "in-progress" }],
  done: [{ id: "task-4", title: "タスク 4", description: "タスク 4 の詳細", status: "done" }],
};

// ----------------------------------------------------
// TaskCard コンポーネント（ドラッグ対象・編集・削除機能付き）
// ----------------------------------------------------

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px 0",
    backgroundColor: "#e0f7fa",
    border: "1px solid #0097a7",
    borderRadius: "4px",
    cursor: "grab",
    position: "relative",
  };

  // 編集モード用のローカル状態
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onUpdate({ ...task, title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="タイトル"
            style={{ width: "100%", marginBottom: "4px" }}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="詳細"
            style={{ width: "100%", marginBottom: "4px" }}
          />
          <button onClick={handleSave} style={{ marginRight: "4px" }}>
            保存
          </button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </div>
      ) : (
        <div>
          <h4 style={{ margin: "0 0 4px 0" }}>{task.title}</h4>
          <p style={{ margin: "0 0 4px 0", fontSize: "0.9rem" }}>{task.description}</p>
          <div style={{ position: "absolute", top: "4px", right: "4px" }}>
            <button onClick={() => setIsEditing(true)} style={{ marginRight: "4px" }}>
              編集
            </button>
            <button onClick={() => onDelete(task.id)}>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Column コンポーネント（カラムコンテナ）
// ----------------------------------------------------

interface ColumnProps {
  columnKey: ColumnKey;
  title: string;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

function Column({ columnKey, title, tasks, onUpdateTask, onDeleteTask }: ColumnProps) {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "16px",
        borderRadius: "8px",
        minWidth: "250px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <SortableContext items={tasks.map((task) => task.id)} strategy={rectSortingStrategy}>
        <div style={{ flexGrow: 1, minHeight: "50px" }}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

// ----------------------------------------------------
// タスク追加フォーム
// ----------------------------------------------------

interface AddTaskFormProps {
  onAdd: (task: Task) => void;
}

function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: "todo", // 新規タスクは To Do に追加
    };
    onAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
      <h3>新規タスクの追加</h3>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "300px", marginRight: "8px" }}
      />
      <input
        type="text"
        placeholder="詳細"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "300px", marginRight: "8px" }}
      />
      <button type="submit">追加</button>
    </form>
  );
}

// ----------------------------------------------------
// KanbanBoard コンポーネント（全体）
// ----------------------------------------------------

export default function KanbanBoard() {
  const [columns, setColumns] = useState<BoardState>(initialBoard);

  // Local Storage からの読み込み
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setColumns(JSON.parse(saved));
    }
  }, []);

  // 状態変更のたびに Local Storage を更新
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  // センサーの設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // タスクの更新（編集後の反映）
  const updateTask = (updatedTask: Task) => {
    setColumns((prev: BoardState) => {
      const col = prev[updatedTask.status];
      return {
        ...prev,
        [updatedTask.status]: col.map((t: Task) => (t.id === updatedTask.id ? updatedTask : t)),
      };
    });
  };

  // タスクの削除
  const deleteTask = (taskId: string) => {
    setColumns((prev: BoardState) => {
      const newState: BoardState = { ...prev };
      const keys = Object.keys(newState) as ColumnKey[];
      keys.forEach((colKey: ColumnKey) => {
        newState[colKey] = newState[colKey].filter((t: Task) => t.id !== taskId);
      });
      return newState;
    });
  };

  // タスクの追加（初期状態は "todo" カラムへ）
  const addTask = (newTask: Task) => {
    setColumns((prev: BoardState) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  // ドラッグ終了時の処理
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // active.id, over.id は UniqueIdentifier 型（string | number）なので、toString() で統一する
    const activeId = active.id.toString();
    const overId = over.id.toString();

    // 指定のタスクがどのカラムに属しているかを返す
    const findContainer = (id: UniqueIdentifier): ColumnKey | null => {
      const keys = Object.keys(columns) as ColumnKey[];
      for (const colKey of keys) {
        if (columns[colKey].some((task: Task) => task.id === id.toString())) {
          return colKey;
        }
      }
      return null;
    };

    // ドラッグ終了時の処理内
    const activeContainer = findContainer(active.id);
    if (!activeContainer) return; // activeContainer が null なら何もしない

    const potentialOver = ["todo", "in-progress", "done"].includes(overId) ? (overId as ColumnKey) : findContainer(over.id);

    // potentialOver は ColumnKey | null となるので、null の場合は activeContainer を使う
    const overContainer: ColumnKey = potentialOver ?? activeContainer;

    if (!activeContainer || !overContainer) return;

    // ドラッグされたタスクを取得
    const activeTask = columns[activeContainer].find((task: Task) => task.id === activeId);
    if (!activeTask) return;

    if (activeContainer === overContainer) {
      // 同じカラム内での並び替え
      const oldIndex = columns[activeContainer].findIndex((task: Task) => task.id === activeId);
      const newIndex = columns[activeContainer].findIndex((task: Task) => task.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;
      setColumns((prev: BoardState) => ({
        ...prev,
        [activeContainer]: arrayMove(prev[activeContainer], oldIndex, newIndex),
      }));
    } else {
      // 別カラム間での移動
      setColumns((prev: BoardState) => {
        // 移動元から削除
        const sourceTasks = [...prev[activeContainer]];
        const movingTaskIndex = sourceTasks.findIndex((task: Task) => task.id === activeId);
        if (movingTaskIndex === -1) return prev;
        const [movingTask] = sourceTasks.splice(movingTaskIndex, 1);
        // 移動先に追加（先頭に挿入）
        const targetTasks = [...prev[overContainer]];
        movingTask.status = overContainer; // ステータス更新
        targetTasks.splice(0, 0, movingTask);
        return {
          ...prev,
          [activeContainer]: sourceTasks,
          [overContainer]: targetTasks,
        };
      });
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <AddTaskForm onAdd={addTask} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "16px" }}>
          <Column columnKey="todo" title="To Do" tasks={columns.todo} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
          <Column columnKey="in-progress" title="In Progress" tasks={columns["in-progress"]} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
          <Column columnKey="done" title="Done" tasks={columns.done} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </div>
      </DndContext>
    </div>
  );
}
