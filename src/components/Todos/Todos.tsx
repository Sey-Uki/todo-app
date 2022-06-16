import { useState } from "react";
import { AddForm } from "./AddForm/AddForm";
import { TodoContent } from "./TodoContent/TodoContent";
import styles from "./Todos.module.css";

export interface ITodo {
  id: string;
  todo: string;
  completed: boolean;
}

export const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  return (
    <div className={styles.todos}>
      <AddForm todos={todos} setTodos={setTodos} />
      <TodoContent todos={todos} setTodos={setTodos} />
    </div>
  );
};
