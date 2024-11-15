import styles from "./index.module.scss";

export default function BaseFooter() {
  return (
    <footer className={styles.footer}>
        <p>ICP备案: <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2024133658</a> | yuanfang19959 版权所有 © 2024</p>
    </footer>
  );
}