import styles from "./TodoContent.module.css";
import { Divider, List, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TODOS_URL } from "../../../utils/constants";
import { ITodo } from "../Todos";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { TodosButtons } from "./TodosButtons/TodosButtons";
import { TodoList } from "./TodoList/TodoList";

const { confirm } = Modal;

interface ItodoProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoContent = ({ todos, setTodos }: ItodoProps) => {
  const [isCompletedList, setIsCompletedList] = useState(false);
  const [isActiveList, setIsActiveList] = useState(false);

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

  const deleteCompletedTodo = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        todos.forEach((item) => {
          if (item.completed) {
            (async () =>
              await fetch(`${TODOS_URL}/${item.id}`, {
                method: "DELETE",
              }))().then(() => {
              setTodos(todos.filter((todo) => !todo.completed));
            });
          }
        });
      },
    });
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
        <TodosButtons
          isCompletedList={isCompletedList}
          setIsCompletedList={setIsCompletedList}
          isActiveList={isActiveList}
          setIsActiveList={setIsActiveList}
          deleteCompletedTodo={deleteCompletedTodo}
        />
        <List bordered>
          {todos.length > 0 &&
            todos.map((todo: ITodo, pos: number) => {
              return isCompletedList ? (
                todo.completed && (
                  <TodoList
                    todo={todo}
                    handleChange={handleChange}
                    deleteTodo={deleteTodo}
                    pos={pos}
                    key={todo.id}
                  />
                )
              ) : isActiveList ? (
                !todo.completed && (
                  <TodoList
                    todo={todo}
                    handleChange={handleChange}
                    deleteTodo={deleteTodo}
                    pos={pos}
                    key={todo.id}
                  />
                )
              ) : (
                <TodoList
                  todo={todo}
                  handleChange={handleChange}
                  deleteTodo={deleteTodo}
                  pos={pos}
                  key={todo.id}
                />
              );
            })}
        </List>
      </div>
    </div>
  );
};
