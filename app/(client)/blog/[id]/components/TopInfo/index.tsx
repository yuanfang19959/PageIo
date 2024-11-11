import handleTimeBlog from "@/utils/parseTime";
import styles from "./index.module.scss";

const Editor = (props: any) => {
  const { info={} } = props;

  return (
    <>
      <div className={styles.topInfo}>
        <span className={styles.eachItem}>
          <img
            className={styles.abc}
            src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*hYDGQKcmUoYAAAAAAAAAAAAAARQnAQ"
            alt="time"
            style={{ margin: "0px 9px 0px 0px" }}
          />
          <span className={styles.tuboxu}>{handleTimeBlog(info.date)}</span>
        </span>
        <span className={styles.eachItem}>
          <img
            className={styles.abc}
            src="https://gw.alipayobjects.com/mdn/ob_asset/afts/img/A*CtHtSJ2gtBEAAAAAAAAAAAAAARQnAQ"
            alt="tag"
            style={{ margin: "0px 8px 0px 24px" }}
          />
          <a
            className={styles.tuboxu}
            href="https://open-pre.oceanbase.com/c/userpractice"
            target="_blank"
            rel="noreferrer"
          >
            {info.category}
          </a>
        </span>
      </div>
    </>
  );
};

export default Editor;
