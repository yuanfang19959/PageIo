import Image from "next/Image";
import styles from "./index.module.scss";
import { isDesktop } from "@/utils/viewport";

export default function BaseHeader() {
  return (
    <header className={styles.header}>
      <h1>平头哥的小站</h1>

      <a href="http://github.com/yuanfang19959" target={"_blank"}>
        <img src="https://mdn.alipayobjects.com/huamei_22khvb/afts/img/A*GnwCQaB0Wx4AAAAAAAAAAAAADiGDAQ/original" alt="yuanfang19959" />
        yuanfang19959
      </a>
    </header>
  );
}