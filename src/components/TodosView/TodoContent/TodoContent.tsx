import styles from "./TodoContent.module.css";
import { Divider, List, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ITodo } from "../TodosView";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { TodosButtons } from "./TodosButtons/TodosButtons";
import { TodoList } from "./TodoList/TodoList";
import {
  deleteMultipleTodos,
  deleteSingleTodo,
  editTodo,
  fetchTodos,
} from "../../../utils/queries";

const { confirm } = Modal;

interface ItodoProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const TodoContent = ({ todos, setTodos }: ItodoProps) => {
  const [isCompletedList, setIsCompletedList] = useState(false);
  const [isActiveList, setIsActiveList] = useState(false);

  const activeList = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
  const completedList = useMemo(() => todos.filter((todo) => todo.completed), [todos]);

  const currentList = useMemo(() => {
    if (isActiveList) return activeList;

    if (isCompletedList) return completedList;

    return todos;
  }, [activeList, completedList, isActiveList, isCompletedList, todos]);

  useEffect(() => {
    fetchTodos(setTodos);
  }, [setTodos]);

  const deleteTodo = (itemId: string) => {
    if (itemId) {
      confirm({
        title: "Are you sure?",
        icon: <ExclamationCircleOutlined />,
        okType: "danger",
        onOk() {
          deleteSingleTodo(itemId, setTodos);
        },
      });
    }
  };

  const deleteCompletedTodos = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleOutlined />,
      okType: "danger",
      onOk() {
        deleteMultipleTodos(setTodos, todos);
      },
    });
  };

  const handleCheckboxChange = (
    e: CheckboxChangeEvent,
    itemId: string,
    todoIndex: number
  ) => {
    editTodo(itemId, setTodos, todos, todoIndex, e);
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
          deleteCompletedTodos={deleteCompletedTodos}
        />
        <List bordered>
          {todos.length > 0 &&
            currentList.map((todo: ITodo, index: number) => {
              return (
                <TodoList
                  todo={todo}
                  handleChange={handleCheckboxChange}
                  deleteTodo={deleteTodo}
                  todoIndex={index}
                  key={todo.id}
                />
              );
            })}
        </List>
      </div>
    </div>
  );
};
