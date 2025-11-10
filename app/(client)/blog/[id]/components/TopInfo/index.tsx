import handleTimeBlog from "@/utils/parseTime";
import styles from "./index.module.scss";

const TopInfo = (props: any) => {
  const { info = {} } = props;

  return (
    <div className={styles.topInfo}>
      {info.author && (
        <div className={styles.infoItem}>
          <span className={styles.text}>{info.author}</span>
        </div>
      )}
      
      <div className={styles.infoItem}>
        <span className={styles.icon}>📅</span>
        <span className={styles.text}>{handleTimeBlog(info.date)}</span>
      </div>
      
      {info.readTime && (
        <div className={styles.infoItem}>
          <span className={styles.icon}>⏱️</span>
          <span className={styles.text}>{info.readTime} 分钟阅读</span>
        </div>
      )}
    </div>
  );
};

export default TopInfo;