
// A CSS-built phone frame (no image). Put any screen UI inside as children.
// tilt = rotation in degrees, for a slightly angled phone.
export default function PhoneMockup({ children, tilt = 0 }) {
  return (
    <div className="sj-phone" style={{ "--tilt": `${tilt}deg` }} aria-hidden="true">
      <span className="sj-notch" />
      <div className="sj-screen">{children}</div>
    </div>
  );
}
