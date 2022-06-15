import { AddForm } from "./AddForm/AddForm";
import { TodoContent } from "./TodoContent/TodoContent";
import styles from "./Todos.module.css";

export const Todos = () => {
  return (
    <div className={styles.todos}>
      <AddForm />
      <TodoContent />
    </div>
  );
};
