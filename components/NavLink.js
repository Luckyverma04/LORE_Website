"use client";

import Link, { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";

// Small spinner shown inside the link while its page is loading.
function Pending() {
  const { pending } = useLinkStatus();
  return <span className={pending ? "nav-spinner is-on" : "nav-spinner"} aria-hidden="true" />;
}

// Header link: starts loading the page when the mouse hovers (or a finger touches) it,
// so the click opens it almost instantly; shows a spinner if it still needs a moment.
export default function NavLink({ href, children, className }) {
  const router = useRouter();
  const warm = () => router.prefetch(href);
  return (
    <Link prefetch={false} href={href} className={className} onMouseEnter={warm} onTouchStart={warm} onFocus={warm}>
      {children}
      <Pending />
    </Link>
  );
}
