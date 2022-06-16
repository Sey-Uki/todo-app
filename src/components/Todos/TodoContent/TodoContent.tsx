import styles from "./TodoContent.module.css";
import { Button, Divider, List, Checkbox } from "antd";
import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TODOS_URL } from "../../../utils/constants";
import { ITodo } from "../Todos";

interface ItodoProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoContent = ({ todos, setTodos }: ItodoProps) => {

  useEffect(() => {

    (async () => {
      const response = await fetch(TODOS_URL);
      const todosArray = await response.json();

      setTodos(todosArray);
    })();
  }, [setTodos]);

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
