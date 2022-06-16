import styles from "./TodoList.module.css";
import { List, Checkbox } from "antd";
import { ReactComponent as DeleteIcon } from "../../../../img/delete.svg";
import { ITodo } from "../../Todos";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface ItodoListProps {
  todo: ITodo;
  handleChange: (e: CheckboxChangeEvent, id: string, pos: number) => void;
  deleteTodo: (id: string) => void;
  pos: number;
}

export const TodoList = ({
  todo,
  handleChange,
  deleteTodo,
  pos,
}: ItodoListProps) => {
  return (
    <div className={styles.list}>
      <List.Item
        className={todo.completed ? styles.li_item_act : styles.li_item}
        key={todo.id}
      >
        <label>
          <Checkbox
            className={styles.check}
            onChange={(e) => handleChange(e, todo.id, pos)}
            checked={todo.completed}
          />
          {todo.todo}
        </label>

        <button
          className={styles.delete_img}
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon />
        </button>
      </List.Item>
    </div>
  );
};
