import { PLAY_URL } from "@/lib/site";

// Plain <a> link: works without JavaScript. Every page leads to this one action.
export default function PlayStoreButton({ label = "Get it on Google Play", small = false }) {
  return (
    <a href={PLAY_URL} className={small ? "play play-sm" : "play"} rel="noopener">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M4 2.5v19c0 .4.4.6.7.4L21 12.4c.3-.2.3-.6 0-.8L4.7 2.1c-.3-.2-.7 0-.7.4Z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
