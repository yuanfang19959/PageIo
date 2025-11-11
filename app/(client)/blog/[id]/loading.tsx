import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>加载中...</p>
    </div>
  );
}
