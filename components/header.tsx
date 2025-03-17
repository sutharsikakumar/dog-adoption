"use client";

import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" className={styles.headerTitle}>
          <img src="/paw.png" alt="paw logo" className={styles.pawLogo} />
            dog adoption</Link>
      </h1>
      <nav>
        <ul className={styles.headerNav}>
          <li className={styles.headerList}>
            <Link href="/" className={styles.headerLink}>home</Link>
          </li>
          <li className={styles.headerList}>
            <Link href="/breeds" className={styles.headerLink}>breeds</Link>
          </li>
          <li className={styles.headerList}>
            <Link href="/login" className={styles.headerContact}>sign-in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
