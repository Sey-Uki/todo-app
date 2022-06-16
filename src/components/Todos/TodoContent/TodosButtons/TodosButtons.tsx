import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import styles from "./TodosButtons.module.css";

interface IbtnsProps {
  isCompletedList: boolean;
  setIsCompletedList: Dispatch<SetStateAction<boolean>>;
  isActiveList: boolean;
  setIsActiveList: Dispatch<SetStateAction<boolean>>;
  deleteCompletedTodo: () => void;
}

export const TodosButtons = ({
  isCompletedList,
  setIsCompletedList,
  isActiveList,
  setIsActiveList,
  deleteCompletedTodo,
}: IbtnsProps) => {
  const handleChangeCompleted = () => {
    setIsCompletedList(!isCompletedList);
    setIsActiveList(false);
  };
  const handleChangeActive = () => {
    setIsActiveList(!isActiveList);
    setIsCompletedList(false);
  };
  const handleChangeAll = () => {
    setIsActiveList(false);
    setIsCompletedList(false);
  };
  return (
    <div className={styles.btns}>
      <Button
        className={styles.all_btn}
        type="primary"
        ghost
        onClick={handleChangeAll}
      >
        All
      </Button>
      <div>
        <Button className={styles.active_btn} onClick={handleChangeActive}>
          Active
        </Button>
        <Button
          className={styles.completed_btn}
          onClick={handleChangeCompleted}
        >
          Completed
        </Button>
      </div>
      <Button
        type="primary"
        danger
        className={styles.delete_btn}
        onClick={deleteCompletedTodo}
      >
        Clear completed
      </Button>
    </div>
  );
};
