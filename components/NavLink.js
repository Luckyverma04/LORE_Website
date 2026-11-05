"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Header link that loads its page in the background, so a click opens it with no wait:
// - once the browser is idle after the page loads (works on phones too, where there is no hover)
// - again on hover / touch / keyboard focus, just in case
// Nothing is shown to the user; it only happens behind the scenes.
export default function NavLink({ href, children, className }) {
  const router = useRouter();

  useEffect(() => {
    const warm = () => router.prefetch(href);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(warm, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 2500);
    return () => clearTimeout(t);
  }, [href, router]);

  const warmNow = () => router.prefetch(href);
  return (
    <Link prefetch={false} href={href} className={className} onMouseEnter={warmNow} onTouchStart={warmNow} onFocus={warmNow}>
      {children}
    </Link>
  );
}
