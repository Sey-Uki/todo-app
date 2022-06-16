import styles from "./AddForm.module.css";
import { Button, Input, Form } from "antd";
import { TODOS_URL } from "../../../utils/constants";
import { ITodo } from "../Todos";
import { Dispatch, SetStateAction } from "react";

interface ItodoProps {
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const AddForm = ({ todos, setTodos }: ItodoProps) => {
  const [form] = Form.useForm();

  const handleSubmit = ({ todo }: { todo: string }) => {
    const newTodo = { todo, completed: false };

    (async () => {
      const response = await fetch(TODOS_URL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const createdTodo = await response.json();

      if (response.ok) {
        setTodos([...todos, createdTodo]);
      }
    })();

    form.resetFields();
  };

  return (
    <div className={styles.addForm}>
      <div className={styles.header_wrapper}>
        <h1 className={styles.title}>To Do</h1>
      </div>
      <div className={styles.form_wrapper}>
        <Form
          form={form}
          className={styles.add}
          initialValues={{ todo: "" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="todo"
            rules={[{ required: true, message: "Please enter todo" }]}
          >
            <Input placeholder="Add to do" className={styles.add_input} autoComplete="off"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.add_btn}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
