import React from "react";
import { BsClock } from "react-icons/bs";
import styles from "./Track.module.scss";

export default function TableHeader() {
    return (
        <div className={styles["table-header"]}>
            <span className={styles["small-col"]}>#</span>
            <span className={styles["huge-col"]}>TITLE</span>
            <span className={styles["huge-col"]}>ALBUM</span>
            <span className={styles["small-col"]}>
                <BsClock className={styles["time"]} size="18px" />
            </span>
        </div>
    );
}
