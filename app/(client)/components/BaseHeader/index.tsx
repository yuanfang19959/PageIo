import Image from "next/Image";
import styles from "./index.module.scss";
import { isDesktop } from "@/utils/viewport";

export default function BaseHeader() {
  return (
    <header className={styles.header}>
      <h1>yuanfang19959</h1>
    </header>
  );
}