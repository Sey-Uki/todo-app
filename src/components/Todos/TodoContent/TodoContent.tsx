import styles from "./TodoContent.module.css";
import { Button, Divider, List, Checkbox } from "antd";
import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";
import { useEffect, useState } from "react";
import { TODOS_URL } from "../../../utils/constants";

interface ITodo {
  id: string;
  todo: string;
  completed: boolean;
}

export const TodoContent = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(TODOS_URL);
      const todosArray = await response.json();

      setTodos(todosArray);
    })();
  }, []);

  return (
    <div className={styles.todoContent}>
      <div className={styles.todoList}>
        <Divider orientation="left">List</Divider>
        <List bordered>
          {todos.length > 0 &&
            todos.map((todo: ITodo) => {
              return (
                <List.Item className={styles.li_item} key={todo.id}>
                  <label>
                    <Checkbox className={styles.check} />
                    {todo.todo}
                  </label>
                  <button className={styles.delete_img}>
                    <DeleteIcon />
                  </button>
                </List.Item>
              );
            })}
        </List>
        <div className={styles.btns}>
          <Button className={styles.all_btn} type="primary" ghost>
            All
          </Button>
          <div>
            <Button className={styles.active_btn}>Active</Button>
            <Button className={styles.completed_btn}>Completed</Button>
          </div>
          <Button type="primary" danger className={styles.delete_btn}>
            Clear completed
          </Button>
        </div>
      </div>
    </div>
  );
};
