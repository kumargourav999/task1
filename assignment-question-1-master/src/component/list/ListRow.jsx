import styles from "./ListRow.module.css";

const ListRow= ({ children,onClick }) => {
  return <tr onClick={onClick} className={styles.cell}>{children}</tr>;
};

export default ListRow;
