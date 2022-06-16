import styles from "./TodoContent.module.css";
import { Button, Divider, List, Checkbox, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TODOS_URL } from "../../../utils/constants";
import { ITodo } from "../Todos";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { confirm } = Modal;

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

  const deleteTodo = (itemId: string) => {
    if (itemId) {
      confirm({
        title: "Are you sure?",
        icon: <ExclamationCircleOutlined />,
        okType: "danger",
        onOk() {
          (async () =>
            await fetch(`${TODOS_URL}/${itemId}`, { method: "DELETE" }))();
          setTodos(todos.filter((todo) => todo.id !== itemId));
        },
      });
    }
  };

  const handleChange = (
    e: CheckboxChangeEvent,
    itemId: string,
    pos: number
  ) => {
    (async () => {
      const response = await fetch(`${TODOS_URL}/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: e.target.checked }),
      });
      const updatedTodo = await response.json();
      const copy = [...todos];
      copy[pos] = updatedTodo;
      setTodos(copy);
    })();
  };

  return (
    <div className={styles.todoContent}>
      <div className={styles.todoList}>
        <Divider orientation="left">List</Divider>
        <List bordered>
          {todos.length > 0 &&
            todos.map((todo: ITodo, pos: number) => {
              return (
                <List.Item
                  className={
                    todo.completed ? styles.li_item_act : styles.li_item
                  }
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
