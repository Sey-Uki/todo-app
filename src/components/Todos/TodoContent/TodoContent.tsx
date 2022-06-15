import styles from "./TodoContent.module.css";
import { Button, Divider, List, Checkbox } from "antd";
import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";

export const TodoContent = () => {
  return (
    <div className={styles.todoContent}>
      <div className={styles.todoList}>
        <Divider orientation="left">List</Divider>
        <List bordered>
          <List.Item className={styles.li_item}>
            <label>
              <Checkbox className={styles.check} />
              todo
            </label>
            <button className={styles.delete_img}>
              <DeleteIcon />
            </button>
          </List.Item>
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
