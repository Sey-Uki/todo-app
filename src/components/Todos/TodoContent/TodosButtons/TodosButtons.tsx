import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";
import styles from "./TodosButtons.module.css";

interface IbtnsProps {
  isCompletedList: boolean;
  setIsCompletedList: Dispatch<SetStateAction<boolean>>;
  isActiveList: boolean;
  setIsActiveList: Dispatch<SetStateAction<boolean>>;
}

export const TodosButtons = ({
  isCompletedList,
  setIsCompletedList,
  isActiveList,
  setIsActiveList,
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
      <Button type="primary" danger className={styles.delete_btn}>
        Clear completed
      </Button>
    </div>
  );
};
