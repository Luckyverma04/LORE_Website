import styles from "./StepJourney.module.css";

// A CSS-built phone frame (no image). Put any screen UI inside as children.
// tilt = rotation in degrees, for a slightly angled phone.
export default function PhoneMockup({ children, tilt = 0 }) {
  return (
    <div className={styles.phone} style={{ "--tilt": `${tilt}deg` }} aria-hidden="true">
      <span className={styles.notch} />
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
