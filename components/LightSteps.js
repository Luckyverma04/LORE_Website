import styles from "./LightSteps.module.css";
import { STEPS } from "@/lib/site";

// How it works: the 4 steps as circles on one line. A light moves forward along the line
// (never backwards) and each circle lights up in turn and stays lit; then the whole row
// fades and starts again. Pure CSS, no JavaScript. Row on desktop, column on phones.
export default function LightSteps() {
  return (
    <div className={styles.wrap}>
      <span className={styles.track} aria-hidden="true"><span className={styles.fill} /></span>
      <ol className={styles.row}>
        {STEPS.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={`${styles.circle} ${styles["c" + (i + 1)]}`}>{i + 1}</span>
            <div>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
