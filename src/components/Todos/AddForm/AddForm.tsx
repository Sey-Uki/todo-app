import styles from "./AddForm.module.css";
import { Button, Input, Form } from "antd";

export const AddForm = () => {
  const [form] = Form.useForm();
  return (
    <div className={styles.addForm}>
      <div className={styles.header_wrapper}>
        <h1 className={styles.title}>To Do</h1>
      </div>
      <div className={styles.form_wrapper}>
        <Form form={form} className={styles.add} initialValues={{ title: "" }}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Add to do" className={styles.add_input} />
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
