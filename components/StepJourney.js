import Image from "next/image";
import Link from "next/link";
import PhoneMockup from "./PhoneMockup";
import StageGlow from "./StageGlow";
import { PLAY_FACTS } from "@/lib/site";

// "Kaise banta hai?" on Home: a 4-step visual story, from installing Lore to downloading the video.
// Phone screens are simple illustrative UI built in CSS. Thumbnails are real Lore template images.
// Desktop: one row of 4. Mobile: 2 x 2 grid. Server component, no JavaScript.

const TEMPLATE_GRID = ["girl", "family", "patriotic", "relationships", "guy", "devotion"];

function Thumb({ name, className }) {
  return (
    <Image src={`/templates/${name}.webp`} alt="" width={230} height={325} sizes="70px" className={className} />
  );
}

const Icon = {
  download: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M11 4h2v9.2l3.3-3.3 1.4 1.4L12 17l-5.7-5.7 1.4-1.4 3.3 3.3V4Zm-6 15h14v2H5v-2Z" /></svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7c0 .3 0 .5.1.8L8.4 11.2a3 3 0 1 0 0 1.6l6.7 3.4A3 3 0 1 0 18 16Z" /></svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7L8 5Z" /></svg>
  ),
};

function InstallScreen() {
  return (
    <div className="sj-install">
      <span className="sj-appIcon">LORE</span>
      <strong>Lore: Viral Star Bano</strong>
      <small>Android app{PLAY_FACTS.rating ? ` · ${PLAY_FACTS.rating} ★` : ""}</small>
      <span className="sj-installBtn">Install</span>
    </div>
  );
}

function TemplateScreen() {
  return (
    <div>
      <span className="sj-screenTitle">Template chuno</span>
      <div className="sj-tplGrid">
        {TEMPLATE_GRID.map((n) => <Thumb key={n} name={n} className="sj-tplThumb" />)}
      </div>
    </div>
  );
}

function PhotoScreen() {
  return (
    <div>
      <span className="sj-screenTitle">Apni photo chuno</span>
      <div className="sj-photoGrid">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i === 4 ? `sj-photoTile sj-selected` : "sj-photoTile"}>
            {i === 4 && <span className="sj-person" />}
          </span>
        ))}
      </div>
      <span className="sj-useBtn">Is photo ko use karo</span>
    </div>
  );
}

function VideoScreen() {
  return (
    <div className="sj-videoScreen">
      <Image src="/showcase/desi-girl.webp" alt="" width={640} height={747} sizes="140px" className="sj-videoImg" />
      <span className="sj-playBtn">{Icon.play}</span>
      <span className="sj-progress"><span /></span>
      <div className="sj-videoActions">
        <span className="sj-dlBtn">{Icon.download} Download</span>
        <span className="sj-shareBtn">{Icon.share}</span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: "Lore install karo",
    text: "Google Play se, apne Android phone pe.",
    visual: (
      <>
        <PhoneMockup><InstallScreen /></PhoneMockup>
        <span className="sj-float sj-floatDownload">{Icon.download}</span>
      </>
    ),
  },
  {
    title: "Template chuno",
    text: "Family, dosti, bhakti, desh-bhakti: jo mood ho.",
    feature: true,
    visual: (
      <>
        <Thumb name="vlog" className="sj-floatCard sj-floatCardA" />
        <PhoneMockup tilt={-6}><TemplateScreen /></PhoneMockup>
        <Thumb name="friends" className="sj-floatCard sj-floatCardB" />
      </>
    ),
  },
  {
    title: "Apni photo daalo",
    text: "Gallery se chuno ya nayi kheencho. Editing nahi.",
    visual: (
      <>
        <PhoneMockup><PhotoScreen /></PhoneMockup>
        <span className="sj-float sj-floatPhoto"><span className="sj-person" /></span>
      </>
    ),
  },
  {
    title: "Video download karo",
    text: "Phir WhatsApp status pe lagao ya dosto ko bhejo.",
    visual: (
      <>
        <PhoneMockup><VideoScreen /></PhoneMockup>
        <span className="sj-float sj-floatShare">{Icon.share}</span>
      </>
    ),
  },
];

export default function StepJourney() {
  return (
    <section className="section stage sj-section" aria-labelledby="kaise-h">
      <div className="stage-bg" aria-hidden="true"><StageGlow /></div>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2 id="kaise-h">Kaise <em>banta</em> hai?</h2>
          </div>
          <p className="lead">Selfie se viral video tak, 4 steps mein.</p>
        </div>
        <ol className="sj-journey">
          {STEPS.map((s, i) => (
            <li key={s.title} className={s.feature ? `sj-step sj-feature` : "sj-step"}>
              <span className="sj-bigNum" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="sj-visual">{s.visual}</div>
              <span className="sj-badge">Step {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="sj-more">
          <Link prefetch={false} href="/how-it-works" className="link-arrow">Poora guide dekho <span aria-hidden="true">→</span></Link>
        </p>
      </div>
    </section>
  );
}
